# Event Support Implementation Summary

## Problem
The web app was not updating the UI correctly even though events were being received from the backend. The issue was that the web app was listening for different event names than what the TV app was sending.

## Events Being Sent by TV App
Based on the provided event data:
```json
{
  "playerStateChanged": {...},      // OLD EVENT NAME
  "playlistStateUpdated": {...},    // NEW EVENT NAME ✅
  "appStateUpdated": {...},          // NEW EVENT NAME ✅
  "deviceHealthUpdated": {...}       // NEW EVENT NAME ✅
}
```

## Changes Made

### 1. Added Event Listeners in ScheduleComponent
**File:** `src/app/admin/schedule/schedule.component.ts`

Added three new event listeners:

#### playlistStateUpdated (Lines 204-236)
```typescript
const playlistStateUpdatedSub = this.socketService.listen<any>('playlistStateUpdated').subscribe((data: any) => {
  console.log(`✅ Received playlistStateUpdated for device ${data.deviceId}:`, data);
  
  this.deviceStateService.updatePlaylistState(data.deviceId, {
    title: data.title || 'No title available',
    index: data.index
  });

  // Update schedule with playlist info AND health status
  this.schedules = this.schedules.map((schedule) => {
    if (schedule.deviceId.deviceId === data.deviceId) {
      const deviceHealth = this.deviceStateService.getDeviceHealth(data.deviceId);
      return {
        ...schedule,
        instantData: {
          ...schedule.instantData,
          titleVideo: data.title || 'No title available for this device',
          index: data.index + 1,
          status: deviceHealth.status,
          color: deviceHealth.color,
          message: deviceHealth.message,
          error: false,
        },
      };
    }
    return schedule;
  });

  this.updatePagination();
  this.cdr.detectChanges();
});
```

#### appStateUpdated (Lines 238-267)
```typescript
const appStateUpdatedSub = this.socketService.listen<any>('appStateUpdated').subscribe((data: any) => {
  console.log(`✅ Received appStateUpdated for device ${data.deviceId}:`, data);
  
  this.deviceStateService.updateAppState(data.deviceId, data.state);

  // Update schedules array to trigger UI refresh
  this.schedules = this.schedules.map((schedule) => {
    if (schedule.deviceId.deviceId === data.deviceId) {
      const deviceHealth = this.deviceStateService.getDeviceHealth(data.deviceId);
      return {
        ...schedule,
        instantData: {
          ...schedule.instantData,
          appState: data.state,
          status: deviceHealth.status,
          color: deviceHealth.color,
          message: deviceHealth.message,
        },
      };
    }
    return schedule;
  });

  this.updatePagination();
  this.cdr.detectChanges();
});
```

#### deviceHealthUpdated (Lines 269-302)
```typescript
const deviceHealthUpdatedSub = this.socketService.listen<any>('deviceHealthUpdated').subscribe((data: any) => {
  console.log(`✅ Received deviceHealthUpdated for device ${data.deviceId}:`, data);
  
  // Update device health directly in the service
  const state = this.deviceStateService.getDeviceState(data.deviceId);
  if (state) {
    state.health = {
      status: data.status,
      color: data.color,
      message: data.message,
      lastSeen: new Date(data.lastSeen)
    };
  }

  // Update schedules array to trigger UI refresh
  this.schedules = this.schedules.map((schedule) => {
    if (schedule.deviceId.deviceId === data.deviceId) {
      return {
        ...schedule,
        instantData: {
          ...schedule.instantData,
          status: data.status,
          color: data.color,
          message: data.message,
        },
      };
    }
    return schedule;
  });

  this.updatePagination();
  this.cdr.detectChanges();
});
```

### 2. Added getDeviceHealth Method to DeviceStateService
**File:** `src/app/services/device-state.service.ts` (Lines 70-84)

```typescript
// Get device health status
getDeviceHealth(deviceId: string): DeviceState['health'] {
  const state = this.deviceStates.get(deviceId);
  if (state) {
    return state.health;
  }
  // Return default health if device not found
  return {
    status: 'unknown',
    color: 'dot-orange',
    message: 'Waiting for device updates...',
    lastSeen: null
  };
}
```

## Expected Event Data Structures

### playlistStateUpdated
```json
{
  "deviceId": "XTJ1N",
  "title": "Aromaone_Reel_cld.mp4",
  "index": 0
}
```

### appStateUpdated
```json
{
  "deviceId": "XTJ1N",
  "state": "foreground"
}
```

### deviceHealthUpdated
```json
{
  "deviceId": "XTJ1N",
  "status": "healthy",
  "color": "dot-green",
  "message": "All Good!",
  "lastSeen": "2025-12-14T19:30:25+01:00"
}
```

## Backend Requirements

The backend server (at `https://tvad.onrender.com`) needs to relay these events from the TV app to the web app.

If the backend doesn't already have handlers for these events, add the following to the socket.js file:

```javascript
// Relay playlistStateUpdated event
socket.on('playlistStateUpdated', (data) => {
  console.log(`✅ [BACKEND] Received playlistStateUpdated for device ${data.deviceId}:`, data);
  io.emit('playlistStateUpdated', data);
  console.log(`📡 [BACKEND] Broadcasted playlistStateUpdated to all web clients`);
});

// Relay appStateUpdated event
socket.on('appStateUpdated', (data) => {
  console.log(`✅ [BACKEND] Received appStateUpdated for device ${data.deviceId}:`, data);
  io.emit('appStateUpdated', data);
  console.log(`📡 [BACKEND] Broadcasted appStateUpdated to all web clients`);
});

// Relay deviceHealthUpdated event
socket.on('deviceHealthUpdated', (data) => {
  console.log(`✅ [BACKEND] Received deviceHealthUpdated for device ${data.deviceId}:`, data);
  io.emit('deviceHealthUpdated', data);
  console.log(`📡 [BACKEND] Broadcasted deviceHealthUpdated to all web clients`);
});
```

## Testing

### 1. Check Browser Console
After deploying these changes, open the browser console (F12) and navigate to the Schedules page. You should see:

```
✅ Received playlistStateUpdated for device XTJ1N: {deviceId: "XTJ1N", title: "...", index: 0}
✅ Received appStateUpdated for device XTJ1N: {deviceId: "XTJ1N", state: "foreground"}
✅ Received deviceHealthUpdated for device XTJ1N: {deviceId: "XTJ1N", status: "healthy", ...}
```

### 2. Verify UI Updates
- **Current Video column**: Should update with the video title from `playlistStateUpdated`
- **Playlist column**: Should show the index number (index + 1)
- **App Status column**: Should show a colored dot based on device health
- **Status Message column**: Should display the health message

### 3. Backward Compatibility
The web app still supports the old event names for backward compatibility:
- `currentAdWeb` (legacy)
- `AppStateWeb` (legacy)
- `playerStateChanged` (alternative)
- `appStateChanged` (alternative)

## UI Elements Updated

The following UI elements are updated when events are received:

1. **schedule.instantData.titleVideo** - Current video title
2. **schedule.instantData.index** - Current playlist index (displayed as index + 1)
3. **schedule.instantData.status** - Device health status
4. **schedule.instantData.color** - Status indicator color (dot-green, dot-orange, dot-red, dot-gray)
5. **schedule.instantData.message** - Status message
6. **schedule.instantData.appState** - App state (foreground/background)

## Next Steps

1. **Deploy the web app changes** to production
2. **Verify backend** has handlers for the new events (or add them if missing)
3. **Test with a real device** to ensure events flow correctly
4. **Monitor console logs** to verify events are being received and processed

---

## Update 2: Color Logic Fix & UI Improvements

### Color Logic Changes (device-state.service.ts)

Updated the `calculateHealth()` method to match the required color scheme:

**New Color Rules:**
- ✅ **GREEN (dot-green)**: App in foreground AND playlist receiving updates
- ❌ **RED (dot-red)**:
  - App in background AND playlist receiving updates
  - App in background AND playlist NOT receiving updates
  - App in foreground but playlist stuck
- ⚫ **GRAY (dot-gray)**: Device offline (no updates for 10+ minutes)
- 🟠 **ORANGE (dot-orange)**: Unknown/initial state

### Console Spam Reduction

**Removed excessive logging:**
- Removed console.log from `getAppStateColor()` and `getPlaylistColor()` methods
- Modified `logState()` to only log when message changes
- Removed "Device states updated" log
- Removed "Updating app state" and "Updating playlist state" logs
- Removed "Emitting state change" log

**Kept important logs:**
- Event reception logs (when new events arrive)
- Device recovery logs (when device recovers from offline/broken)
- Status change logs (when device status actually changes)

### UI Improvements

**1. Column Width Adjustments:**
- Device: 15% → 18% (120px min-width)
- Current Video: 20% → 25% (180px min-width)
- App Status: 12% → 10% (70px min-width)
- Playlist: 12% → 10% (70px min-width)
- Status Message: 20% → 22% (160px min-width)
- Actions: 13% → 7% (60px min-width)

**2. Text Display Improvements:**
- **Device Name**: Now uses `device-name-text` class with:
  - Larger font (0.85rem)
  - Bold weight (600)
  - No truncation (white-space: normal, word-wrap: break-word)

- **Video Title**: Now uses `video-title-text` class with:
  - Larger font (0.8rem)
  - Green background highlight
  - No truncation (white-space: normal, word-wrap: break-word)

- **Status Message**: Now uses `status-message-full` class with:
  - Larger font (0.75rem)
  - Bold weight (600 for success/danger)
  - No truncation (white-space: normal, word-wrap: break-word)
  - Color-coded backgrounds (green for success, red for danger)

**3. Table Row Height:**
- Changed from fixed `height: 40px` to `min-height: 50px` with `height: auto`
- Allows rows to expand for multi-line content
- Increased padding from 6px to 8px for better readability

**4. Added CSS Classes:**
- `.dot-gray` - Gray color for offline devices
- `.device-name-text` - Better device name visibility
- `.video-title-text` - Better video title visibility
- `.status-message-full` - Full status message display without truncation

### Files Modified

1. **src/app/services/device-state.service.ts**
   - Updated `calculateHealth()` method with new color logic
   - Removed excessive console.log statements

2. **src/app/admin/schedule/schedule.component.ts**
   - Removed console.log from `getAppStateColor()` and `getPlaylistColor()`
   - Modified `logState()` to only log on message change
   - Removed "Device states updated" log

3. **src/app/admin/schedule/schedule.component.html**
   - Updated column widths in table header
   - Changed class names for device, video, and status message
   - Added tooltips for all text fields

4. **src/app/admin/schedule/schedule.component.css**
   - Added `.dot-gray` color class
   - Added `.device-name-text`, `.video-title-text`, `.status-message-full` classes
   - Updated table body styling to allow multi-line content
   - Updated column width optimizations
   - Increased padding and font sizes for better readability

---

## Update 3: Timer Logic Implementation

### Problem
The `deviceHealthUpdated` event was directly overwriting the health status, bypassing the web app's timer-based health calculation. This could cause inconsistencies between what the TV reports and what the web app calculates based on event timing.

### Solution
Added a new method `updateDeviceHealth()` in DeviceStateService that:
1. Updates the `lastSeen` timestamp (treats the event as a heartbeat)
2. Recalculates health based on the web app's own timer logic
3. Ensures consistency with timeout values

### Timer Configuration
```typescript
APP_STATE_TIMEOUT = 5 * 60 * 1000;      // 5 minutes
PLAYLIST_TIMEOUT = 2 * 60 * 1000;       // 2 minutes
OFFLINE_TIMEOUT = 10 * 60 * 1000;       // 10 minutes
HEALTH_CHECK_INTERVAL = 30 * 1000;      // 30 seconds
```

### How It Works

**Event Reception:**
- `appStateUpdated` → Updates `appState.lastUpdate` and `health.lastSeen`
- `playlistStateUpdated` → Updates `playlistState.lastUpdate` and `health.lastSeen`
- `deviceHealthUpdated` → Updates `health.lastSeen` only (heartbeat)

**Periodic Health Checks (every 30 seconds):**
1. Calculate age of each timer
2. Update stale flags:
   - `appState.isStale = (age > 5 minutes)`
   - `playlistState.isStale = (age > 2 minutes)`
3. Recalculate health status based on stale flags
4. Emit state change if status changed

**Health Calculation Priority:**
1. **GRAY**: Last seen > 10 minutes (offline)
2. **RED**: Both app and playlist stale (app crashed)
3. **GREEN**: App foreground + playlist fresh (healthy)
4. **RED**: App background + playlist fresh (needs attention)
5. **RED**: App background + playlist stale (broken)
6. **RED**: App foreground + playlist stale (playlist stuck)

### Files Modified

1. **src/app/services/device-state.service.ts**
   - Added `updateDeviceHealth()` method (lines 131-153)
   - Properly handles `deviceHealthUpdated` as a heartbeat
   - Recalculates health based on timer logic

2. **src/app/admin/schedule/schedule.component.ts**
   - Updated `deviceHealthUpdated` event handler (lines 266-298)
   - Now calls `updateDeviceHealth()` instead of directly modifying state
   - Gets recalculated health from service

### Benefits

1. **Consistency**: Health status is always calculated using the same logic
2. **Reliability**: Web app doesn't blindly trust TV's health report
3. **Accuracy**: Timer-based detection catches issues even if TV reports healthy
4. **Debugging**: Easier to troubleshoot since all health logic is in one place

### Documentation Created

- **TIMER_LOGIC_REFERENCE.md** - Comprehensive guide to timer logic with timeline examples


