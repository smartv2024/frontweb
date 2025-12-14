# Testing Guide - New Socket.IO Events

## Quick Start Testing

### 1. Start Backend
```bash
cd backend
npm start
```

**Expected Output:**
```
[Socket.IO] Client connected: <socket-id> | Total connections: 1
```

### 2. Start Web App
```bash
cd web
npm start
```

**Expected Output:**
```
Angular Live Development Server is listening on localhost:4200
```

### 3. Open Web App
1. Navigate to `http://localhost:4200`
2. Login to admin panel
3. Go to Schedules page
4. Open browser console (F12)

**Expected Console Output:**
```
Socket already connected, setting up subscriptions
📊 Device states updated: X devices
```

### 4. Trigger Events from TV App

The TV app should automatically emit events when:
- App goes to foreground/background → `appStateChanged`
- Video plays/pauses/changes → `playerStateChanged`

---

## Detailed Testing Steps

### Test 1: App State Events

#### TV App Side
**Expected Log:**
```
Emitted appStateChanged: background
```

**Data Structure:**
```json
{
  "deviceId": "XTJ1N",
  "state": "background",
  "timestamp": 1234567890
}
```

#### Backend Side
**Expected Logs:**
```
✅ [BACKEND] Received appStateChanged for device XTJ1N: background
📦 [BACKEND] appStateChanged Data: {
  "deviceId": "XTJ1N",
  "state": "background",
  "timestamp": 1234567890
}
📡 [BACKEND] Broadcasting appStateChanged to all web clients
✅ [BACKEND] appStateChanged broadcasted successfully
```

#### Web App Side
**Expected Console Log:**
```
✅ Received appStateChanged for device XTJ1N: {deviceId: "XTJ1N", state: "background", timestamp: 1234567890}
🔄 DeviceStateService: Updating app state for XTJ1N to background
📊 Device XTJ1N health after app state update: {status: "degraded", color: "dot-orange", ...}
```

**Expected UI:**
- Device row shows app state: "background"
- Health indicator may change to orange

---

### Test 2: Player State Events

#### TV App Side
**Expected Log:**
```
Emitted playerStateChanged: playing, buffer: 14%, stuck: false, currentAd: {"id":"","name":"Aromaone_Reel_cld.mp4","url":"file:///storage/0000-0000/Movies/Aromaone_Reel_cld.mp4","index":0}
```

**Data Structure:**
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

#### Backend Side
**Expected Logs:**
```
✅ [BACKEND] Received playerStateChanged for device XTJ1N: playing
📦 [BACKEND] playerStateChanged Data: {
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
📡 [BACKEND] Broadcasting playerStateChanged to all web clients
✅ [BACKEND] playerStateChanged broadcasted successfully
```

#### Web App Side
**Expected Console Log:**
```
✅ Received playerStateChanged for device XTJ1N: {deviceId: "XTJ1N", playerState: "playing", currentAd: {...}, ...}
🔄 DeviceStateService: Updating playlist state for XTJ1N {title: "Aromaone_Reel_cld.mp4", index: 0}
📊 Device XTJ1N health after playlist update: {status: "healthy", color: "dot-green", ...}
```

**Expected UI:**
- Current ad title: "Aromaone_Reel_cld.mp4"
- Current ad index: "1" (index 0 + 1 for display)
- Health indicator: Green (if app is foreground)

---

## Troubleshooting

### Issue: No events received in web app

**Check 1: Is TV app emitting?**
```
Look for TV app logs:
- "Emitted appStateChanged: ..."
- "Emitted playerStateChanged: ..."
```

**Check 2: Is backend receiving?**
```
Look for backend logs:
- "✅ [BACKEND] Received appStateChanged..."
- "✅ [BACKEND] Received playerStateChanged..."
```

**Check 3: Is backend broadcasting?**
```
Look for backend logs:
- "✅ [BACKEND] appStateChanged broadcasted successfully"
- "✅ [BACKEND] playerStateChanged broadcasted successfully"
```

**Check 4: Is web app connected?**
```
Look for web console logs:
- "Connected to socket server"
- "Socket already connected, setting up subscriptions"
```

**Check 5: Are listeners set up?**
```
Look for web console logs:
- Should NOT see "Socket is not connected" error
```

---

### Issue: Events received but UI not updating

**Check 1: Device ID match**
```
Verify deviceId in event matches deviceId in schedule:
- Event: data.deviceId = "XTJ1N"
- Schedule: schedule.deviceId.deviceId = "XTJ1N"
```

**Check 2: Data extraction**
```
For playerStateChanged, verify:
- data.currentAd exists
- data.currentAd.name exists
- data.currentAd.index exists
```

**Check 3: DeviceStateService**
```
Look for console logs:
- "🔄 DeviceStateService: Updating app state..."
- "🔄 DeviceStateService: Updating playlist state..."
- "📊 Device XXX health after..."
```

---

### Issue: Legacy events still being used

**This is OK!** The web app supports both:
- New events: `appStateChanged`, `playerStateChanged`
- Legacy events: `AppStateWeb`, `currentAdWeb`

**Expected behavior:**
- If TV app emits new events → Web app uses them (logs show ✅)
- If TV app emits legacy events → Web app uses them (logs show ⚠️)
- Both work correctly

---

## Success Indicators

### Backend Console
```
✅ [BACKEND] Received appStateChanged for device XTJ1N: background
✅ [BACKEND] appStateChanged broadcasted successfully
✅ [BACKEND] Received playerStateChanged for device XTJ1N: playing
✅ [BACKEND] playerStateChanged broadcasted successfully
```

### Web App Console
```
✅ Received appStateChanged for device XTJ1N: {...}
✅ Received playerStateChanged for device XTJ1N: {...}
🔄 DeviceStateService: Updating app state for XTJ1N to background
🔄 DeviceStateService: Updating playlist state for XTJ1N {...}
📊 Device XTJ1N health after app state update: {...}
```

### Web App UI
- ✅ App state displays correctly (foreground/background)
- ✅ Current ad title displays correctly
- ✅ Current ad index displays correctly
- ✅ Health indicator updates (green/orange/red)
- ✅ Updates happen in real-time (no refresh needed)

---

## Performance Notes

- Events are debounced on TV app side (1 second for state events)
- Web app updates UI immediately upon receiving events
- DeviceStateService caches state in memory and localStorage
- Health checks run every 30 seconds automatically

