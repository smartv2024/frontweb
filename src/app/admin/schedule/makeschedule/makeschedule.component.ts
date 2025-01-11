import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { SocketService } from '../../../services/socket.service';
import { catchError, of, Subscription, timeout } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-makeschedule',
  templateUrl: './makeschedule.component.html',
  styleUrls: ['./makeschedule.component.css'],
  standalone:false
})
export class MakescheduleComponent implements OnInit, OnDestroy {
  deviceId: string = '';
  selectedAds: string[] = [];
  device: any = null;
  ads: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  success: string | null = null;

  startTime: Date = new Date();
  playTime: number = 60;
  repeat: string = 'once';
  playMode: string = 'loop';

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private socketService: SocketService,
    @Inject(PLATFORM_ID) private platformId: Object,

  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      this.route.queryParams.subscribe((params) => {
        this.deviceId = params['deviceId'];
        this.selectedAds = params['ads'] ? params['ads'].split(',') : [];

        if (this.deviceId) {
          this.loadDeviceAndAds();
          this.socketService.joinRoom(this.deviceId);
        }
      })
    
    }
   
      this.socketService.getConnectionStatus().pipe(
        timeout(30000), // 30 seconds timeout
        catchError(error => {
          this.error = 'Request timed out';
          this.loading = false;
          return of(null); // Return an observable to keep the stream alive
        })
      ).subscribe((connected) => {
        if (!connected) {
          this.error = 'Disconnected from server';
        }
      })
    

    this.socketService.listen<any>('scheduleError').subscribe((error) => {
      this.error = error.message || 'Error creating schedule';
      this.loading = false;
    });
  }

  private loadDeviceAndAds(): void {
    this.loading = true;
    this.adminService.getDevicesById(this.deviceId).pipe(
      timeout(30000), // 30 seconds timeout
      catchError(error => {
        this.error = 'Request timed out';
        this.loading = false;
        return of(null); // Return an observable to keep the stream alive
      })
    ).subscribe(
      (device) => {
        this.device = device.data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Error loading device details';
        this.loading = false;
      }
    );

    const adPromises = this.selectedAds.map((adId) => this.adminService.getAdsById(adId).toPromise());
    Promise.all(adPromises)
      .then((responses) => {
        this.ads = responses.map((response) => response.data).filter(ad => !ad.archived);
      })
      .catch(() => {
        this.error = 'Error loading advertisement details';
      });
  }

  createSchedule(): void {
    const scheduleData = {
      advertisementIds: this.selectedAds,
      deviceId: this.deviceId,
      startTime: this.startTime,
      playTime: this.playTime,
      repeat: this.repeat,
      playMode: this.playMode,
    };

    this.socketService.emit('updateSchedule', scheduleData);
    this.adminService.createSchedule(scheduleData).subscribe(
      () => {
        this.success = 'Schedule created successfully';
      },
      (error) => {
        this.error = error.error?.message || 'Error creating schedule';
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.socketService.leaveRoom(this.deviceId);
  }
}