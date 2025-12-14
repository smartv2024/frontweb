# Socket.IO Event Analysis Report

## Executive Summary

This document analyzes the Socket.IO event flow between the Angular web application, Node.js backend, and Android TV app to identify discrepancies causing state update failures.

## 1. Web Application Expected Events

### 1.1 Events the Web App Listens For

The Angular web application (`src/app/admin/schedule/schedule.component.ts`) listens for the following events:

#### Event: `AppStateWeb`
- **Expected Data Structure:**
  ```typescript
  {
    deviceId: string,
    state: string  // e.g., "foreground" | "background"
  }
  ```
- **Purpose:** Updates device app state (foreground/background)
- **Handler:** `DeviceStateService.updateAppState(deviceId, state)`

#### Event: `currentAdWeb`
- **Expected Data Structure:**
  ```typescript
  {
    deviceId: string,
    title: string,
    index: number
  }
  ```
- **Purpose:** Updates current playing advertisement and playlist position
- **Handler:** `DeviceStateService.updatePlaylistState(deviceId, {title, index})`

#### Event: `returnStateWeb`
- **Expected Data Structure:**
  ```typescript
  {
    deviceId: string,
    lastAppState: string,
    lastSystemState: string,
    lastTvState: string
  }
  ```
- **Purpose:** Receives device state snapshot in response to `checkStates` request
- **Handler:** Updates schedule data with returned state information

### 1.2 Events the Web App Emits

#### Event: `checkStates`
- **Data Structure:**
  ```typescript
  {
    devices: string[]  // Array of device IDs
  }
  ```
- **Purpose:** Request current state from multiple devices

## 2. Backend Implementation Analysis

### 2.1 Event Relay Pattern

The backend (`src/config/socket.js`) acts as a relay, receiving events from TV devices and broadcasting them to web clients with modified event names:

#### Pattern 1: State Events (Lines 57-94)
```javascript
// TV App emits → Backend receives → Backend broadcasts to Web
socket.on("currentAd", (data) => {
  io.emit("currentAdWeb", data);  // ✅ CORRECT
});

socket.on("TVState", (data) => {
  io.emit("TVStateWeb", data);    // ⚠️ NOT USED BY WEB APP
});

socket.on("SystemState", (data) => {
  io.emit("SystemStateWeb", data); // ⚠️ NOT USED BY WEB APP
});

socket.on("AppState", (data) => {
  io.emit("AppStateWeb", data);    // ✅ CORRECT
});
```

#### Pattern 2: New State Monitoring Events (Lines 306-377)
The backend also supports newer event patterns:
```javascript
socket.on('appStateChanged', (data) => {
  io.emit('appStateChanged', data);  // ⚠️ NOT USED BY WEB APP
});

socket.on('tvStateChanged', (data) => {
  io.emit('tvStateChanged', data);   // ⚠️ NOT USED BY WEB APP
});

socket.on('systemStateChanged', (data) => {
  io.emit('systemStateChanged', data); // ⚠️ NOT USED BY WEB APP
});

socket.on('playerStateChanged', (data) => {
  io.emit('playerStateChanged', data); // ⚠️ NOT USED BY WEB APP
});
```

### 2.2 CheckStates Handler (Lines 97-111)
```javascript
socket.on("checkStates", (data) => {
  data.devices.forEach((deviceId) => {
    io.to(`device_${deviceId}`).emit(`checkState/${deviceId}`, "checkState");
  });
});
```
✅ **CORRECT** - Properly routes to device-specific rooms

### 2.3 ReturnState Handler (Lines 114-120)
```javascript
socket.on("returnState", (data) => {
  io.emit(`returnStateWeb`, data);  // ✅ CORRECT
});
```

## 3. TV App Implementation Analysis

### 3.1 Events the TV App Emits

The Android TV app uses **TWO DIFFERENT** event emission patterns:

#### Pattern A: Legacy Events (SocketIO.kt)
```kotlin
// Lines 190-204: Current Ad
socket.emit("currentAd", {
  title: string,
  index: number,
  deviceId: string
})  // ✅ CORRECT

// Lines 207-219: State Events
socket.emit("TVState", {
  state: string,
  deviceId: string
})  // ⚠️ Backend relays as TVStateWeb (NOT USED BY WEB)

socket.emit("AppState", {
  state: string,
  deviceId: string
})  // ✅ Backend relays as AppStateWeb (CORRECT)

socket.emit("SystemState", {
  state: string,
  deviceId: string
})  // ⚠️ Backend relays as SystemStateWeb (NOT USED BY WEB)
```

#### Pattern B: New State Monitoring Events (StateMonitorManager.kt)
```kotlin
// Lines 70-84: App State Changed
socket.emit("appStateChanged", {
  deviceId: string,
  state: string,
  timestamp: long
})  // ⚠️ NOT USED BY WEB APP

// Lines 89-103: TV State Changed
socket.emit("tvStateChanged", {
  deviceId: string,
  state: string,
  timestamp: long
})  // ⚠️ NOT USED BY WEB APP

// Lines 108-122: System State Changed
socket.emit("systemStateChanged", {
  deviceId: string,
  state: string,
  timestamp: long
})  // ⚠️ NOT USED BY WEB APP

// Lines 127-160: Player State Changed
socket.emit("playerStateChanged", {
  deviceId: string,
  playerState: string,
  bufferPercentage: number,
  isStuck: boolean,
  currentAd: object,
  timestamp: long
})  // ⚠️ NOT USED BY WEB APP
```

### 3.2 Events the TV App Listens For

```kotlin
// Line 140: Check State Request
socket.on("checkState/${deviceId}", () => {
  emitLastStates()  // ✅ CORRECT
})

// Line 132: Update Schedule
socket.on("updateSchedule/${deviceId}", () => {
  triggerScheduleUpdate()  // ✅ CORRECT
})
```

### 3.3 ReturnState Response (Lines 154-168)
```kotlin
socket.emit("returnState", {
  lastAppState: string,
  lastSystemState: string,
  lastTvState: string,
  deviceId: string
})  // ✅ CORRECT
```

## 4. Identified Discrepancies

### 4.1 CRITICAL: Dual Event System Confusion

**Problem:** The TV app has TWO parallel event emission systems that are NOT being used by the web app:

1. **Legacy System** (SocketIO.kt): `AppState`, `TVState`, `SystemState`
   - Backend relays these as: `AppStateWeb`, `TVStateWeb`, `SystemStateWeb`
   - Web app ONLY listens to `AppStateWeb` ✅
   - Web app DOES NOT listen to `TVStateWeb` ❌
   - Web app DOES NOT listen to `SystemStateWeb` ❌

2. **New System** (StateMonitorManager.kt): `appStateChanged`, `tvStateChanged`, `systemStateChanged`, `playerStateChanged`
   - Backend broadcasts these as-is
   - Web app DOES NOT listen to ANY of these events ❌

### 4.2 Missing Event Listeners in Web App

The web application is NOT listening for:
- `TVStateWeb` - TV on/off state
- `SystemStateWeb` - System boot state
- `tvStateChanged` - New TV state monitoring
- `systemStateChanged` - New system state monitoring
- `appStateChanged` - New app state monitoring
- `playerStateChanged` - Player state with buffer info

**Impact:** The web app cannot track:
- Whether the TV screen is on/off
- System boot status
- Player buffering issues
- Detailed player state

### 4.3 Unused Backend Infrastructure

The backend has extensive state monitoring infrastructure (lines 303-451) that is:
- ✅ Properly implemented
- ✅ Storing state in memory
- ❌ NOT being consumed by the web app

### 4.4 Event Data Structure Inconsistencies

**Legacy Events:**
```javascript
{ deviceId: string, state: string }
```

**New Events:**
```javascript
{ deviceId: string, state: string, timestamp: number }
```

The new events include timestamps for better state tracking, but the web app doesn't use them.

## 5. Root Cause Analysis

### Why Events Are Not Being Received

1. **AppState Updates:** ✅ WORKING
   - TV app emits: `AppState`
   - Backend relays as: `AppStateWeb`
   - Web app listens for: `AppStateWeb`
   - **Status:** FUNCTIONAL

2. **Playlist Updates:** ✅ WORKING
   - TV app emits: `currentAd`
   - Backend relays as: `currentAdWeb`
   - Web app listens for: `currentAdWeb`
   - **Status:** FUNCTIONAL

3. **TV State Updates:** ❌ NOT WORKING
   - TV app emits: `TVState`
   - Backend relays as: `TVStateWeb`
   - Web app listens for: **NOTHING**
   - **Status:** BROKEN - Web app doesn't listen for this event

4. **System State Updates:** ❌ NOT WORKING
   - TV app emits: `SystemState`
   - Backend relays as: `SystemStateWeb`
   - Web app listens for: **NOTHING**
   - **Status:** BROKEN - Web app doesn't listen for this event

5. **New State Monitoring:** ❌ NOT WORKING
   - TV app emits: `appStateChanged`, `tvStateChanged`, `systemStateChanged`, `playerStateChanged`
   - Backend broadcasts as-is
   - Web app listens for: **NOTHING**
   - **Status:** BROKEN - Web app doesn't have listeners

## 6. Proposed Solutions

### 6.1 Recommended Approach: Extend Web App (Minimal Breaking Changes)

**Priority: HIGH** - Add missing event listeners to the web application to consume existing backend/TV app events.

#### Solution A: Add Legacy Event Listeners (Quick Fix)

**File:** `src/app/admin/schedule/schedule.component.ts`

Add listeners for `TVStateWeb` and `SystemStateWeb`:

```typescript
// Listen for TVStateWeb events
const tvStateSub = this.socketService.listen<any>('TVStateWeb').subscribe((data: any) => {
  console.log(`Received TVStateWeb for device ${data.deviceId}:`, data);
  this.deviceStateService.updateTvState(data.deviceId, data.state);

  // Update schedule with TV state
  this.schedules = this.schedules.map((schedule) => {
    if (schedule.deviceId.deviceId === data.deviceId) {
      return {
        ...schedule,
        tvState: data.state
      };
    }
    return schedule;
  });

  this.updatePagination();
  this.cdr.detectChanges();
});
this.subscriptions.push(tvStateSub);

// Listen for SystemStateWeb events
const systemStateSub = this.socketService.listen<any>('SystemStateWeb').subscribe((data: any) => {
  console.log(`Received SystemStateWeb for device ${data.deviceId}:`, data);
  this.deviceStateService.updateSystemState(data.deviceId, data.state);

  // Update schedule with system state
  this.schedules = this.schedules.map((schedule) => {
    if (schedule.deviceId.deviceId === data.deviceId) {
      return {
        ...schedule,
        systemState: data.state
      };
    }
    return schedule;
  });

  this.updatePagination();
  this.cdr.detectChanges();
});
this.subscriptions.push(systemStateSub);
```

**File:** `src/app/services/device-state.service.ts`

Add methods to handle TV and System state:

```typescript
// Update TV state when TVStateWeb event received
updateTvState(deviceId: string, tvStateValue: string): void {
  console.log(`🔄 DeviceStateService: Updating TV state for ${deviceId} to ${tvStateValue}`);
  const state = this.getOrCreateDeviceState(deviceId);
  const now = new Date();

  state.tvState = {
    value: tvStateValue as 'on' | 'off',
    lastUpdate: now,
    isStale: false
  };

  state.health.lastSeen = now;
  this.checkDeviceHealth(deviceId);
  this.emitStateChange();
  this.syncToLocalStorage();
}

// Update system state when SystemStateWeb event received
updateSystemState(deviceId: string, systemStateValue: string): void {
  console.log(`🔄 DeviceStateService: Updating system state for ${deviceId} to ${systemStateValue}`);
  const state = this.getOrCreateDeviceState(deviceId);
  const now = new Date();

  state.systemState = {
    value: systemStateValue as 'boot_complete' | 'rebooting',
    lastUpdate: now,
    isStale: false
  };

  state.health.lastSeen = now;
  this.checkDeviceHealth(deviceId);
  this.emitStateChange();
  this.syncToLocalStorage();
}
```

#### Solution B: Adopt New State Monitoring System (Future-Proof)

**Priority: MEDIUM** - Migrate to the newer, more comprehensive state monitoring events.

Add listeners for the new event system:

```typescript
// Listen for appStateChanged events (with timestamp)
const appStateChangedSub = this.socketService.listen<any>('appStateChanged').subscribe((data: any) => {
  console.log(`Received appStateChanged for device ${data.deviceId}:`, data);
  this.deviceStateService.updateAppStateWithTimestamp(data.deviceId, data.state, data.timestamp);
});
this.subscriptions.push(appStateChangedSub);

// Listen for tvStateChanged events (with timestamp)
const tvStateChangedSub = this.socketService.listen<any>('tvStateChanged').subscribe((data: any) => {
  console.log(`Received tvStateChanged for device ${data.deviceId}:`, data);
  this.deviceStateService.updateTvStateWithTimestamp(data.deviceId, data.state, data.timestamp);
});
this.subscriptions.push(tvStateChangedSub);

// Listen for playerStateChanged events (detailed player info)
const playerStateChangedSub = this.socketService.listen<any>('playerStateChanged').subscribe((data: any) => {
  console.log(`Received playerStateChanged for device ${data.deviceId}:`, data);
  this.deviceStateService.updatePlayerState(data.deviceId, {
    playerState: data.playerState,
    bufferPercentage: data.bufferPercentage,
    isStuck: data.isStuck,
    currentAd: data.currentAd,
    timestamp: data.timestamp
  });
});
this.subscriptions.push(playerStateChangedSub);
```

### 6.2 Alternative Approach: Consolidate TV App Events (Breaking Changes)

**Priority: LOW** - Only if web app changes are not feasible.

**Not Recommended** because:
- Requires changes to TV app (deployed on devices)
- May break other integrations
- Backend already handles both patterns correctly

### 6.3 Hybrid Approach: Support Both Systems

**Priority: MEDIUM** - Best long-term solution.

1. Keep legacy events working (AppStateWeb, TVStateWeb, SystemStateWeb)
2. Add new event listeners for enhanced monitoring
3. Gradually migrate to new system
4. Deprecate legacy events after migration

## 7. Implementation Recommendations

### Phase 1: Quick Fix (Immediate)
1. ✅ Add `TVStateWeb` listener to web app
2. ✅ Add `SystemStateWeb` listener to web app
3. ✅ Update DeviceStateService with new methods
4. ✅ Test with existing TV app deployment

**Estimated Effort:** 2-4 hours
**Risk:** Low
**Impact:** Restores TV and System state tracking

### Phase 2: Enhanced Monitoring (Short-term)
1. Add listeners for new state monitoring events
2. Extend DeviceStateService to handle timestamps
3. Add player state monitoring UI
4. Implement buffer/stuck detection alerts

**Estimated Effort:** 1-2 days
**Risk:** Low
**Impact:** Comprehensive device monitoring

### Phase 3: Consolidation (Long-term)
1. Migrate all components to new event system
2. Deprecate legacy events
3. Update TV app to only emit new events
4. Clean up backend relay logic

**Estimated Effort:** 3-5 days
**Risk:** Medium
**Impact:** Cleaner, more maintainable codebase

## 8. Testing Checklist

- [ ] Verify `AppStateWeb` events are received (already working)
- [ ] Verify `currentAdWeb` events are received (already working)
- [ ] Verify `TVStateWeb` events are received after fix
- [ ] Verify `SystemStateWeb` events are received after fix
- [ ] Test `checkStates` request/response flow
- [ ] Test device state persistence in DeviceStateService
- [ ] Test state staleness detection
- [ ] Test health status updates
- [ ] Verify no duplicate event emissions
- [ ] Test with multiple devices simultaneously
- [ ] Test reconnection scenarios

## 9. Conclusion

**Root Cause:** The web application is only listening for 2 out of 4 legacy events (`AppStateWeb` and `currentAdWeb`) and none of the new state monitoring events.

**Impact:** TV state, system state, and enhanced player monitoring are not functional.

**Solution:** Add missing event listeners to the web application (Phase 1 quick fix) to restore full functionality with minimal changes and no breaking changes to deployed TV apps.

**Next Steps:**
1. Implement Phase 1 quick fix
2. Test thoroughly
3. Plan Phase 2 for enhanced monitoring
4. Consider Phase 3 for long-term consolidation

