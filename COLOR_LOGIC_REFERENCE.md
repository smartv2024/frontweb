# Device Status Color Logic Reference

## Color Scheme

### 🟢 GREEN (dot-green)
**Status:** `healthy`  
**Condition:** App in foreground AND playlist receiving updates  
**Message:** "All Good!"

```typescript
appState.value === 'foreground' && !playlistState.isStale
```

**What it means:**
- TV app is active and visible on screen
- Playlist is playing and sending regular updates
- Everything is working perfectly

---

### 🔴 RED (dot-red)
**Status:** `degraded` or `broken`  
**Conditions:**

#### Scenario 1: App in background but playlist working
**Message:** "App in background but playlist working"
```typescript
appState.value === 'background' && !playlistState.isStale
```
**What it means:**
- TV app is running in background (user switched to another app)
- Playlist is still sending updates (unusual but possible)
- **Action needed:** Bring app to foreground

#### Scenario 2: App in background and playlist stopped
**Message:** "App in background, playlist stopped"
```typescript
appState.value === 'background' && playlistState.isStale
```
**What it means:**
- TV app is running in background
- Playlist has stopped sending updates
- **Action needed:** Bring app to foreground and restart playlist

#### Scenario 3: App in foreground but playlist stuck
**Message:** "App working but Playlist blocked, restart playlist"
```typescript
appState.value === 'foreground' && playlistState.isStale
```
**What it means:**
- TV app is active on screen
- Playlist has stopped sending updates (stuck/crashed)
- **Action needed:** Restart the playlist

#### Scenario 4: Both app and playlist down
**Message:** "ERROR: App down, check the TV"
```typescript
appState.isStale && playlistState.isStale
```
**What it means:**
- No app state updates for 5+ minutes
- No playlist updates for 2+ minutes
- **Action needed:** Check the TV, app may have crashed

---

### ⚫ GRAY (dot-gray)
**Status:** `offline`  
**Condition:** No events received for 10+ minutes  
**Message:** "Device offline - no updates for 10+ minutes"

```typescript
lastSeenAge > OFFLINE_TIMEOUT (10 minutes)
```

**What it means:**
- TV device is completely offline
- No communication with backend
- **Action needed:** Check TV power, network connection

---

### 🟠 ORANGE (dot-orange)
**Status:** `unknown`  
**Condition:** Initial state, waiting for first events  
**Message:** "Waiting for device updates..."

**What it means:**
- Device just registered or page just loaded
- No events received yet
- Normal during startup

---

## Timeout Values

```typescript
APP_STATE_TIMEOUT = 5 * 60 * 1000;    // 5 minutes
PLAYLIST_TIMEOUT = 2 * 60 * 1000;     // 2 minutes
OFFLINE_TIMEOUT = 10 * 60 * 1000;     // 10 minutes
HEALTH_CHECK_INTERVAL = 30 * 1000;    // 30 seconds
```

---

## Event Flow

```
TV Device → Backend Server → Web App
           (Socket.IO)      (Socket.IO)

Events sent by TV:
- appStateUpdated (foreground/background)
- playlistStateUpdated (title, index)
- deviceHealthUpdated (status, color, message)
```

---

## Quick Troubleshooting Guide

| Color | Status | First Action |
|-------|--------|--------------|
| 🟢 Green | All Good | No action needed |
| 🔴 Red (bg + playlist) | App in background | Bring app to foreground |
| 🔴 Red (fg + no playlist) | Playlist stuck | Restart playlist |
| 🔴 Red (both stale) | App crashed | Check TV, restart app |
| ⚫ Gray | Offline | Check power & network |
| 🟠 Orange | Unknown | Wait for events |

---

## UI Display

The color is shown in two places:
1. **App Status column** - Shows app state with colored dot
2. **Playlist column** - Shows playlist index with colored dot

Both columns use the same color from `deviceState.health.color`.

The **Status Message column** shows the detailed message from `deviceState.health.message`.

