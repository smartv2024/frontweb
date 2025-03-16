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
  private deviceUpdateSubscription!: Subscription;

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


    this.socketService.onConnect().subscribe(() => {
      console.log('Socket is connected, setting up subscriptions');
      this.subscribeToDeviceUpdates();
      this.StateApp();    

    });
  }




  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    Object.values(this.mismatchTimeouts).forEach((timeout) => clearTimeout(timeout));
    Object.values(this.sameIndexTimeouts).forEach((timeout) => clearTimeout(timeout));

  }


appState=''


StateApp(): void {
  if (!this.socketService.isConnected()) {
    console.error('Socket is not connected');
    return;
  }

  let noResponseTimer: ReturnType<typeof setTimeout>;
  let counterInterval: ReturnType<typeof setInterval>;

  const startTimer = () => {
    if (noResponseTimer) clearTimeout(noResponseTimer);
    if (counterInterval) clearInterval(counterInterval);

    noResponseTimer = setTimeout(() => {
      console.error('No response received for 5 minutes (AppStateWeb)');

      const updateState = {
        lastUpdateTime: new Date().toISOString(),
        state: 'red',
        deviceId: this.appState
      };
      localStorage.setItem('appStateUpdateState', JSON.stringify(updateState));

      this.schedules = this.schedules.map((schedule) => {
        if (schedule.deviceId.deviceId === updateState.deviceId) {
          const appStateColor = this.getAppStateColor(schedule.appState, schedule.deviceId.deviceId);
          const playlistColor = this.getPlaylistColor(schedule, schedule.deviceId.deviceId);

          let logMessage: string;
          if (appStateColor === 'dot-red' && schedule.instantData?.titleVideo) {
            logMessage = 'App is in background and playlist is working';
          } else if (appStateColor === 'dot-red' && playlistColor === 'dot-red') {
            logMessage = 'ERROR: App is down, check the TV';
          } else if (appStateColor === 'dot-green' && playlistColor === 'dot-red') {
            logMessage = 'App is working but Playlist is Blocked, restart the playlist';
          } else if (appStateColor === 'dot-green' && playlistColor === 'dot-green') {
            logMessage = 'All Good!';
          } else {
            logMessage = 'No app state update for 5 minutes';
          }

          this.logState(schedule.deviceId.deviceId, logMessage);
        }
        return schedule;
      });

      this.updatePagination();
      this.cdr.detectChanges();

      clearInterval(counterInterval);
    }, INACTIVITY_TIMEOUT_APP);

    let remainingTime = INACTIVITY_TIMEOUT_APP / 1000;
    counterInterval = setInterval(() => {
      console.log(`Time remaining (AppStateWeb): ${remainingTime} seconds`);
      remainingTime--;
      if (remainingTime < 0) clearInterval(counterInterval);
    }, 1000);
  };

  startTimer();

  this.socketService.listen<any>('AppStateWeb').subscribe((data: any) => {
    console.log(`Received AppStateWeb for device ${data.deviceId}:`, data);
    this.appState = data.state;

    const updateState = {
      lastUpdateTime: new Date().toISOString(),
      state: data.state === 'foreground' ? 'green' : 'red',
      deviceId: data.deviceId,
    };
    localStorage.setItem('appStateUpdateState', JSON.stringify(updateState));

    this.schedules = this.schedules.map((schedule) => {
      if (schedule.deviceId.deviceId === data.deviceId) {
        const appStateColor = this.getAppStateColor(schedule.appState, schedule.deviceId.deviceId);
        const playlistColor = this.getPlaylistColor(schedule, schedule.deviceId.deviceId);

        let logMessage: string;
        if (appStateColor === 'dot-red' && schedule.instantData?.titleVideo) {
          logMessage = 'App is in background and playlist is working';
        } else if (appStateColor === 'dot-red' && playlistColor === 'dot-red') {
          logMessage = 'ERROR: App is down, check the TV';
        } else if (appStateColor === 'dot-green' && playlistColor === 'dot-red') {
          logMessage = 'App is working but Playlist is Blocked, restart the playlist';
        } else if (appStateColor === 'dot-green' && playlistColor === 'dot-green') {
          logMessage = 'All Good!';
        } else {
          logMessage = 'App state updated';
        }

        this.logState(data.deviceId, logMessage);
      }
      return schedule;
    });

    this.updatePagination();
    this.cdr.detectChanges();

    startTimer();
  });
}
subscribeToDeviceUpdates(): void {
  if (!this.socketService.isConnected()) {
    console.error('Socket is not connected');
    return;
  }

  let noResponseTimer: ReturnType<typeof setTimeout>;
  let counterInterval: ReturnType<typeof setInterval>;

  const startTimer = () => {
    if (noResponseTimer) clearTimeout(noResponseTimer);
    if (counterInterval) clearInterval(counterInterval);

    noResponseTimer = setTimeout(() => {
      console.error('No response received for 2 minutes');

      const storedState = localStorage.getItem('PlaylistUpdateState');
      let updateState = storedState ? JSON.parse(storedState) : {};
      updateState.lastUpdateTime = new Date().toISOString();
      updateState.state = 'red';
      localStorage.setItem('PlaylistUpdateState', JSON.stringify(updateState));

      this.schedules = this.schedules.map((schedule) => {
        if (schedule.deviceId.deviceId === updateState.deviceId) {
          // Set instantData.index to null after 2 minutes of no updates
          const updatedSchedule = {
            ...schedule,
            instantData: schedule.instantData
              ? { ...schedule.instantData, index: null }
              : null,
          };

          const appStateColor = this.getAppStateColor(schedule.appState, schedule.deviceId.deviceId);
          const playlistColor = this.getPlaylistColor(updatedSchedule, schedule.deviceId.deviceId);

          let logMessage: string;
          if (appStateColor === 'dot-red' && updatedSchedule.instantData?.index === null) {
            logMessage = 'ERROR: App is down, check the TV'; // Triggered after 2 min playlist timeout
          } else if (appStateColor === 'dot-red' && updatedSchedule.instantData?.titleVideo) {
            logMessage = 'App is in background and playlist is working';
          } else if (appStateColor === 'dot-red' && playlistColor === 'dot-red') {
            logMessage = 'ERROR: App is down, check the TV';
          } else if (appStateColor === 'dot-green' && playlistColor === 'dot-red') {
            logMessage = 'App is working but Playlist is Blocked, restart the playlist';
          } else if (appStateColor === 'dot-green' && playlistColor === 'dot-green') {
            logMessage = 'All Good!';
          } else {
            logMessage = 'No playlist update for 2 minutes';
          }

          this.logState(schedule.deviceId.deviceId, logMessage);
          return updatedSchedule;
        }
        return schedule;
      });

      this.updatePagination();
      this.cdr.detectChanges();

      clearInterval(counterInterval);
    }, INACTIVITY_TIMEOUT_AD);

    let remainingTime = INACTIVITY_TIMEOUT_AD / 1000;
    counterInterval = setInterval(() => {
      console.log(`Time remaining: ${remainingTime} seconds`);
      remainingTime--;
      if (remainingTime < 0) clearInterval(counterInterval);
    }, 1000);
  };

  const checkLastUpdateTime = () => {
    const storedState = localStorage.getItem('PlaylistUpdateState');
    if (storedState) {
      const updateState = JSON.parse(storedState);
      const lastUpdateTime = new Date(updateState.lastUpdateTime).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - lastUpdateTime;

      if (timeDifference > INACTIVITY_TIMEOUT_AD) {
        updateState.state = 'red';
      } else {
        updateState.state = 'orange';
      }
      localStorage.setItem('PlaylistUpdateState', JSON.stringify(updateState));
    }
  };

  checkLastUpdateTime();
  startTimer();

  this.socketService.listen<any>('currentAdWeb').subscribe((data: any) => {
    console.log(`Received PLAAAYLISTT for device ${data.deviceId}:`, data);

    this.schedules = this.schedules.map((schedule) => {
      if (schedule.deviceId.deviceId === data.deviceId) {
        const updatedSchedule = {
          ...schedule,
          instantData: {
            titleVideo: data.title || 'No title available for this device',
            index: data.index + 1,
            error: false,
          },
        };

        const appStateColor = this.getAppStateColor(schedule.appState, schedule.deviceId.deviceId);
        const playlistColor = this.getPlaylistColor(updatedSchedule, schedule.deviceId.deviceId);

        let logMessage: string;
        if (appStateColor === 'dot-red' && updatedSchedule.instantData?.index === null) {
          logMessage = 'ERROR: App is down, check the TV';
        } else if (appStateColor === 'dot-red' && updatedSchedule.instantData?.titleVideo) {
          logMessage = 'App is in background and playlist is working';
        } else if (appStateColor === 'dot-red' && playlistColor === 'dot-red') {
          logMessage = 'ERROR: App is down, check the TV';
        } else if (appStateColor === 'dot-green' && playlistColor === 'dot-red') {
          logMessage = 'App is working but Playlist is Blocked, restart the playlist';
        } else if (appStateColor === 'dot-green' && playlistColor === 'dot-green') {
          logMessage = 'All Good!';
        } else {
          logMessage = 'Playlist updated';
        }

        this.logState(data.deviceId, logMessage);
        return updatedSchedule;
      }
      return schedule;
    });

    this.updatePagination();
    this.cdr.detectChanges();

    const updateState = {
      lastUpdateTime: new Date().toISOString(),
      state: 'green',
      deviceId: data.deviceId,
    };
    localStorage.setItem('PlaylistUpdateState', JSON.stringify(updateState));

    startTimer();
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
            return {
              ...schedule,
              advertisementIds: schedule.advertisementIds.filter(
                (ad: { isDeleted: boolean }) => !ad.isDeleted
              ),

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
// Add this method to check the appState and return the appropriate color
// Method to check the app state and return the appropriate color
public getAppStateColor(appState: string, deviceId: string): string {
  // Retrieve the stored state from localStorage
  const storedState = localStorage.getItem('appStateUpdateState');
  
  if (storedState) {
    const updateState = JSON.parse(storedState);
    const storedDeviceId = updateState.deviceId;
    const storedColor = updateState.state; // 'green' or 'red' from localStorage

    // Check if the deviceId matches the one stored in localStorage
    if (deviceId === storedDeviceId) {
      // Return the color based on the stored state
      return storedColor === 'green' ? 'dot-green' : 'dot-red';
    }
  }

  // Default to 'dot-red' if no matching stored state is found
  return 'dot-red';
}

// Method to check the playlist status and return the appropriate color
public getPlaylistColor(schedule: any, deviceId: any): string {
  const appStateColor = this.getAppStateColor(schedule.appState, schedule.deviceId.deviceId);
  
  if (appStateColor === 'dot-red') {
    return 'dot-red';
  }

  const storedState = localStorage.getItem('PlaylistUpdateState');
  if (storedState) {
    const updateState = JSON.parse(storedState);
    const storedDeviceId = updateState.deviceId;
    const storedColor = updateState.state; // 'green', 'red', or 'orange'

    if (schedule.deviceId.deviceId === storedDeviceId) {
      switch (storedColor) {
        case 'green':
          return 'dot-green';
        case 'red':
          return 'dot-red';
        case 'orange':
          return 'dot-orange';
        default:
          return 'dot-orange'; // Fallback for unexpected values
      }
    }
  }

  if (schedule.instantData?.titleVideo && !schedule.instantData?.error) {
    return 'dot-green';
  } else if (!schedule.instantData?.titleVideo ) {
    return 'dot-orange';
  }
  return 'dot-red';
}
}
