import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  standalone: false,
})
export class ScheduleComponent implements OnInit, OnDestroy {
  schedules: any[] = [];
  loading: boolean = false;
  error: string = '';

  private subscriptions: Subscription[] = [];
  private mismatchTimeouts: { [deviceId: string]: any } = {};
  private sameIndexTimeouts: { [deviceId: string]: any } = {};
  private lastIndices: { [deviceId: string]: number } = {};

  // Track a 30s inactivity timer per device
  private inactivityTimers: { [deviceId: string]: any } = {};

  deviceStates: { [deviceId: string]: string } = {};
  VariableTitleVd: string = 'Your Text Here';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private socketService: SocketService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadSchedules();

    this.socketService.onConnect().subscribe(() => {
      console.log('Socket is connected, setting up subscriptions');
      this.subscribeToDeviceUpdates();
      this.StateApp();
      // If needed: this.TVStateWeb();
      this.oneRefresh()
    });
  }

  oneRefresh():void{
    this.socketService.listen<any>('returnStateWeb').subscribe((data: any) => {
      console.log('Received ReturnStateWeb event:', data);
      // Clear old inactivity timer
      if (this.inactivityTimers[data.deviceId]) {
        clearTimeout(this.inactivityTimers[data.deviceId]);
      }

      // Update the appState
      this.schedules = this.schedules.map((schedule) => {
        if (schedule.deviceId.deviceId === data.deviceId) {
          return {
            ...schedule,
            // If data.state === 'foreground', it turns green;
            // If data.state === 'background', stays red.
            appState: data.lastAppState,
          };
        }
        return schedule;
      });
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

  private loadSchedules(): void {
    this.loading = true;
    this.subscriptions.push(
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
              endTime: this.calculateEndTime(schedule.startTime, schedule.playTime),

              // 1) Make default dot color red by setting appState to 'background'
              appState: 'background',
            }));

          // ---------------------------
          // NEW LINES ADDED: Emit device IDs
          const devices = this.schedules
            .map((s) => s.deviceId?.deviceId)
            .filter((id) => !!id);
          this.socketService.emit('checkStates', { devices });
          // ---------------------------

          this.loading = false;
        },
        error: (error) => {
          this.error = error.error?.message || 'Error loading schedules';
          this.loading = false;
        },
      })
    );
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

  selectedDeviceId: string | null = null;

  openModalGods(deviceId: string): void {
    this.selectedDeviceId = deviceId;
    const schedule = this.schedules.find((s) => s.deviceId.deviceId === deviceId);
    this.VariableTitleVd = schedule?.instantData?.titleVideo || 'No title available for this device';
    this.cdr.detectChanges();
  }

  subscribeToDeviceUpdates(): void {
    if (!this.socketService.isConnected()) {
      console.error('Socket is not connected');
      return;
    }

    // Listen to currentAdWeb for index/error updates
    this.socketService.listen<any>('currentAdWeb').subscribe((data: any) => {
      this.schedules = this.schedules.map((schedule) => {
        if (schedule.deviceId.deviceId === data.deviceId) {
          const adsLength = schedule.advertisementIds.length;

          // Clear mismatch timer
          if (this.mismatchTimeouts[data.deviceId]) {
            clearTimeout(this.mismatchTimeouts[data.deviceId]);
            delete this.mismatchTimeouts[data.deviceId];
          }

          // Check for mismatched index
          if (data.index + 1 === adsLength) {
            return {
              ...schedule,
              instantData: {
                titleVideo: data.title || 'No title available for this device',
                index: data.index + 1,
                error: false,
              },
            };
          } else {
            // 2-minute mismatch check
            this.mismatchTimeouts[data.deviceId] = setTimeout(() => {
              this.schedules = this.schedules.map((s) => {
                if (s.deviceId.deviceId === data.deviceId) {
                  return {
                    ...s,
                    instantData: {
                      ...s.instantData,
                      error: true,
                    },
                  };
                }
                return s;
              });
              this.cdr.detectChanges();
            }, 120000); // or 30000 for 30s
          }

          // Check for repeated index
          if (this.lastIndices[data.deviceId] === data.index) {
            if (!this.sameIndexTimeouts[data.deviceId]) {
              this.sameIndexTimeouts[data.deviceId] = setTimeout(() => {
                this.schedules = this.schedules.map((s) => {
                  if (s.deviceId.deviceId === data.deviceId) {
                    return {
                      ...s,
                      instantData: {
                        ...s.instantData,
                        error: true,
                      },
                    };
                  }
                  return s;
                });
                this.cdr.detectChanges();
              }, 120000);
            }
          } else {
            if (this.sameIndexTimeouts[data.deviceId]) {
              clearTimeout(this.sameIndexTimeouts[data.deviceId]);
              delete this.sameIndexTimeouts[data.deviceId];
            }
          }

          this.lastIndices[data.deviceId] = data.index;

          // Update schedule
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

      this.cdr.detectChanges();
    });
  }

  // Listen to AppStateWeb: changes default dot from red => green if foreground
  StateApp(): void {
    this.socketService.listen<any>('AppStateWeb').subscribe((data: any) => {
      console.log(`Received AppStateWeb for device ${data.deviceId}:`, data);

      // Clear old inactivity timer
      if (this.inactivityTimers[data.deviceId]) {
        clearTimeout(this.inactivityTimers[data.deviceId]);
      }

      // Update the appState
      this.schedules = this.schedules.map((schedule) => {
        if (schedule.deviceId.deviceId === data.deviceId) {
          return {
            ...schedule,
            // If data.state === 'foreground', it turns green;
            // If data.state === 'background', stays red.
            appState: data.state,
          };
        }
        return schedule;
      });

      // 30s timer: if no new message, set to 'inactive' (also red)
      this.inactivityTimers[data.deviceId] = setTimeout(() => {
        this.schedules = this.schedules.map((schedule) => {
          if (schedule.deviceId.deviceId === data.deviceId) {
            return {
              ...schedule,
              appState: 'inactive',
            };
          }
          return schedule;
        });
        this.cdr.detectChanges();
      }, 300000);

      this.cdr.detectChanges();
    });
  }

  TVStateWeb(): void {
    this.socketService.listen<any>('TVStateWeb').subscribe((data: any) => {
      console.log(`Received TVStateWeb for device ${data.deviceId}:`, data);
      // Do something if needed
    });
  }
}
