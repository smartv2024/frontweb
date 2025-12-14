# Implementation Prompts for Fixing Socket.IO Events

## Issue Summary

The web application is NOT receiving `AppStateWeb` and `currentAdWeb` events from the TV app, even though:
- ✅ Backend is correctly configured to relay events
- ✅ Web app has listeners set up correctly
- ❌ **TV app has a CRITICAL BUG in currentAd emission**
- ⚠️ AppState emission may have timing/debounce issues

---

## CRITICAL BUG FOUND 🐛

### Bug Location: TV App - BackgroundProcessingManager.kt

**File:** `app/src/main/java/com/kamran/tvadapp/BackgroundProcessingManager.kt`  
**Line:** 148  
**Problem:** Emitting raw `MediaItem` object instead of JSON

**Current Code (BROKEN):**
```kotlin
fun emitSocketEvent(
    socketIO: SocketIO,
    eventName: String,
    data: Any,  // ❌ Receiving MediaItem object
    onComplete: (() -> Unit)? = null
) {
    scope.launch(ioDispatcher) {
        try {
            activeOperations.incrementAndGet()
            logManager.logDebug(LogManager.TAG_SOCKET, "📡 [BG] Emitting socket event: $eventName")
            
            // ❌ BUG: Emitting MediaItem object directly - Socket.IO cannot serialize this!
            socketIO.getSocket()?.emit(eventName, data)
            
            operationMetrics[operationId] = System.currentTimeMillis() - startTime
            logManager.logDebug(LogManager.TAG_SOCKET, "✅ [BG] Socket event emitted: $eventName")
            
            onComplete?.invoke()
        } catch (e: Exception) {
            logManager.logError(LogManager.TAG_SOCKET, "❌ [BG] Socket emission failed: $eventName - ${e.message}")
        } finally {
            activeOperations.decrementAndGet()
        }
    }
}
```

**Why This Breaks:**
- `VideoActivity.kt` line 2200 calls `backgroundProcessingManager.emitSocketEvent()` with a `MediaItem` object
- `BackgroundProcessingManager` tries to emit this raw object via Socket.IO
- Socket.IO cannot serialize Android `MediaItem` objects
- Event is either not sent or sent with corrupted data
- Backend never receives valid `currentAd` event
- Web app never receives `currentAdWeb` event

---

## PROMPT 1: Fix TV App - currentAd Emission Bug

### Context
The TV app is trying to emit `currentAd` events through `BackgroundProcessingManager`, but it's passing a raw `MediaItem` object that Socket.IO cannot serialize.

### Task
Fix the `BackgroundProcessingManager.emitSocketEvent()` method to properly handle `MediaItem` objects and convert them to JSON before emission.

### Implementation Instructions

**File to modify:** `app/src/main/java/com/kamran/tvadapp/BackgroundProcessingManager.kt`

**Changes needed:**

1. **Update the `emitSocketEvent` method** (lines 133-161):

```kotlin
fun emitSocketEvent(
    socketIO: SocketIO,
    eventName: String,
    data: Any,
    onComplete: (() -> Unit)? = null
) {
    scope.launch(ioDispatcher) {
        val operationId = "socket_${System.currentTimeMillis()}"
        val startTime = System.currentTimeMillis()
        
        try {
            activeOperations.incrementAndGet()
            logManager.logDebug(LogManager.TAG_SOCKET, "📡 [BG] Emitting socket event: $eventName")
            
            // ✅ FIX: Convert MediaItem to JSON before emitting
            val emitData = when (data) {
                is MediaItem -> {
                    // Convert MediaItem to JSONObject
                    val exoPlayer = (context as? VideoActivity)?.exoPlayer
                    JSONObject().apply {
                        put("title", data.mediaMetadata.title?.toString() ?: "Unknown")
                        put("index", exoPlayer?.currentMediaItemIndex ?: -1)
                        put("deviceId", socketIO.deviceId)
                    }
                }
                else -> data // For other data types, pass as-is
            }
            
            socketIO.getSocket()?.emit(eventName, emitData)
            
            operationMetrics[operationId] = System.currentTimeMillis() - startTime
            logManager.logDebug(LogManager.TAG_SOCKET, "✅ [BG] Socket event emitted: $eventName with data: $emitData")
            
            onComplete?.invoke()
            
        } catch (e: Exception) {
            logManager.logError(LogManager.TAG_SOCKET, "❌ [BG] Socket emission failed: $eventName - ${e.message}")
        } finally {
            activeOperations.decrementAndGet()
        }
    }
}
```

2. **Add necessary imports** at the top of the file:
```kotlin
import com.google.android.exoplayer2.MediaItem
import org.json.JSONObject
```

3. **Alternative simpler fix** - Just use the existing `socketIO.emitCurrentAd()` method instead:

**File to modify:** `app/src/main/java/com/kamran/tvadapp/VideoActivity.kt`

**Change line 2200-2204 from:**
```kotlin
backgroundProcessingManager.emitSocketEvent(
    socketIO = socketIO,
    eventName = "currentAd",
    data = it
)
```

**To:**
```kotlin
// Use the proper emitCurrentAd method that already handles JSON conversion
socketIO.emitCurrentAd(it, exoPlayer)
```

**Recommended:** Use the simpler fix (Alternative) as it's less code and uses the existing tested method.

### Expected Result
- TV app will emit `currentAd` events with proper JSON structure: `{deviceId, title, index}`
- Backend will receive and relay as `currentAdWeb`
- Web app will receive and display current ad information

---

## PROMPT 2: Verify and Fix TV App - AppState Emission

### Context
The TV app emits `AppState` events through two mechanisms:
1. **Periodic emission** via `MyApp.kt` - emits every X seconds
2. **Event-driven emission** via lifecycle callbacks when app goes foreground/background

The debounce mechanism (1 second) might be preventing emissions.

### Task
Verify AppState is being emitted correctly and add logging to debug.

### Implementation Instructions

**File to check:** `app/src/main/java/com/kamran/tvadapp/SocketIO.kt`

**Verify the debounceEmit method** (lines 222-238):

The current implementation has a 1-second debounce. This is CORRECT for preventing spam, but we need to ensure:
1. Socket is connected when emitting
2. DeviceId is being added to the JSON
3. Events are actually being sent

**Add enhanced logging:**

```kotlin
private fun debounceEmit(eventName: String, jsonObject: JSONObject) {
    val currentTime = System.currentTimeMillis()
    val lastEmitTime = lastEmitTimes[eventName] ?: 0L
    lastEmiteDStates[eventName] = jsonObject.getString("state")
    
    Log.d("SocketIO", "🔍 Debounce check for $eventName: currentTime=$currentTime, lastEmitTime=$lastEmitTime, diff=${currentTime - lastEmitTime}ms")
    
    if (currentTime - lastEmitTime >= 1000) { // 1 second debounce time
        lastEmitTimes[eventName] = currentTime
        jsonObject.put("deviceId", deviceId)
        
        if (::socket.isInitialized && socket.connected()) {
            socket.emit(eventName, jsonObject)
            Log.d("SocketIO", "✅ Emitted $eventName event: $jsonObject")
        } else {
            Log.e("SocketIO", "❌ Socket not connected. Cannot emit $eventName event. Initialized: ${::socket.isInitialized}, Connected: ${if (::socket.isInitialized) socket.connected() else false}")
        }
    } else {
        Log.d("SocketIO", "⏭️ Emit skipped for $eventName due to debounce (${1000 - (currentTime - lastEmitTime)}ms remaining)")
    }
}
```

**File to check:** `app/src/main/java/com/kamran/tvadapp/MyApp.kt`

**Verify the periodic emitter is started** (line 150-153):

Make sure `startAppStateEmitter()` is being called. Check if it's called in `onCreate()` or elsewhere.

**Add this after SocketManager initialization** (around line 75):
```kotlin
// Start periodic AppState emission
startAppStateEmitter()
Log.d("MyApp", "✅ AppState emitter started")
```

### Expected Result
- AppState events will be emitted every X seconds
- Events will include proper deviceId
- Backend will receive and relay as `AppStateWeb`
- Web app will receive and display app state (foreground/background)

---

## PROMPT 3: Verify Backend Event Relay (Sanity Check)

### Context
The backend should be receiving events from TV app and relaying them to web clients.

### Task
Add enhanced logging to verify events are being received and relayed correctly.

### Implementation Instructions

**File to modify:** `src/config/socket.js`

**Add enhanced logging to currentAd handler** (lines 57-64):

```javascript
// Listen for "currentAd" event
socket.on("currentAd", (data) => {
  const deviceId = data.deviceId;
  console.log("✅ [BACKEND] Received currentAd event for device:", deviceId);
  console.log("📦 [BACKEND] currentAd Data:", JSON.stringify(data, null, 2));
  console.log("📡 [BACKEND] Broadcasting as currentAdWeb to all clients");
  
  // Broadcast the update to all clients (including the web page)
  io.emit("currentAdWeb", data);
  
  console.log("✅ [BACKEND] currentAdWeb broadcasted successfully");
});
```

**Add enhanced logging to AppState handler** (lines 87-94):

```javascript
// Listen for "AppState" event
socket.on("AppState", (data) => {
  const deviceId = data.deviceId;
  console.log("✅ [BACKEND] Received AppState event for device:", deviceId);
  console.log("📦 [BACKEND] AppState Data:", JSON.stringify(data, null, 2));
  console.log("📡 [BACKEND] Broadcasting as AppStateWeb to all clients");
  
  // Broadcast the update to all clients
  io.emit("AppStateWeb", data);
  
  console.log("✅ [BACKEND] AppStateWeb broadcasted successfully");
});
```

### Expected Result
- Backend logs will show when events are received from TV app
- Backend logs will show when events are broadcasted to web clients
- This helps identify if the issue is TV→Backend or Backend→Web

---

## Testing Checklist

After implementing the fixes:

### TV App Testing
- [ ] Deploy updated TV app to device
- [ ] Check Android logs for "Emitted currentAd event" messages
- [ ] Check Android logs for "Emitted AppState event" messages
- [ ] Verify JSON structure in logs includes deviceId, title/state, index
- [ ] Confirm socket connection is established (look for "Device registered in room" log)

### Backend Testing
- [ ] Check backend console for "Received currentAd event" messages
- [ ] Check backend console for "Received AppState event" messages
- [ ] Verify data structure in backend logs
- [ ] Check backend console for "Broadcasting as currentAdWeb" messages
- [ ] Check backend console for "Broadcasting as AppStateWeb" messages

### Web App Testing
- [ ] Open browser console on web app
- [ ] Check for "Received currentAdWeb for device" messages
- [ ] Check for "Received AppStateWeb for device" messages
- [ ] Verify device state updates in UI
- [ ] Verify current ad title and index display in UI

---

## Priority Order

1. **HIGHEST PRIORITY:** Fix TV App currentAd emission bug (PROMPT 1 - Alternative fix)
2. **HIGH PRIORITY:** Verify AppState emission and add logging (PROMPT 2)
3. **MEDIUM PRIORITY:** Add backend logging for debugging (PROMPT 3)

Implement in this order for fastest resolution.

