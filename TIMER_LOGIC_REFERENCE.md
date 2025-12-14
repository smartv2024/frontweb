# Device State Timer Logic Reference

## Overview

The web app tracks device health using three independent timers:
1. **App State Timer** - Tracks when app state updates were last received
2. **Playlist State Timer** - Tracks when playlist updates were last received  
3. **Last Seen Timer** - Tracks when ANY event was last received

## Timer Configuration

```typescript
APP_STATE_TIMEOUT = 5 * 60 * 1000;      // 5 minutes
PLAYLIST_TIMEOUT = 2 * 60 * 1000;       // 2 minutes
OFFLINE_TIMEOUT = 10 * 60 * 1000;       // 10 minutes
HEALTH_CHECK_INTERVAL = 30 * 1000;      // 30 seconds
```

## How Timers Work

### 1. Event Reception Updates Timestamps

When events are received, the following timestamps are updated:

#### `appStateUpdated` Event
```typescript
state.appState.lastUpdate = now;        // Updates app state timer
state.appState.isStale = false;         // Resets stale flag
state.health.lastSeen = now;            // Updates last seen timer
```

#### `playlistStateUpdated` Event
```typescript
state.playlistState.lastUpdate = now;   // Updates playlist timer
state.playlistState.isStale = false;    // Resets stale flag
state.health.lastSeen = now;            // Updates last seen timer
```

#### `deviceHealthUpdated` Event
```typescript
state.health.lastSeen = new Date(data.lastSeen);  // Updates last seen timer
// Note: This is a heartbeat - actual health is recalculated based on timers
```

### 2. Periodic Health Checks

Every **30 seconds**, the `checkAllDevicesHealth()` method runs and:

1. **Calculates age of each timer:**
   ```typescript
   appStateAge = now - state.appState.lastUpdate
   playlistAge = now - state.playlistState.lastUpdate
   lastSeenAge = now - state.health.lastSeen
   ```

2. **Updates stale flags:**
   ```typescript
   state.appState.isStale = (appStateAge > 5 minutes)
   state.playlistState.isStale = (playlistAge > 2 minutes)
   ```

3. **Recalculates health status** based on stale flags and last seen age

4. **Emits state change** if status changed

### 3. Health Calculation Logic

The health is calculated in this priority order:

#### Priority 1: Device Offline (GRAY)
```typescript
if (lastSeenAge > 10 minutes) {
  status = 'offline'
  color = 'dot-gray'
  message = 'Device offline - no updates for 10+ minutes'
}
```

#### Priority 2: Both Stale (RED)
```typescript
if (appState.isStale && playlistState.isStale) {
  status = 'broken'
  color = 'dot-red'
  message = 'ERROR: App down, check the TV'
}
```

#### Priority 3: App Foreground + Playlist OK (GREEN)
```typescript
if (appState.value === 'foreground' && !playlistState.isStale) {
  status = 'healthy'
  color = 'dot-green'
  message = 'All Good!'
}
```

#### Priority 4: App Background + Playlist OK (RED)
```typescript
if (appState.value === 'background' && !playlistState.isStale) {
  status = 'degraded'
  color = 'dot-red'
  message = 'App in background but playlist working'
}
```

#### Priority 5: App Background + Playlist Stale (RED)
```typescript
if (appState.value === 'background' && playlistState.isStale) {
  status = 'broken'
  color = 'dot-red'
  message = 'App in background, playlist stopped'
}
```

#### Priority 6: App Foreground + Playlist Stale (RED)
```typescript
if (appState.value === 'foreground' && playlistState.isStale) {
  status = 'broken'
  color = 'dot-red'
  message = 'App working but Playlist blocked, restart playlist'
}
```

## Timeline Examples

### Example 1: Normal Operation (GREEN)
```
Time 0:00 - appStateUpdated (foreground) received
Time 0:00 - playlistStateUpdated received
Time 0:30 - Health check: Both fresh → GREEN
Time 1:00 - playlistStateUpdated received
Time 1:00 - Health check: Both fresh → GREEN
Time 1:30 - appStateUpdated (foreground) received
Time 1:30 - Health check: Both fresh → GREEN
```

### Example 2: Playlist Stops (RED after 2 min)
```
Time 0:00 - appStateUpdated (foreground) received
Time 0:00 - playlistStateUpdated received
Time 0:30 - Health check: Both fresh → GREEN
Time 1:00 - appStateUpdated (foreground) received
Time 1:00 - Health check: App fresh, playlist 1 min old → GREEN
Time 1:30 - appStateUpdated (foreground) received
Time 1:30 - Health check: App fresh, playlist 1.5 min old → GREEN
Time 2:00 - appStateUpdated (foreground) received
Time 2:00 - Health check: App fresh, playlist 2 min old → GREEN
Time 2:30 - appStateUpdated (foreground) received
Time 2:30 - Health check: App fresh, playlist 2.5 min old (STALE) → RED
         - Message: "App working but Playlist blocked, restart playlist"
```

### Example 3: App Goes to Background (RED immediately)
```
Time 0:00 - appStateUpdated (foreground) received
Time 0:00 - playlistStateUpdated received
Time 0:30 - Health check: Both fresh, foreground → GREEN
Time 1:00 - appStateUpdated (background) received  ← User switched apps
Time 1:00 - playlistStateUpdated received
Time 1:00 - Health check: Both fresh, background → RED
         - Message: "App in background but playlist working"
```

### Example 4: Device Goes Offline (GRAY after 10 min)
```
Time 0:00 - appStateUpdated (foreground) received
Time 0:00 - playlistStateUpdated received
Time 2:30 - Health check: Playlist stale → RED
Time 5:30 - Health check: Both stale → RED
Time 10:30 - Health check: Last seen 10.5 min ago → GRAY
          - Message: "Device offline - no updates for 10+ minutes"
```

## Important Notes

1. **Health checks run every 30 seconds** - Status changes may take up to 30 seconds to reflect

2. **Playlist timeout is shorter (2 min)** - Playlist issues are detected faster than app issues

3. **deviceHealthUpdated is a heartbeat** - It updates `lastSeen` but doesn't override timer-based health calculation

4. **Timer-based health takes precedence** - Even if TV sends "healthy" status, web app will show RED if timers indicate issues

5. **Background state is always RED** - Any background state is considered problematic, regardless of playlist status

