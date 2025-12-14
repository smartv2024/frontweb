# Socket.IO Events Quick Reference

## Event Status Matrix

| Event Name | TV App Emits | Backend Relays As | Web App Listens | Status | Priority |
|------------|--------------|-------------------|-----------------|--------|----------|
| `currentAd` | ✅ Yes | `currentAdWeb` | ✅ Yes | ✅ WORKING | - |
| `AppState` | ✅ Yes | `AppStateWeb` | ✅ Yes | ✅ WORKING | - |
| `TVState` | ✅ Yes | `TVStateWeb` | ❌ No | ❌ BROKEN | HIGH |
| `SystemState` | ✅ Yes | `SystemStateWeb` | ❌ No | ❌ BROKEN | HIGH |
| `appStateChanged` | ✅ Yes | `appStateChanged` | ❌ No | ❌ BROKEN | MEDIUM |
| `tvStateChanged` | ✅ Yes | `tvStateChanged` | ❌ No | ❌ BROKEN | MEDIUM |
| `systemStateChanged` | ✅ Yes | `systemStateChanged` | ❌ No | ❌ BROKEN | MEDIUM |
| `playerStateChanged` | ✅ Yes | `playerStateChanged` | ❌ No | ❌ BROKEN | LOW |
| `checkStates` | - | - | - | ✅ WORKING | - |
| `returnState` | ✅ Yes | `returnStateWeb` | ✅ Yes | ✅ WORKING | - |

## Event Data Structures

### Working Events

#### `currentAdWeb`
```typescript
{
  deviceId: string,      // Device identifier
  title: string,         // Advertisement title
  index: number          // Current playlist index (0-based)
}
```
**Source:** TV App → Backend → Web App  
**Handler:** `DeviceStateService.updatePlaylistState()`

#### `AppStateWeb`
```typescript
{
  deviceId: string,      // Device identifier
  state: string          // "foreground" | "background"
}
```
**Source:** TV App → Backend → Web App  
**Handler:** `DeviceStateService.updateAppState()`

#### `returnStateWeb`
```typescript
{
  deviceId: string,      // Device identifier
  lastAppState: string,  // Last known app state
  lastSystemState: string, // Last known system state
  lastTvState: string    // Last known TV state
}
```
**Source:** TV App → Backend → Web App  
**Handler:** Schedule component updates

### Broken Events (Need Listeners)

#### `TVStateWeb` ❌
```typescript
{
  deviceId: string,      // Device identifier
  state: string          // "on" | "off"
}
```
**Source:** TV App → Backend → (Not consumed)  
**Fix:** Add listener in ScheduleComponent

#### `SystemStateWeb` ❌
```typescript
{
  deviceId: string,      // Device identifier
  state: string          // "boot_complete" | "rebooting"
}
```
**Source:** TV App → Backend → (Not consumed)  
**Fix:** Add listener in ScheduleComponent

### New Monitoring Events (Not Used)

#### `appStateChanged` ❌
```typescript
{
  deviceId: string,      // Device identifier
  state: string,         // "foreground" | "background"
  timestamp: number      // Unix timestamp
}
```

#### `tvStateChanged` ❌
```typescript
{
  deviceId: string,      // Device identifier
  state: string,         // "on" | "off"
  timestamp: number      // Unix timestamp
}
```

#### `systemStateChanged` ❌
```typescript
{
  deviceId: string,      // Device identifier
  state: string,         // System state
  timestamp: number      // Unix timestamp
}
```

#### `playerStateChanged` ❌
```typescript
{
  deviceId: string,      // Device identifier
  playerState: string,   // Player state
  bufferPercentage: number, // Buffer percentage
  isStuck: boolean,      // Is player stuck
  currentAd: object,     // Current ad info
  timestamp: number      // Unix timestamp
}
```

## Code Locations

### TV App (Android)
- **Legacy Events:** `app/src/main/java/com/kamran/tvadapp/SocketIO.kt`
  - Lines 190-219: Event emission methods
- **New Events:** `app/src/main/java/com/kamran/tvadapp/StateMonitorManager.kt`
  - Lines 70-160: State monitoring emissions

### Backend (Node.js)
- **Event Relay:** `src/config/socket.js`
  - Lines 57-94: Legacy event relay
  - Lines 306-377: New event relay
  - Lines 97-111: checkStates handler
  - Lines 114-120: returnState handler

### Web App (Angular)
- **Event Listeners:** `src/app/admin/schedule/schedule.component.ts`
  - Lines 74-92: AppStateWeb listener ✅
  - Lines 95-120: currentAdWeb listener ✅
  - Lines 123-141: returnStateWeb listener ✅
  - **MISSING:** TVStateWeb listener ❌
  - **MISSING:** SystemStateWeb listener ❌
- **State Management:** `src/app/services/device-state.service.ts`
  - Lines 71-93: updateAppState() ✅
  - Lines 96-118: updatePlaylistState() ✅
  - **MISSING:** updateTvState() ❌
  - **MISSING:** updateSystemState() ❌

## Quick Fix Checklist

### Step 1: Add Event Listeners (Web App)
- [ ] Add `TVStateWeb` listener in ScheduleComponent
- [ ] Add `SystemStateWeb` listener in ScheduleComponent
- [ ] Subscribe to both events in `subscribeToSocketEvents()`

### Step 2: Add State Handlers (DeviceStateService)
- [ ] Add `updateTvState(deviceId, state)` method
- [ ] Add `updateSystemState(deviceId, state)` method
- [ ] Update DeviceState interface to include tvState and systemState

### Step 3: Update TypeScript Interfaces
- [ ] Add tvState property to DeviceState interface
- [ ] Add systemState property to DeviceState interface
- [ ] Update health check logic to consider all states

### Step 4: Testing
- [ ] Test TVStateWeb event reception
- [ ] Test SystemStateWeb event reception
- [ ] Verify state persistence
- [ ] Test with multiple devices
- [ ] Test reconnection scenarios

## Implementation Priority

1. **HIGH Priority** (Immediate Fix)
   - Add `TVStateWeb` listener
   - Add `SystemStateWeb` listener
   - Implement basic state handlers

2. **MEDIUM Priority** (Short-term Enhancement)
   - Add new monitoring event listeners
   - Implement timestamp-based state tracking
   - Add player state monitoring

3. **LOW Priority** (Long-term Improvement)
   - Consolidate event systems
   - Deprecate legacy events
   - Implement comprehensive monitoring UI

