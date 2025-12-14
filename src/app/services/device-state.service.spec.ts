import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { DeviceStateService } from './device-state.service';

describe('DeviceStateService - Timer and Color Logic', () => {
  let service: DeviceStateService;
  let originalSetInterval: any;
  let originalClearInterval: any;
  let intervalCallbacks: Map<number, Function>;
  let intervalId = 0;

  beforeEach(() => {
    // Mock setInterval and clearInterval
    intervalCallbacks = new Map();
    intervalId = 0;

    originalSetInterval = window.setInterval;
    originalClearInterval = window.clearInterval;

    (window as any).setInterval = jasmine.createSpy('setInterval').and.callFake((callback: Function, delay: number) => {
      const id = ++intervalId;
      intervalCallbacks.set(id, callback);
      return id as any;
    });

    (window as any).clearInterval = jasmine.createSpy('clearInterval').and.callFake((id: number) => {
      intervalCallbacks.delete(id);
    });

    TestBed.configureTestingModule({
      providers: [DeviceStateService]
    });
    service = TestBed.inject(DeviceStateService);

    // Clear localStorage
    localStorage.clear();
  });

  afterEach(() => {
    // Restore original functions
    window.setInterval = originalSetInterval;
    window.clearInterval = originalClearInterval;
    service.ngOnDestroy();
  });

  describe('Initial State', () => {
    it('should create the service', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with unknown status (ORANGE)', () => {
      const health = service.getDeviceHealth('TEST_DEVICE');
      expect(health.status).toBe('unknown');
      expect(health.color).toBe('dot-orange');
      expect(health.message).toBe('Waiting for device updates...');
    });
  });

  describe('Color Logic - GREEN (Healthy)', () => {
    it('should show GREEN when app is foreground and playlist is fresh', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_1';
      
      // Simulate app state update (foreground)
      service.updateAppState(deviceId, 'foreground');
      tick(100);
      
      // Simulate playlist update
      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });
      tick(100);
      
      const health = service.getDeviceHealth(deviceId);
      expect(health.status).toBe('healthy');
      expect(health.color).toBe('dot-green');
      expect(health.message).toBe('All Good!');
    }));

    it('should maintain GREEN when both states are updated within timeout', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_2';
      
      service.updateAppState(deviceId, 'foreground');
      tick(60000); // 1 minute
      
      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });
      tick(60000); // 1 minute
      
      service.updateAppState(deviceId, 'foreground');
      tick(100);
      
      const health = service.getDeviceHealth(deviceId);
      expect(health.status).toBe('healthy');
      expect(health.color).toBe('dot-green');
    }));
  });

  describe('Color Logic - RED (Degraded/Broken)', () => {
    it('should show RED when app is background but playlist is working', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_3';
      
      service.updateAppState(deviceId, 'background');
      tick(100);
      
      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });
      tick(100);
      
      const health = service.getDeviceHealth(deviceId);
      expect(health.status).toBe('degraded');
      expect(health.color).toBe('dot-red');
      expect(health.message).toBe('App in background but playlist working');
    }));

    it('should show RED when app is background and playlist is stale', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_4';
      
      service.updateAppState(deviceId, 'background');
      tick(100);
      
      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });
      
      // Wait for playlist to become stale (2 minutes)
      tick(2 * 60 * 1000 + 1000);
      
      // Trigger health check
      const callbacks = Array.from(intervalCallbacks.values());
      callbacks.forEach(cb => cb());
      tick(100);
      
      const health = service.getDeviceHealth(deviceId);
      expect(health.status).toBe('broken');
      expect(health.color).toBe('dot-red');
      expect(health.message).toBe('App in background, playlist stopped');
    }));

    it('should show RED when app is foreground but playlist is stale', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_5';
      
      service.updateAppState(deviceId, 'foreground');
      tick(100);
      
      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });
      
      // Wait for playlist to become stale (2 minutes)
      tick(2 * 60 * 1000 + 1000);
      
      // Trigger health check
      const callbacks = Array.from(intervalCallbacks.values());
      callbacks.forEach(cb => cb());
      tick(100);

      const health = service.getDeviceHealth(deviceId);
      expect(health.status).toBe('broken');
      expect(health.color).toBe('dot-red');
      expect(health.message).toBe('App working but Playlist blocked, restart playlist');
    }));

    it('should show RED when both app and playlist are stale', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_6';

      service.updateAppState(deviceId, 'foreground');
      tick(100);

      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });

      // Wait for both to become stale (5 minutes for app, 2 minutes for playlist)
      tick(5 * 60 * 1000 + 1000);

      // Trigger health check
      const callbacks = Array.from(intervalCallbacks.values());
      callbacks.forEach(cb => cb());
      tick(100);

      const health = service.getDeviceHealth(deviceId);
      expect(health.status).toBe('broken');
      expect(health.color).toBe('dot-red');
      expect(health.message).toBe('ERROR: App down, check the TV');
    }));
  });

  describe('Color Logic - GRAY (Offline)', () => {
    it('should show GRAY when no updates received for 10+ minutes', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_7';

      service.updateAppState(deviceId, 'foreground');
      tick(100);

      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });

      // Wait for device to go offline (10 minutes)
      tick(10 * 60 * 1000 + 1000);

      // Trigger health check
      const callbacks = Array.from(intervalCallbacks.values());
      callbacks.forEach(cb => cb());
      tick(100);

      const health = service.getDeviceHealth(deviceId);
      expect(health.status).toBe('offline');
      expect(health.color).toBe('dot-gray');
      expect(health.message).toBe('Device offline - no updates for 10+ minutes');
    }));

    it('should recover from GRAY to GREEN when updates resume', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_8';

      // Initial updates
      service.updateAppState(deviceId, 'foreground');
      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });
      tick(100);

      // Go offline
      tick(10 * 60 * 1000 + 1000);
      const callbacks = Array.from(intervalCallbacks.values());
      callbacks.forEach(cb => cb());
      tick(100);

      let health = service.getDeviceHealth(deviceId);
      expect(health.status).toBe('offline');
      expect(health.color).toBe('dot-gray');

      // Device comes back online
      service.updateAppState(deviceId, 'foreground');
      tick(100);
      service.updatePlaylistState(deviceId, { title: 'Video2.mp4', index: 1 });
      tick(100);

      health = service.getDeviceHealth(deviceId);
      expect(health.status).toBe('healthy');
      expect(health.color).toBe('dot-green');
      expect(health.message).toBe('All Good!');
    }));
  });

  describe('Timer Logic - Playlist Timeout (2 minutes)', () => {
    it('should mark playlist as stale after 2 minutes without updates', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_9';

      service.updateAppState(deviceId, 'foreground');
      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });
      tick(100);

      // Initially healthy
      let health = service.getDeviceHealth(deviceId);
      expect(health.color).toBe('dot-green');

      // Wait 1 minute 59 seconds - still healthy
      tick(1 * 60 * 1000 + 59 * 1000);
      const callbacks = Array.from(intervalCallbacks.values());
      callbacks.forEach(cb => cb());
      tick(100);

      health = service.getDeviceHealth(deviceId);
      expect(health.color).toBe('dot-green');

      // Wait 2 seconds more (total 2 min 1 sec) - now stale
      tick(2000);
      callbacks.forEach(cb => cb());
      tick(100);

      health = service.getDeviceHealth(deviceId);
      expect(health.color).toBe('dot-red');
      expect(health.message).toContain('Playlist');
    }));
  });

  describe('Timer Logic - App State Timeout (5 minutes)', () => {
    it('should remain healthy if playlist is still updating even when app state is stale', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_10';

      service.updateAppState(deviceId, 'foreground');
      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });
      tick(100);

      // Wait for app state to go stale (5 minutes + 1 second)
      tick(5 * 60 * 1000 + 1000);

      // Keep playlist fresh by updating it
      service.updatePlaylistState(deviceId, { title: 'Video2.mp4', index: 1 });
      tick(100);

      // Trigger health check
      const callbacks = Array.from(intervalCallbacks.values());
      callbacks.forEach(cb => cb());
      tick(100);

      const health = service.getDeviceHealth(deviceId);
      // App state is stale but playlist is fresh - device is still considered healthy
      // because playlist updates indicate the app is still running
      expect(health.status).toBe('healthy');
      expect(health.color).toBe('dot-green');
    }));
  });

  describe('deviceHealthUpdated Event Handling', () => {
    it('should update lastSeen but recalculate health based on timers', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_11';

      // Set up initial state - app in background
      service.updateAppState(deviceId, 'background');
      tick(100);
      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });
      tick(100);

      // Device sends healthUpdate claiming it's "healthy"
      service.updateDeviceHealth(deviceId, {
        status: 'healthy',
        color: 'dot-green',
        message: 'All Good!',
        lastSeen: new Date().toISOString()
      });
      tick(100);

      // But web app should recalculate and show RED (app in background)
      const health = service.getDeviceHealth(deviceId);
      expect(health.color).toBe('dot-red');
      expect(health.message).toBe('App in background but playlist working');
    }));

    it('should treat deviceHealthUpdated as heartbeat to prevent offline status', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_12';

      // Initial state
      service.updateAppState(deviceId, 'foreground');
      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });
      tick(100);

      // Wait 9 minutes (almost offline)
      tick(9 * 60 * 1000);

      // Device sends health update (heartbeat)
      service.updateDeviceHealth(deviceId, {
        status: 'healthy',
        color: 'dot-green',
        message: 'All Good!',
        lastSeen: new Date().toISOString()
      });
      tick(100);

      // Should NOT be offline because lastSeen was updated
      const health = service.getDeviceHealth(deviceId);
      expect(health.status).not.toBe('offline');
      expect(health.color).not.toBe('dot-gray');
    }));
  });

  describe('Edge Cases', () => {
    it('should handle rapid state changes correctly', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_13';

      // Rapid foreground/background switches
      service.updateAppState(deviceId, 'foreground');
      tick(100);
      service.updateAppState(deviceId, 'background');
      tick(100);
      service.updateAppState(deviceId, 'foreground');
      tick(100);

      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });
      tick(100);

      const health = service.getDeviceHealth(deviceId);
      expect(health.status).toBe('healthy');
      expect(health.color).toBe('dot-green');
    }));

    it('should handle multiple devices independently', fakeAsync(() => {
      const device1 = 'DEVICE_1';
      const device2 = 'DEVICE_2';

      // Device 1: Healthy
      service.updateAppState(device1, 'foreground');
      service.updatePlaylistState(device1, { title: 'Video1.mp4', index: 0 });
      tick(100);

      // Device 2: Background
      service.updateAppState(device2, 'background');
      service.updatePlaylistState(device2, { title: 'Video2.mp4', index: 0 });
      tick(100);

      const health1 = service.getDeviceHealth(device1);
      const health2 = service.getDeviceHealth(device2);

      expect(health1.color).toBe('dot-green');
      expect(health2.color).toBe('dot-red');
    }));

    it('should handle device with no playlist updates', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_14';

      // Only app state, no playlist
      service.updateAppState(deviceId, 'foreground');
      tick(100);

      const health = service.getDeviceHealth(deviceId);
      // Initially shows healthy because playlist.isStale starts as false
      // This is expected behavior - device is considered healthy until proven otherwise
      expect(health.status).toBe('healthy');
      expect(health.color).toBe('dot-green');
    }));

    it('should handle device with no app state updates', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_15';

      // Only playlist, no app state
      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });
      tick(100);

      const health = service.getDeviceHealth(deviceId);
      // Should show unknown or waiting state
      expect(health.status).not.toBe('healthy');
    }));

    it('should handle transition from RED to GREEN when app returns to foreground', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_16';

      // Start in background (RED)
      service.updateAppState(deviceId, 'background');
      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });
      tick(100);

      let health = service.getDeviceHealth(deviceId);
      expect(health.color).toBe('dot-red');

      // Return to foreground (GREEN)
      service.updateAppState(deviceId, 'foreground');
      tick(100);

      health = service.getDeviceHealth(deviceId);
      expect(health.color).toBe('dot-green');
    }));

    it('should handle playlist recovery after being stale', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_17';

      service.updateAppState(deviceId, 'foreground');
      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });
      tick(100);

      // Playlist goes stale
      tick(2 * 60 * 1000 + 1000);
      const callbacks = Array.from(intervalCallbacks.values());
      callbacks.forEach(cb => cb());
      tick(100);

      let health = service.getDeviceHealth(deviceId);
      expect(health.color).toBe('dot-red');

      // Playlist recovers
      service.updatePlaylistState(deviceId, { title: 'Video2.mp4', index: 1 });
      tick(100);

      health = service.getDeviceHealth(deviceId);
      expect(health.color).toBe('dot-green');
    }));
  });

  describe('Periodic Health Checks', () => {
    it('should run health checks every 30 seconds', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_18';

      service.updateAppState(deviceId, 'foreground');
      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });
      tick(100);

      // Verify interval was set up
      expect(intervalCallbacks.size).toBeGreaterThan(0);

      // Simulate 30 seconds passing and health check running
      tick(30 * 1000);
      const callbacks = Array.from(intervalCallbacks.values());
      callbacks.forEach(cb => cb());
      tick(100);

      // Should still be healthy
      const health = service.getDeviceHealth(deviceId);
      expect(health.color).toBe('dot-green');
    }));
  });

  describe('State Persistence', () => {
    it('should emit state changes when health status changes', fakeAsync(() => {
      const deviceId = 'TEST_DEVICE_19';
      let emittedStates: any[] = [];

      // Subscribe to the public observable
      (service as any).deviceStates$.subscribe((states: any) => {
        emittedStates.push(states);
      });

      service.updateAppState(deviceId, 'foreground');
      tick(100);

      service.updatePlaylistState(deviceId, { title: 'Video1.mp4', index: 0 });
      tick(100);

      expect(emittedStates.length).toBeGreaterThan(0);
    }));
  });
});


