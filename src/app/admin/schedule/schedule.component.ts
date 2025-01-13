import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { interval, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
const INACTIVITY_TIMEOUT_APP = 300000; // 5 minutes
const INACTIVITY_TIMEOUT_SCREEN = 600000; // 10 minutes
const INACTIVITY_TIMEOUT_AD = 120000; // 2 minutes
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
  pageSize = 5;
  totalPages = 0;

  private subscriptions: Subscription[] = [];
  private mismatchTimeouts: { [deviceId: string]: any } = {};
  private sameIndexTimeouts: { [deviceId: string]: any } = {};
  private lastIndices: { [deviceId: string]: number } = {};
  deviceLogs: { [deviceId: string]: string } = {};

  // Track a 30s inactivity timer per device
  private inactivityTimers: { [deviceId: string]: any } = {};

  deviceStates: { [deviceId: string]: string } = {};
  VariableTitleVd: string = 'Your Text Here';

  // Add state control variables
  private blockAppState: { [key: string]: boolean } = {};
  private blockAds: { [key: string]: boolean } = {};
  private intervalId: any;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private socketService: SocketService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.loadSchedules()
    this.updatePagination();
   // Initialize device states from localStorage
    this.schedules.forEach((schedule) => {
      const deviceState = this.getLocalStorageState(schedule.deviceId.deviceId);
  
      // Initialize AppState
      if (deviceState.isAppStateTimePassed && deviceState.NoResponse) {
        schedule.appState = 'inactive'; // RED
      } else {
        schedule.appState = deviceState.LastAppState;
      }
  
      // Initialize TVState
      if (deviceState.NoResponse) {
        schedule.TVstate = 'off'; // RED
      } else {
        schedule.TVstate = deviceState.LastTVstate; // 'on' or 'off'
      }
    });
  
    this.socketService.onConnect().subscribe(() => {
      console.log('Socket is connected, setting up subscriptions');
      this.subscribeToDeviceUpdates();
      this.StateApp();
      this.oneRefresh();
      this.TVStateWeb();
      this.SystemStateWeb();
    });
  }


  oneRefresh(): void {
    this.socketService.listen<any>('returnStateWeb').subscribe((data: any) => {
      console.log('Received ReturnStateWeb event:', data);

      // Clear old inactivity timer
      if (this.inactivityTimers[data.deviceId]) {
        clearTimeout(this.inactivityTimers[data.deviceId]);
      }

      // Update the appState in the component (but do not update localStorage here)
      this.schedules = this.schedules.map((schedule) => {
        if (schedule.deviceId.deviceId === data.deviceId) {
          const deviceState = this.getLocalStorageState(data.deviceId);
          return {
            ...schedule,
            appState: deviceState.NoResponse ? 'inactive' : data.lastAppState,
            TVstate: deviceState.NoResponse ? 'inactive' : data.lastTvState,
            SystemState: data.lastSystemState
          };
        }
        return schedule;
      });
      this.cdr.detectChanges();

      // Set a new inactivity timer
      this.ngZone.runOutsideAngular(() => {
        this.inactivityTimers[data.deviceId] = setTimeout(() => {
          console.log(`No update received for device ${data.deviceId} in 5 seconds, setting states to inactive`);
          this.ngZone.run(() => {
            this.schedules = this.schedules.map((schedule) => {
              if (schedule.deviceId.deviceId === data.deviceId) {
                this.updateLocalStorageState(
                  data.deviceId,
                  'inactive',
                  'inactive',
                  true, // isAppStateTimePassed
                  true, // NoResponse
                  0 // counterAppState
                );
                return {
                  ...schedule,
                  appState: 'inactive',
                  TVstate: 'inactive'
                };
              }
              return schedule;
            });
            this.updatePagination();
            this.cdr.detectChanges();
          });
        }, INACTIVITY_TIMEOUT_APP);
      });
      this.updatePagination();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    Object.values(this.mismatchTimeouts).forEach((timeout) => clearTimeout(timeout));
    Object.values(this.sameIndexTimeouts).forEach((timeout) => clearTimeout(timeout));

    // Clear inactivity timers
    Object.values(this.inactivityTimers).forEach((timer) => clearTimeout(timer));
  }

  SystemStateWeb(): void {
    this.socketService.listen<any>('SystemStateWeb').subscribe((data: any) => {
      console.log(`Received SystemStateWeb for device ${data.deviceId}:`, data);

      if (data.state === 'shutting_down') {
        // Block App and Ads updates
        this.blockAppState[data.deviceId] = true;
        this.blockAds[data.deviceId] = true;

        // Update states to red
        this.schedules = this.schedules.map((schedule) => {
          if (schedule.deviceId.deviceId === data.deviceId) {
            return {
              ...schedule,
              SystemState: 'inactive',
              appState: 'inactive',
              TVstate: 'off',
              instantData: {
                titleVideo: 'No video available',
                index: null,
                error: true
              }
            };
          }
          const deviceState = this.getLocalStorageState(data.deviceId);
          
          this.updateLocalStorageState(
                 data.deviceId,
                 data.state,
                 deviceState.LastTVstate,
                 false,
                 false,
                 deviceState.counterAppState,
                 "shutting_down"
               );
          return schedule;
        });
        this.cdr.detectChanges();
      } else {
        // System is green, check TV state
        const schedule = this.schedules.find(s => s.deviceId.deviceId === data.deviceId);
        if (schedule && schedule.TVstate === 'off') {
          this.blockAppState[data.deviceId] = true;
          this.blockAds[data.deviceId] = true;
        } else {
          // System is green and TV is on, allow app updates
          this.blockAppState[data.deviceId] = false;
        }
      }

      // Existing code...

      if (this.inactivityTimers[data.deviceId]) {
        clearTimeout(this.inactivityTimers[data.deviceId]);
      }
     
      this.schedules = this.schedules.map((schedule) => {
        if (schedule.deviceId.deviceId === data.deviceId) {
          return {
            ...schedule,
            SystemState: data.state,
          };
        }
        return schedule;
      });
      this.cdr.detectChanges();

      this.updateStates(data.deviceId);
      this.updatePagination();
      this.cdr.detectChanges();
    });
  }

  TVStateWeb(): void {
    this.socketService.listen<any>('TVStateWeb').subscribe((data: any) => {
      if (data.state === 'off') {
        // Block App and Ads updates when TV is off
        this.blockAppState[data.deviceId] = true;
        this.blockAds[data.deviceId] = true;

        // Update states
        this.schedules = this.schedules.map((schedule) => {
          if (schedule.deviceId.deviceId === data.deviceId) {
            return {
              ...schedule,
              TVstate: 'off',
              appState: 'inactive',
              instantData: {
                titleVideo: 'No video available',
                index: null,
                error: true
              }
            };
          }
          return schedule;
        });
      } else {
        // TV is on, check system state
        const schedule = this.schedules.find(s => s.deviceId.deviceId === data.deviceId);
        if (schedule && schedule.SystemState !== 'shutting_down') {
          this.blockAppState[data.deviceId] = false;
        }
      }

      // Existing code...
      const deviceState = this.getLocalStorageState(data.deviceId);
      this.startTVStateInactivityTimer(data.deviceId);
      this.updateLocalStorageState(
        data.deviceId,
        deviceState.LastAppState,
        data.state,
        deviceState.isAppStateTimePassed,
        false,
        deviceState.counterAppState
      );
      this.updateTVState(data.deviceId);
      this.cdr.detectChanges();
    });
  }

  StateApp(): void {
    this.socketService.listen<any>('AppStateWeb').subscribe((data: any) => {
      // Skip if blocked by system or TV state
      if (this.blockAppState[data.deviceId]) {
        return;
      }

      if (data.state !== 'foreground') {
        this.blockAds[data.deviceId] = true;
        // Update states
        this.schedules = this.schedules.map((schedule) => {
          if (schedule.deviceId.deviceId === data.deviceId) {
            return {
              ...schedule,
              appState: data.state,
              instantData: {
                titleVideo: 'No video available',
                index: null,
                error: true
              }
            };
          }
          this.cdr.detectChanges();

          return schedule;
          
        });
      } else {
        // App is in foreground, enable ad updates
        this.blockAds[data.deviceId] = false;
      }

      // Existing code...
      const deviceState = this.getLocalStorageState(data.deviceId);
      this.startAppStateInactivityTimer(data.deviceId);
      this.updateLocalStorageState(
        data.deviceId,
        data.state,
        deviceState.LastTVstate,
        false,
        false,
        deviceState.counterAppState
      );
      this.updateAppState(data.deviceId);
      this.cdr.detectChanges();
    });
  }

  subscribeToDeviceUpdates(): void {
    if (!this.socketService.isConnected()) {
      console.error('Socket is not connected');
      return;
    }

    // Listen to currentAdWeb for index/error updates
    this.socketService.listen<any>('currentAdWeb').subscribe((data: any) => {
      // Skip if blocked by system, TV, or app state
      if (this.blockAds[data.deviceId]) {
        return;
      }

      // Existing code...
      this.schedules = this.schedules.map((schedule) => {
        if (schedule.deviceId.deviceId === data.deviceId) {
          return {
            ...schedule,
            instantData: {
              titleVideo: data.title || 'No title available for this device',
              index: data.index + 1,
              error: false,
            },
          };
        }
        return schedule;
      });
      this.updatePagination();
      this.cdr.detectChanges();
    });
  }

   loadSchedules(): void {
    this.loading = true;
      this.adminService.getAllSchedule().subscribe({
        next: (response: any) => {
          console.log(response);
          this.schedules = response.data
            .filter((schedule: any) => schedule.deviceId && !schedule.deviceId.isDeleted)
            .map((schedule: any) => {
              const deviceState = this.getLocalStorageState(schedule.deviceId.deviceId);
              return {
                ...schedule,
                advertisementIds: schedule.advertisementIds.filter(
                  (ad: { isDeleted: boolean }) => !ad.isDeleted
                ),
                endTime: this.calculateEndTime(schedule.startTime, schedule.playTime),
                appState: deviceState.LastAppState,
                TVstate: deviceState.LastTVstate,
                SystemState: deviceState.SystemState,

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

  SecondLoad(){
    this.loading = true;
      this.adminService.getAllSchedule().subscribe({
        next: (response: any) => {
          console.log(response);
          this.schedules = response.data
            .filter((schedule: any) => schedule.deviceId && !schedule.deviceId.isDeleted)
            .map((schedule: any) => {
              const deviceState = this.getLocalStorageState(schedule.deviceId.deviceId);
              return {
                ...schedule,
                advertisementIds: schedule.advertisementIds.filter(
                  (ad: { isDeleted: boolean }) => !ad.isDeleted
                ),
                endTime: this.calculateEndTime(schedule.startTime, schedule.playTime),
                appState: deviceState.LastAppState,
                TVstate: deviceState.LastTVstate,
                SystemState: deviceState.SystemState,

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

  private updateStates(deviceId: string): void {
    const schedule = this.schedules.find(s => s.deviceId.deviceId === deviceId);
    if (!schedule) return;

    // System State Logic
    if (schedule.SystemState === 'shutting_down' || schedule.SystemState === 'inactive') {
        this.logState(deviceId, 'All system is shut down');
        return;
    }

    // Screen State Logic
    if (schedule.TVstate !== 'on') {
        this.logState(deviceId, 'TV is in sleepmode or screen is turned off, please turn on the screen');
        return;
    }

    // App State Logic
    if (schedule.appState !== 'foreground') {
        this.logState(deviceId, 'App is not running or is running in background, check your App');
        return;
    }

    // Current Ad State Logic
    if (!schedule.instantData.titleVideo || schedule.instantData.error) {
        this.logState(deviceId, 'Issue with playlist, probably blocked, try relaunching the playlist by editing the schedule');
        return;
    }

    // All Good
    this.logState(deviceId, 'All Good');
    this.updateLocalStorageState(deviceId, schedule.appState, schedule.TVstate, false, false, 0);
  }

  private logState(deviceId: string, message: string): void {
    console.log(`Device ${deviceId}: ${message}`);
    this.deviceLogs[deviceId] = message;
    this.cdr.detectChanges(); // Ensure Angular detects the change
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
  private updateLocalStorageState(
    deviceId?: string,
    LastAppState?: string,
    LastTVstate?: string,
    isAppStateTimePassed?: boolean,
    NoResponse?: boolean,
    counterAppState?: number,
    SystemState?:string

  ): void {
    const state = {
      LastAppState,
      LastTVstate,
      isAppStateTimePassed,
      NoResponse,
      counterAppState,
      SystemState

    };
    localStorage.setItem(`deviceState_${deviceId}`, JSON.stringify(state));
  }
  
  private getLocalStorageState(deviceId: string): {
    LastAppState: string;
    LastTVstate: string;
    isAppStateTimePassed: boolean;
    NoResponse: boolean;
    counterAppState: number;
    SystemState?:string
  } {
    this.cdr.detectChanges();

    const state = localStorage.getItem(`deviceState_${deviceId}`);
    return state
      ? JSON.parse(state)
      : {
          LastAppState: 'background',
          LastTVstate: 'off', // Default to 'off'
          isAppStateTimePassed: false,
          NoResponse: false,
          counterAppState: 0,
          SystemState:'shutting_down'
        };
  }

  private updateAppState(deviceId: string): void {
    const schedule = this.schedules.find(s => s.deviceId.deviceId === deviceId);
    if (!schedule) return;
  
    const deviceState = this.getLocalStorageState(deviceId);
  
    // Check if the app state should be RED
    if (deviceState.isAppStateTimePassed && deviceState.NoResponse) {
      schedule.appState = 'inactive'; // RED
    } else {
      schedule.appState = deviceState.LastAppState; // Use LastAppState
    }
  
    // Update the UI
    this.cdr.detectChanges();
  }
  private startAppStateInactivityTimer(deviceId: string): void {
    const deviceState = this.getLocalStorageState(deviceId);
  
    // Clear existing timer
    if (this.inactivityTimers[deviceId]) {
      clearTimeout(this.inactivityTimers[deviceId]);
    }
  
    // Start a new timer
    this.inactivityTimers[deviceId] = setTimeout(() => {
      this.updateLocalStorageState(
        deviceId,
        deviceState.LastAppState,
        deviceState.LastTVstate,
        true, // isAppStateTimePassed
        true, // NoResponse
        deviceState.counterAppState
      );
  
      // Update the app state to RED
      this.updateAppState(deviceId);
      this.cdr.detectChanges();
    }, INACTIVITY_TIMEOUT_APP); // 5 minutes (300,000 milliseconds)
  }

  private startTVStateInactivityTimer(deviceId: string): void {
    const deviceState = this.getLocalStorageState(deviceId);
  
    // Clear existing timer
    if (this.inactivityTimers[deviceId]) {
      clearTimeout(this.inactivityTimers[deviceId]);
    }
  
    // Start a new timer
    this.inactivityTimers[deviceId] = setTimeout(() => {
      this.updateLocalStorageState(
        deviceId,
        deviceState.LastAppState,
        'off', // Set TVState to 'off' due to inactivity
        deviceState.isAppStateTimePassed,
        true, // NoResponse for TVState
        deviceState.counterAppState
      );
  
      // Update the TV state to 'off'
      this.updateTVState(deviceId);
      this.cdr.detectChanges();
    }, INACTIVITY_TIMEOUT_SCREEN); // 10 minutes
  }
  
  private updateTVState(deviceId: string): void {
    this.cdr.detectChanges();

    const schedule = this.schedules.find((s) => s.deviceId.deviceId === deviceId);
    if (!schedule) return;
  
    const deviceState = this.getLocalStorageState(deviceId);
  
    // Check if the TV state should be 'off' due to inactivity
    if (deviceState.NoResponse) {
      schedule.TVstate = 'off'; // RED
    } else {
      schedule.TVstate = deviceState.LastTVstate; // Use LastTVstate
    }
  
    // Update the UI
    this.cdr.detectChanges();
  }
  
  public getDeviceStatus(schedule: any): string {
    if (!schedule) return 'No log available';

    // Check states in hierarchical order
    if (schedule.SystemState === 'shutting_down' || schedule.SystemState === 'inactive') {
        return 'All system is shut down';
    }
    
    if (schedule.TVstate !== 'on') {
        return 'TV is in sleepmode or screen is turned off, please turn on the screen';
    }
    
    if (schedule.appState !== 'foreground') {
        return 'App is not running or is running in background, check your App';
    }
    
    // If system, screen, and app are green but currentAd is red
    if (schedule.SystemState !== 'shutting_down' && 
        schedule.TVstate === 'on' && 
        schedule.appState === 'foreground' && 
        (schedule.instantData?.error || !schedule.instantData?.titleVideo)) {
        return 'Issue with playlist, probably blocked, try relaunching the playlist by editing the schedule';
    }
    
    // If everything is working correctly
    if (schedule.SystemState !== 'shutting_down' && 
        schedule.TVstate === 'on' && 
        schedule.appState === 'foreground' && 
        schedule.instantData?.titleVideo && 
        !schedule.instantData?.error) {
        return 'All Good';
    }
    this.cdr.detectChanges();

    return 'System status unknown';
  }
}
