import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  standalone: false
})
export class ScheduleComponent implements OnInit, OnDestroy {
  schedules: any[] = [];
  loading: boolean = false;
  error: string = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSchedules();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadSchedules(): void {
    this.loading = true;
    this.subscriptions.push(
      this.adminService.getAllSchedule().subscribe({
        next: (response: any) => {
          console.log(response)

          this.schedules = response.data
            .filter((schedule: any) => !schedule.deviceId.isDeleted)
            .map((schedule: any) => ({
              ...schedule,
              endTime: this.calculateEndTime(schedule.startTime, schedule.playTime),
            }));
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
    const queryParams = {
      scheduleId: scheduleId,
      
    };
    this.router.navigate(['/admin/schedule/view/'], { queryParams });
  }
}
