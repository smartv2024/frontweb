# Socket.IO Event Issue - Brief Summary

## Problem
Web application is NOT receiving `AppStateWeb` and `currentAdWeb` events from TV devices.

## Root Cause Found

### CRITICAL BUG: currentAd Event 🐛
**Location:** `app/src/main/java/com/kamran/tvadapp/BackgroundProcessingManager.kt` line 148

**Issue:** The TV app is emitting a raw Android `MediaItem` object instead of JSON:
```kotlin
socketIO.getSocket()?.emit(eventName, data)  // ❌ data is MediaItem object
```

Socket.IO cannot serialize Android objects, so the event is never properly sent.

**Fix:** Use the existing `socketIO.emitCurrentAd()` method instead:
```kotlin
// In VideoActivity.kt line 2200, change from:
backgroundProcessingManager.emitSocketEvent(socketIO, "currentAd", it)

// To:
socketIO.emitCurrentAd(it, exoPlayer)
```

### POTENTIAL ISSUE: AppState Event ⚠️
**Location:** `app/src/main/java/com/kamran/tvadapp/SocketIO.kt` line 222-238

**Issue:** AppState uses a 1-second debounce which is correct, but:
- Need to verify socket is connected when emitting
- Need to verify periodic emitter is started in MyApp.kt
- Need enhanced logging to debug

**Fix:** Add logging and ensure `startAppStateEmitter()` is called in `MyApp.onCreate()`

## Event Flow (Should Be)

```
TV App                    Backend                   Web App
------                    -------                   -------
emitCurrentAd()    -->    receives "currentAd"  --> emits "currentAdWeb"  --> ✅ Listener exists
  {deviceId,              relays to all clients     {deviceId,
   title,                                            title,
   index}                                            index}

emitAppState()     -->    receives "AppState"   --> emits "AppStateWeb"   --> ✅ Listener exists
  {deviceId,              relays to all clients     {deviceId,
   state}                                            state}
```

## What's Working ✅
- Backend relay logic is correct
- Web app listeners are set up correctly
- AppState emission logic exists (just needs verification)

## What's Broken ❌
- **currentAd emission** - Emitting wrong data type
- **AppState emission** - May not be running or socket not connected

## Quick Fix Instructions

### For TV App (Android/Kotlin)

**File:** `app/src/main/java/com/kamran/tvadapp/VideoActivity.kt`  
**Line:** 2200-2204

**Change:**
```kotlin
// OLD (BROKEN):
backgroundProcessingManager.emitSocketEvent(
    socketIO = socketIO,
    eventName = "currentAd",
    data = it
)

// NEW (FIXED):
socketIO.emitCurrentAd(it, exoPlayer)
```

**File:** `app/src/main/java/com/kamran/tvadapp/MyApp.kt`  
**Line:** ~75 (after SocketManager initialization)

**Add:**
```kotlin
// Start periodic AppState emission
startAppStateEmitter()
Log.d("MyApp", "✅ AppState emitter started")
```

### For Backend (Optional - for debugging)

**File:** `src/config/socket.js`  
**Lines:** 57-64 and 87-94

**Add enhanced logging:**
```javascript
socket.on("currentAd", (data) => {
  console.log("✅ [BACKEND] Received currentAd:", JSON.stringify(data));
  io.emit("currentAdWeb", data);
  console.log("📡 [BACKEND] Broadcasted currentAdWeb");
});

socket.on("AppState", (data) => {
  console.log("✅ [BACKEND] Received AppState:", JSON.stringify(data));
  io.emit("AppStateWeb", data);
  console.log("📡 [BACKEND] Broadcasted AppStateWeb");
});
```

### For Web App (No changes needed)
Web app listeners are already correctly set up. No changes required.

## Testing After Fix

1. **Deploy TV app** with the fix
2. **Check TV app logs** for:
   - "Emitted currentAd event: {deviceId:..., title:..., index:...}"
   - "Emitted AppState event: {deviceId:..., state:...}"
3. **Check backend logs** for:
   - "Received currentAd: {deviceId:..., title:..., index:...}"
   - "Received AppState: {deviceId:..., state:...}"
   - "Broadcasted currentAdWeb"
   - "Broadcasted AppStateWeb"
4. **Check web app console** for:
   - "Received currentAdWeb for device XXX: {deviceId:..., title:..., index:...}"
   - "Received AppStateWeb for device XXX: {deviceId:..., state:...}"
5. **Verify UI updates** in web app schedule page

## Expected Data Structures

### currentAdWeb
```json
{
  "deviceId": "device_123",
  "title": "Advertisement Title",
  "index": 0
}
```

### AppStateWeb
```json
{
  "deviceId": "device_123",
  "state": "foreground"
}
```
or
```json
{
  "deviceId": "device_123",
  "state": "background"
}
```

## Files Involved

### TV App (Android)
- `app/src/main/java/com/kamran/tvadapp/VideoActivity.kt` - Fix currentAd emission
- `app/src/main/java/com/kamran/tvadapp/MyApp.kt` - Verify AppState emitter starts
- `app/src/main/java/com/kamran/tvadapp/SocketIO.kt` - Add logging (optional)

### Backend (Node.js)
- `src/config/socket.js` - Add logging (optional)

### Web App (Angular)
- No changes needed - already correct

## Priority
1. **Fix currentAd emission** (5 minutes)
2. **Verify AppState emitter** (5 minutes)
3. **Add logging** (10 minutes)
4. **Test end-to-end** (15 minutes)

**Total estimated time:** 35 minutes

