import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { DeviceStateService, DeviceState } from '../../services/device-state.service';
import { interval, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  standalone: false,
})
export class ScheduleComponent implements OnInit, OnDestroy {
  schedules: any[] = [];
  paginatedSchedules: any[] = [];
  loading: boolean = false;
  error: string = '';
  pageIndex = 0;
  pageSize: number = 25;
  totalPages = 0;

  private subscriptions: Subscription[] = [];
  deviceLogs: { [deviceId: string]: string } = {};
  deviceStates: Map<string, DeviceState> = new Map();
  VariableTitleVd: string = 'Your Text Here';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private socketService: SocketService,
    private deviceStateService: DeviceStateService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.loadSchedules();
    this.updatePagination();

    // Subscribe to device state changes from service
    const statesSub = this.deviceStateService.getDeviceStates().subscribe(states => {
      this.deviceStates = states;
      this.updateSchedulesWithDeviceStates();
      this.cdr.detectChanges();
    });
    this.subscriptions.push(statesSub);

    // Subscribe to socket events immediately if connected, or wait for connection
    if (this.socketService.isConnected()) {
      console.log('Socket already connected, setting up subscriptions');
      this.subscribeToSocketEvents();
    } else {
      this.socketService.onConnect().subscribe(() => {
        console.log('Socket is connected, setting up subscriptions');
        this.subscribeToSocketEvents();
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }


  // Subscribe to socket events and forward to DeviceStateService
  private subscribeToSocketEvents(): void {
    if (!this.socketService.isConnected()) {
      console.error('Socket is not connected');
      return;
    }

    // Listen for appStateChanged events (NEW - primary)
    const appStateSub = this.socketService.listen<any>('appStateChanged').subscribe((data: any) => {
      console.log(`✅ Received appStateChanged for device ${data.deviceId}:`, data);
      
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
    this.subscriptions.push(appStateSub);

    // Listen for playerStateChanged events (NEW - primary)
    const playerStateSub = this.socketService.listen<any>('playerStateChanged').subscribe((data: any) => {
      console.log(`✅ Received playerStateChanged for device ${data.deviceId}:`, data);
      
      // Extract current ad info from playerStateChanged event
      const currentAd = data.currentAd || {};
      const adTitle = currentAd.name || 'No title available';
      const adIndex = currentAd.index !== undefined ? currentAd.index : -1;

      this.deviceStateService.updatePlaylistState(data.deviceId, {
        title: adTitle,
        index: adIndex
      });

      // Update schedule with current ad info AND health status
      this.schedules = this.schedules.map((schedule) => {
        if (schedule.deviceId.deviceId === data.deviceId) {
          const deviceHealth = this.deviceStateService.getDeviceHealth(data.deviceId);
          return {
            ...schedule,
            instantData: {
              ...schedule.instantData,
              titleVideo: adTitle,
              index: adIndex >= 0 ? adIndex + 1 : 0,
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
    this.subscriptions.push(playerStateSub);

    // // FALLBACK: Listen for legacy AppStateWeb events (for backward compatibility)
    // const appStateWebSub = this.socketService.listen<any>('AppStateWeb').subscribe((data: any) => {
    //   console.log(`⚠️ Received legacy AppStateWeb for device ${data.deviceId}:`, data);
      
    //   this.deviceStateService.updateAppState(data.deviceId, data.state);

    //   // Update schedules array to trigger UI refresh
    //   this.schedules = this.schedules.map((schedule) => {
    //     if (schedule.deviceId.deviceId === data.deviceId) {
    //       const deviceHealth = this.deviceStateService.getDeviceHealth(data.deviceId);
    //       return {
    //         ...schedule,
    //         instantData: {
    //           ...schedule.instantData,
    //           appState: data.state,
    //           status: deviceHealth.status,
    //           color: deviceHealth.color,
    //           message: deviceHealth.message,
    //         },
    //       };
    //     }
    //     return schedule;
    //   });

    //   this.updatePagination();
    //   this.cdr.detectChanges();
    // });
    // this.subscriptions.push(appStateWebSub);

    // // FALLBACK: Listen for legacy currentAdWeb events (for backward compatibility)
    // const currentAdWebSub = this.socketService.listen<any>('currentAdWeb').subscribe((data: any) => {
    //   console.log(`⚠️ Received legacy currentAdWeb for device ${data.deviceId}:`, data);

    //   this.deviceStateService.updatePlaylistState(data.deviceId, {
    //     title: data.title || 'No title available',
    //     index: data.index
    //   });

    //   // Update schedule with current ad info AND health status
    //   this.schedules = this.schedules.map((schedule) => {
    //     if (schedule.deviceId.deviceId === data.deviceId) {
    //       const deviceHealth = this.deviceStateService.getDeviceHealth(data.deviceId);
    //       return {
    //         ...schedule,
    //         instantData: {
    //           ...schedule.instantData,
    //           titleVideo: data.title || 'No title available for this device',
    //           index: data.index + 1,
    //           status: deviceHealth.status,
    //           color: deviceHealth.color,
    //           message: deviceHealth.message,
    //           error: false,
    //         },
    //       };
    //     }
    //     return schedule;
    //   });

    //   this.updatePagination();
    //   this.cdr.detectChanges();
    // });
    // this.subscriptions.push(currentAdWebSub);

    // NEW: Listen for playlistStateUpdated events
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
    this.subscriptions.push(playlistStateUpdatedSub);

    // NEW: Listen for appStateUpdated events
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
    this.subscriptions.push(appStateUpdatedSub);

    // NEW: Listen for deviceHealthUpdated events
    const deviceHealthUpdatedSub = this.socketService.listen<any>('deviceHealthUpdated').subscribe((data: any) => {
      console.log(`✅ Received deviceHealthUpdated for device ${data.deviceId}:`, data);

      // Update device health using the service method
      this.deviceStateService.updateDeviceHealth(data.deviceId, {
        status: data.status,
        color: data.color,
        message: data.message,
        lastSeen: data.lastSeen
      });

      // Update schedules array to trigger UI refresh
      this.schedules = this.schedules.map((schedule) => {
        if (schedule.deviceId.deviceId === data.deviceId) {
          const deviceHealth = this.deviceStateService.getDeviceHealth(data.deviceId);
          return {
            ...schedule,
            instantData: {
              ...schedule.instantData,
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
    this.subscriptions.push(deviceHealthUpdatedSub);
  }
  // Update schedules with device states from service
  private updateSchedulesWithDeviceStates(): void {
    this.schedules.forEach(schedule => {
      const deviceId = schedule.deviceId?.deviceId;
      if (!deviceId) return;

      const deviceState = this.deviceStates.get(deviceId);
      if (deviceState) {
        // Update log message based on device health
        this.logState(deviceId, deviceState.health.message);
      }
    });
  }


  loadSchedules(): void {
    this.loading = true;
    this.adminService.getAllSchedule().subscribe({
      next: (response: any) => {
        console.log(response);
        this.schedules = response.data
          .filter((schedule: any) => schedule.deviceId && !schedule.deviceId.isDeleted)
          .map((schedule: any) => ({
            ...schedule,
            advertisementIds: schedule.advertisementIds.filter(
              (ad: { isDeleted: boolean }) => !ad.isDeleted
            ),
            videoLoaded: false // Initialize videoLoaded property
          }));

        const devices = this.schedules
          .map((s) => s.deviceId?.deviceId)
          .filter((id) => !!id);
        this.socketService.emit('checkStates', { devices });

        this.loading = false;
        this.updatePagination();
      },
      error: (error) => {
        this.error = error.error?.message || 'Error loading schedules';
        this.loading = false;
      },
    })
  }

  SecondLoad() {
    this.loading = true;
    this.adminService.getAllSchedule().subscribe({
      next: (response: any) => {
        console.log(response);
        this.schedules = response.data
          .filter((schedule: any) => schedule.deviceId && !schedule.deviceId.isDeleted)
          .map((schedule: any) => {
            return {
              ...schedule,
              advertisementIds: schedule.advertisementIds.filter(
                (ad: { isDeleted: boolean }) => !ad.isDeleted
              ),
              endTime: this.calculateEndTime(schedule.startTime, schedule.playTime),
            };
          });

        const devices = this.schedules
          .map((s) => s.deviceId?.deviceId)
          .filter((id) => !!id);
        this.socketService.emit('checkStates', { devices });

        this.loading = false;
        this.updatePagination();
      },
      error: (error) => {
        this.error = error.error?.message || 'Error loading schedules';
        this.loading = false;
      },
    })
  }
  calculateEndTime(startTime: string, playTime: number): Date {
    return new Date(new Date(startTime).getTime() + playTime * 1000);
  }

  createSchedule(): void {
    this.router.navigate(['/admin/schedule/create']);
  }

  editSchedule(schedule: any): void {
    this.router.navigate(['/admin/schedule/edit', schedule._id]);
  }

  viewSchedule(scheduleId: string): void {
    this.router.navigate(['/admin/schedule/view/'], { queryParams: { scheduleId } });
  }

  deleteSchedule(scheduleId: string): void {
    this.adminService.deleteScheduleById(scheduleId).subscribe({
      next: () => {
        // Reload schedules after deletion
        this.loadSchedules();
      },
      error: (error) => {
        console.error('Error deleting schedule:', error);
      },
    });
  }

  selectedDeviceId!: string;

  openModalGods(deviceId: string): void {
    this.selectedDeviceId = deviceId;
    const schedule = this.schedules.find((s) => s.deviceId.deviceId === deviceId);
    this.VariableTitleVd = schedule?.instantData?.titleVideo || 'No title available for this device';
    this.cdr.detectChanges();
  }

  private logState(deviceId: string, message: string): void {
    // Only log if the message has changed to reduce console spam
    if (this.deviceLogs[deviceId] !== message) {
      console.log(`Device ${deviceId}: ${message}`);
      this.deviceLogs[deviceId] = message;
      this.cdr.detectChanges(); // Ensure Angular detects the change
    }
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.schedules.length / this.pageSize);
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedSchedules = this.schedules.slice(start, end);
  }

  nextPage(): void {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.updatePagination();
    }
  }
  // Get app state color for a device
  public getAppStateColor(deviceId: string): string {
    const deviceState = this.deviceStates.get(deviceId);
    return deviceState?.health.color || 'dot-orange';
  }

  // Get playlist color for a device (same as health color)
  public getPlaylistColor(deviceId: string): string {
    const deviceState = this.deviceStates.get(deviceId);
    return deviceState?.health.color || 'dot-orange';
  }

onVideoLoaded(schedule: any): void {
  schedule.videoLoaded = true;
}
}
