import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { SocketService } from '../../../services/socket.service';
import { Subscription } from 'rxjs';

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
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.queryParams.subscribe((params) => {
        this.deviceId = params['deviceId'];
        this.selectedAds = params['ads'] ? params['ads'].split(',') : [];

        if (this.deviceId) {
          this.loadDeviceAndAds();
          this.socketService.joinRoom(this.deviceId);
        }
      })
    );

    this.subscriptions.push(
      this.socketService.getConnectionStatus().subscribe((connected) => {
        if (!connected) {
          this.error = 'Disconnected from server';
        }
      })
    );

    this.socketService.listen<any>('scheduleError').subscribe((error) => {
      this.error = error.message || 'Error creating schedule';
      this.loading = false;
    });
  }

  private loadDeviceAndAds(): void {
    this.loading = true;
    this.adminService.getDevicesById(this.deviceId).subscribe(
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
        this.ads = responses.map((response) => response.data);
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