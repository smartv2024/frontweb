import { Injectable, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DeviceState {
  deviceId: string;
  
  // App State
  appState: {
    value: 'foreground' | 'background' | null;
    lastUpdate: Date | null;
    isStale: boolean; // > 5 min
  };
  
  // Playlist State
  playlistState: {
    currentAd: { title: string; index: number } | null;
    lastUpdate: Date | null;
    isStale: boolean; // > 2 min
  };
  
  // Overall Health
  health: {
    status: 'healthy' | 'degraded' | 'broken' | 'offline' | 'unknown';
    color: 'dot-green' | 'dot-orange' | 'dot-red' | 'dot-gray';
    message: string;
    lastSeen: Date | null; // Last time ANY event received
  };
}

const APP_STATE_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const PLAYLIST_TIMEOUT = 2 * 60 * 1000; // 2 minutes
const OFFLINE_TIMEOUT = 10 * 60 * 1000; // 10 minutes
const HEALTH_CHECK_INTERVAL = 30 * 1000; // 30 seconds

@Injectable({
  providedIn: 'root'
})
export class DeviceStateService implements OnDestroy {
  private deviceStates = new Map<string, DeviceState>();
  private deviceStates$ = new BehaviorSubject<Map<string, DeviceState>>(new Map());
  private healthCheckInterval: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.loadFromLocalStorage();
      this.startHealthCheckInterval();
    }
  }

  ngOnDestroy(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
  }

  // Get observable of all device states
  getDeviceStates(): Observable<Map<string, DeviceState>> {
    return this.deviceStates$.asObservable();
  }

  // Get specific device state
  getDeviceState(deviceId: string): DeviceState | undefined {
    return this.deviceStates.get(deviceId);
  }

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

  // Update app state when AppStateWeb event received
  updateAppState(deviceId: string, appStateValue: string): void {
    const state = this.getOrCreateDeviceState(deviceId);
    const now = new Date();

    // Log recovery if device was offline/broken
    if (state.health.status === 'offline' || state.health.status === 'broken') {
      console.log(`✅ Device ${deviceId} recovered from ${state.health.status} state`);
    }

    state.appState = {
      value: appStateValue as 'foreground' | 'background',
      lastUpdate: now,
      isStale: false
    };

    state.health.lastSeen = now;

    this.checkDeviceHealth(deviceId);
    this.emitStateChange();
    this.syncToLocalStorage();
  }

  // Update playlist state when currentAdWeb event received
  updatePlaylistState(deviceId: string, adData: { title: string; index: number }): void {
    const state = this.getOrCreateDeviceState(deviceId);
    const now = new Date();

    // Log recovery if device was offline/broken
    if (state.health.status === 'offline' || state.health.status === 'broken') {
      console.log(`✅ Device ${deviceId} recovered from ${state.health.status} state`);
    }

    state.playlistState = {
      currentAd: { title: adData.title, index: adData.index },
      lastUpdate: now,
      isStale: false
    };

    state.health.lastSeen = now;

    this.checkDeviceHealth(deviceId);
    this.emitStateChange();
    this.syncToLocalStorage();
  }

  // Update device health when deviceHealthUpdated event received
  // This is a heartbeat from the TV - we update lastSeen but recalculate health based on our timers
  updateDeviceHealth(deviceId: string, healthData: { status: string; color: string; message: string; lastSeen: string }): void {
    const state = this.getOrCreateDeviceState(deviceId);
    const now = new Date();

    // Update lastSeen timestamp - this is the heartbeat
    state.health.lastSeen = new Date(healthData.lastSeen);

    // Log recovery if device was offline
    if (state.health.status === 'offline') {
      console.log(`✅ Device ${deviceId} recovered from offline state`);
    }

    // Recalculate health based on our own timer logic
    // This ensures consistency with our timeout values
    const lastSeenAge = now.getTime() - state.health.lastSeen.getTime();
    const health = this.calculateHealth(state, lastSeenAge);
    state.health = health;

    this.emitStateChange();
    this.syncToLocalStorage();
  }

  // Get or create device state
  private getOrCreateDeviceState(deviceId: string): DeviceState {
    if (!this.deviceStates.has(deviceId)) {
      this.deviceStates.set(deviceId, {
        deviceId,
        appState: {
          value: null,
          lastUpdate: null,
          isStale: false
        },
        playlistState: {
          currentAd: null,
          lastUpdate: null,
          isStale: false
        },
        health: {
          status: 'unknown',
          color: 'dot-orange',
          message: 'Waiting for device updates...',
          lastSeen: null
        }
      });
    }
    return this.deviceStates.get(deviceId)!;
  }

  // Start periodic health checks
  private startHealthCheckInterval(): void {
    this.healthCheckInterval = setInterval(() => {
      this.checkAllDevicesHealth();
    }, HEALTH_CHECK_INTERVAL);
  }

  // Check all devices health
  private checkAllDevicesHealth(): void {
    const now = Date.now();
    let hasChanges = false;

    this.deviceStates.forEach((state, deviceId) => {
      const appStateAge = state.appState.lastUpdate
        ? now - state.appState.lastUpdate.getTime()
        : Infinity;

      const playlistAge = state.playlistState.lastUpdate
        ? now - state.playlistState.lastUpdate.getTime()
        : Infinity;

      const lastSeenAge = state.health.lastSeen
        ? now - state.health.lastSeen.getTime()
        : Infinity;

      // Update stale flags
      const wasAppStale = state.appState.isStale;
      const wasPlaylistStale = state.playlistState.isStale;

      state.appState.isStale = appStateAge > APP_STATE_TIMEOUT;
      state.playlistState.isStale = playlistAge > PLAYLIST_TIMEOUT;

      // If staleness changed, recalculate health
      if (wasAppStale !== state.appState.isStale || wasPlaylistStale !== state.playlistState.isStale) {
        const previousStatus = state.health.status;
        const health = this.calculateHealth(state, lastSeenAge);

        // Only update if status actually changed
        if (health.status !== previousStatus) {
          state.health = health;
          hasChanges = true;
          console.log(`🔄 Device ${deviceId} status changed: ${previousStatus} → ${health.status}`);
        }
      }
    });

    if (hasChanges) {
      this.emitStateChange();
      this.syncToLocalStorage();
    }
  }

  // Check specific device health immediately
  private checkDeviceHealth(deviceId: string): void {
    const state = this.deviceStates.get(deviceId);
    if (!state) return;

    const now = Date.now();
    const lastSeenAge = state.health.lastSeen
      ? now - state.health.lastSeen.getTime()
      : Infinity;

    const health = this.calculateHealth(state, lastSeenAge);
    state.health = health;
  }

  // Calculate device health based on state
  private calculateHealth(state: DeviceState, lastSeenAge: number): DeviceState['health'] {
    const { appState, playlistState } = state;

    // Device completely offline (no events for 10 min)
    if (lastSeenAge > OFFLINE_TIMEOUT) {
      return {
        status: 'offline',
        color: 'dot-gray',
        message: 'Device offline - no updates for 10+ minutes',
        lastSeen: state.health.lastSeen
      };
    }

    // App crashed (no app state for 5 min AND no playlist for 2 min)
    if (appState.isStale && playlistState.isStale) {
      return {
        status: 'broken',
        color: 'dot-red',
        message: 'ERROR: App down, check the TV',
        lastSeen: state.health.lastSeen
      };
    }

    // GREEN: App in foreground AND playlist receiving updates
    if (appState.value === 'foreground' && !playlistState.isStale) {
      return {
        status: 'healthy',
        color: 'dot-green',
        message: 'All Good!',
        lastSeen: state.health.lastSeen
      };
    }

    // RED: App in background AND playlist receiving updates
    if (appState.value === 'background' && !playlistState.isStale) {
      return {
        status: 'degraded',
        color: 'dot-red',
        message: 'App in background but playlist working',
        lastSeen: state.health.lastSeen
      };
    }

    // RED: App in background AND playlist NOT receiving updates
    if (appState.value === 'background' && playlistState.isStale) {
      return {
        status: 'broken',
        color: 'dot-red',
        message: 'App in background, playlist stopped',
        lastSeen: state.health.lastSeen
      };
    }

    // RED: App in foreground but playlist stuck
    if (appState.value === 'foreground' && playlistState.isStale) {
      return {
        status: 'broken',
        color: 'dot-red',
        message: 'App working but Playlist blocked, restart playlist',
        lastSeen: state.health.lastSeen
      };
    }

    // Unknown/initial state
    return {
      status: 'unknown',
      color: 'dot-orange',
      message: 'Waiting for device updates...',
      lastSeen: state.health.lastSeen
    };
  }

  // Emit state change to subscribers
  private emitStateChange(): void {
    this.deviceStates$.next(new Map(this.deviceStates));
  }

  // Sync to localStorage
  private syncToLocalStorage(): void {
    if (!this.isBrowser) return;

    const snapshot = Array.from(this.deviceStates.entries()).map(([id, state]) => ({
      deviceId: id,
      appState: {
        value: state.appState.value,
        lastUpdate: state.appState.lastUpdate?.toISOString() || null,
        isStale: state.appState.isStale
      },
      playlistState: {
        currentAd: state.playlistState.currentAd,
        lastUpdate: state.playlistState.lastUpdate?.toISOString() || null,
        isStale: state.playlistState.isStale
      },
      health: {
        status: state.health.status,
        color: state.health.color,
        message: state.health.message,
        lastSeen: state.health.lastSeen?.toISOString() || null
      }
    }));

    localStorage.setItem('deviceStates', JSON.stringify(snapshot));
  }

  // Load from localStorage on init
  private loadFromLocalStorage(): void {
    if (!this.isBrowser) return;

    const stored = localStorage.getItem('deviceStates');
    if (!stored) return;

    try {
      const snapshot = JSON.parse(stored);
      const now = Date.now();

      snapshot.forEach((deviceData: any) => {
        // Parse dates
        const lastSeen = deviceData.health.lastSeen
          ? new Date(deviceData.health.lastSeen)
          : null;

        const appLastUpdate = deviceData.appState.lastUpdate
          ? new Date(deviceData.appState.lastUpdate)
          : null;

        const playlistLastUpdate = deviceData.playlistState.lastUpdate
          ? new Date(deviceData.playlistState.lastUpdate)
          : null;

        // Calculate how stale the data is
        const staleness = lastSeen ? now - lastSeen.getTime() : Infinity;

        // If data is older than 1 hour, mark as offline
        let health = deviceData.health;
        if (staleness > 60 * 60 * 1000) {
          health = {
            status: 'offline',
            color: 'dot-gray',
            message: 'Device offline - last seen over 1 hour ago',
            lastSeen: lastSeen
          };
        }

        // Restore state
        this.deviceStates.set(deviceData.deviceId, {
          deviceId: deviceData.deviceId,
          appState: {
            value: deviceData.appState.value,
            lastUpdate: appLastUpdate,
            isStale: deviceData.appState.isStale
          },
          playlistState: {
            currentAd: deviceData.playlistState.currentAd,
            lastUpdate: playlistLastUpdate,
            isStale: deviceData.playlistState.isStale
          },
          health: {
            status: health.status,
            color: health.color,
            message: health.message,
            lastSeen: lastSeen
          }
        });
      });

      console.log(`📦 Loaded ${this.deviceStates.size} device states from localStorage`);
      this.emitStateChange();
    } catch (error) {
      console.error('Failed to load device states from localStorage:', error);
      if (this.isBrowser) {
        localStorage.removeItem('deviceStates');
      }
    }
  }
}

