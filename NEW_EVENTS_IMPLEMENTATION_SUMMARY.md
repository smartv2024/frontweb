# New Socket.IO Events Implementation Summary

## Overview
Successfully adapted the Angular web application to use the new Socket.IO events (`appStateChanged` and `playerStateChanged`) emitted by the TV app, while maintaining backward compatibility with legacy events.

---

## Changes Made

### 1. Backend (Node.js) - Enhanced Logging ✅

**File:** `src/config/socket.js`

#### appStateChanged Handler (Lines 305-323)
Added enhanced logging to track event reception and broadcasting:
```javascript
socket.on('appStateChanged', (data) => {
  console.log(`✅ [BACKEND] Received appStateChanged for device ${deviceId}: ${state}`);
  console.log(`📦 [BACKEND] appStateChanged Data:`, JSON.stringify(data, null, 2));
  console.log(`📡 [BACKEND] Broadcasting appStateChanged to all web clients`);
  io.emit('appStateChanged', data);
  console.log(`✅ [BACKEND] appStateChanged broadcasted successfully`);
});
```

#### playerStateChanged Handler (Lines 359-383)
Added enhanced logging to track event reception and broadcasting:
```javascript
socket.on('playerStateChanged', (data) => {
  console.log(`✅ [BACKEND] Received playerStateChanged for device ${deviceId}: ${playerState}`);
  console.log(`📦 [BACKEND] playerStateChanged Data:`, JSON.stringify(data, null, 2));
  console.log(`📡 [BACKEND] Broadcasting playerStateChanged to all web clients`);
  io.emit('playerStateChanged', data);
  console.log(`✅ [BACKEND] playerStateChanged broadcasted successfully`);
});
```

**Status:** Backend was already handling these events correctly, just added better logging.

---

### 2. Web App (Angular) - Event Listeners ✅

**File:** `src/app/admin/schedule/schedule.component.ts`

#### Added appStateChanged Listener (Lines 73-92)
Primary listener for new app state events:
```typescript
const appStateSub = this.socketService.listen<any>('appStateChanged').subscribe((data: any) => {
  console.log(`✅ Received appStateChanged for device ${data.deviceId}:`, data);
  this.deviceStateService.updateAppState(data.deviceId, data.state);
  // Updates schedules and UI
});
```

**Data Structure Expected:**
```json
{
  "deviceId": "XTJ1N",
  "state": "foreground" | "background",
  "timestamp": 1234567890
}
```

#### Added Legacy AppStateWeb Fallback (Lines 94-113)
Backward compatibility for older TV app versions:
```typescript
const appStateWebSub = this.socketService.listen<any>('AppStateWeb').subscribe((data: any) => {
  console.log(`⚠️ Received legacy AppStateWeb for device ${data.deviceId}:`, data);
  this.deviceStateService.updateAppState(data.deviceId, data.state);
});
```

#### Added playerStateChanged Listener (Lines 115-144)
Primary listener for new player state events:
```typescript
const playerStateSub = this.socketService.listen<any>('playerStateChanged').subscribe((data: any) => {
  console.log(`✅ Received playerStateChanged for device ${data.deviceId}:`, data);
  
  // Extract current ad info
  const currentAd = data.currentAd || {};
  const adTitle = currentAd.name || 'No title available';
  const adIndex = currentAd.index !== undefined ? currentAd.index : -1;
  
  this.deviceStateService.updatePlaylistState(data.deviceId, {
    title: adTitle,
    index: adIndex
  });
  // Updates schedules and UI
});
```

**Data Structure Expected:**
```json
{
  "deviceId": "XTJ1N",
  "playerState": "playing",
  "bufferPercentage": 14,
  "isStuck": false,
  "currentAd": {
    "id": "",
    "name": "Aromaone_Reel_cld.mp4",
    "url": "file:///storage/0000-0000/Movies/Aromaone_Reel_cld.mp4",
    "index": 0
  },
  "timestamp": 1234567890
}
```

**Data Extraction:**
- `adTitle` = `data.currentAd.name` (e.g., "Aromaone_Reel_cld.mp4")
- `adIndex` = `data.currentAd.index` (e.g., 0)
- Only uses what's needed, ignores `playerState`, `bufferPercentage`, `isStuck` for now

#### Added Legacy currentAdWeb Fallback (Lines 146-176)
Backward compatibility for older TV app versions:
```typescript
const currentAdWebSub = this.socketService.listen<any>('currentAdWeb').subscribe((data: any) => {
  console.log(`⚠️ Received legacy currentAdWeb for device ${data.deviceId}:`, data);
  this.deviceStateService.updatePlaylistState(data.deviceId, {
    title: data.title || 'No title available',
    index: data.index
  });
});
```

---

### 3. DeviceStateService - No Changes Needed ✅

**File:** `src/app/services/device-state.service.ts`

The existing methods work perfectly with the new events:
- `updateAppState(deviceId, state)` - Accepts state string
- `updatePlaylistState(deviceId, {title, index})` - Accepts ad title and index

No modifications required because we extract the needed data in the component before calling these methods.

---

## Event Flow

### App State Flow
```
TV App (StateMonitorManager.kt)
  ↓ emits "appStateChanged"
  ↓ {deviceId: "XTJ1N", state: "background", timestamp: ...}
  ↓
Backend (socket.js)
  ↓ receives "appStateChanged"
  ↓ logs reception
  ↓ broadcasts "appStateChanged" to all clients
  ↓
Web App (ScheduleComponent)
  ↓ receives "appStateChanged"
  ↓ extracts: deviceId, state
  ↓ calls DeviceStateService.updateAppState(deviceId, state)
  ↓ updates UI
```

### Player State Flow
```
TV App (StateMonitorManager.kt)
  ↓ emits "playerStateChanged"
  ↓ {deviceId: "XTJ1N", playerState: "playing", currentAd: {...}, ...}
  ↓
Backend (socket.js)
  ↓ receives "playerStateChanged"
  ↓ logs reception
  ↓ broadcasts "playerStateChanged" to all clients
  ↓
Web App (ScheduleComponent)
  ↓ receives "playerStateChanged"
  ↓ extracts: deviceId, currentAd.name, currentAd.index
  ↓ calls DeviceStateService.updatePlaylistState(deviceId, {title, index})
  ↓ updates UI
```

---

## Backward Compatibility

The web app now supports BOTH event systems:

### New Events (Primary)
- `appStateChanged` - With timestamp
- `playerStateChanged` - With player state, buffer %, stuck status, current ad

### Legacy Events (Fallback)
- `AppStateWeb` - Simple state only
- `currentAdWeb` - Simple title and index only

This ensures the web app works with:
- ✅ New TV app versions (using StateMonitorManager)
- ✅ Old TV app versions (using legacy SocketIO methods)
- ✅ Mixed deployments (some devices old, some new)

---

## Testing Checklist

### Backend Testing
- [ ] Start backend server
- [ ] Check console for connection messages
- [ ] When TV app emits events, verify logs show:
  - `✅ [BACKEND] Received appStateChanged for device XXX`
  - `📦 [BACKEND] appStateChanged Data: {...}`
  - `📡 [BACKEND] Broadcasting appStateChanged to all web clients`
  - `✅ [BACKEND] appStateChanged broadcasted successfully`
  - Same for `playerStateChanged`

### Web App Testing
- [ ] Open web app in browser
- [ ] Open browser console (F12)
- [ ] Navigate to Schedules page
- [ ] Verify socket connection: "Socket already connected, setting up subscriptions"
- [ ] When TV app changes state, verify logs show:
  - `✅ Received appStateChanged for device XXX: {...}`
  - `✅ Received playerStateChanged for device XXX: {...}`
- [ ] Verify UI updates:
  - App state shows "foreground" or "background"
  - Current ad title displays correctly
  - Current ad index displays correctly

### TV App Testing
- [ ] Check TV app logs for:
  - `Emitted appStateChanged: foreground/background`
  - `Emitted playerStateChanged: playing, buffer: X%, stuck: false`
- [ ] Verify events include deviceId
- [ ] Verify events include timestamp

---

## Files Modified

1. **Backend:**
   - `src/config/socket.js` - Added enhanced logging (lines 305-323, 359-383)

2. **Web App:**
   - `src/app/admin/schedule/schedule.component.ts` - Added new event listeners (lines 73-176)

3. **No Changes:**
   - `src/app/services/device-state.service.ts` - Already compatible

---

## Next Steps

1. **Deploy backend** with enhanced logging
2. **Deploy web app** with new event listeners
3. **Test with TV app** emitting new events
4. **Monitor logs** to verify event flow
5. **Verify UI updates** in real-time

---

## Troubleshooting

### If events are not received:

1. **Check TV app logs:**
   - Is it emitting `appStateChanged` and `playerStateChanged`?
   - Do events include `deviceId`?

2. **Check backend logs:**
   - Is backend receiving the events?
   - Is backend broadcasting them?

3. **Check web app console:**
   - Is socket connected?
   - Are listeners set up?
   - Are events being received?

4. **Check data structure:**
   - Does `playerStateChanged` include `currentAd` object?
   - Does `currentAd` have `name` and `index` properties?

---

## Success Criteria

✅ Backend logs show event reception and broadcasting  
✅ Web app console shows event reception  
✅ UI updates in real-time when TV app state changes  
✅ Current ad title and index display correctly  
✅ App state (foreground/background) displays correctly  
✅ Works with both new and legacy events

