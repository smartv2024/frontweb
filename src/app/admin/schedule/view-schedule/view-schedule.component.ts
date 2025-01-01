import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css'],
  standalone: false
})
export class ViewScheduleComponent implements OnInit, OnDestroy {
  schedule: any = null;
  loading: boolean = false;
  error: string = '';
  success: string = '';
  schedulednewId:any=''
  devices: any[] = [];
  advertisements: any[] = [];
  updateForm: FormGroup;
  isEditing: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      deviceId: ['', Validators.required],
      advertisementIds: [[], Validators.required],
      startTime: ['', Validators.required],
      playTime: ['', [Validators.required, Validators.min(1)]],
      playMode: ['sequence', Validators.required],
      repeat: [false]
    });
  }

  ngOnInit(): void {
    this.jibId();
    this.loadScheduleDetails();
    this.loadDevices();
    this.loadAdvertisements();
  }


  jibId(){
    this.subscriptions.push(
      this.route.queryParams.subscribe(params => {
        this.schedulednewId = params['scheduleId'];
        console.log("scheduleId",this.schedulednewId)
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadScheduleDetails(): void {
    const scheduleId = this.schedulednewId;
    if (!scheduleId) {
      this.error = 'Schedule ID not found';
      return;
    }

    this.loading = true;
    this.subscriptions.push(
      this.adminService.getScheduleById(scheduleId).subscribe({
        next: (response: any) => {
          this.schedule = response.data;
          this.populateForm();
          this.loading = false;
        },
        error: (error) => {
          this.error = error.error?.message || 'Error loading schedule details';
          this.loading = false;
        }
      })
    );
  }
deviceId:any=""
  private loadDevices(): void {
    this.subscriptions.push(
      this.adminService.getDevices().subscribe({
        next: (response: any) => {
          this.devices = response.data;
          this.deviceId=response.data._id
        },
        error: (error) => {
          console.error('Error loading devices:', error);
        }
      })
    );
  }

  private loadAdvertisements(): void {
    this.subscriptions.push(
      this.adminService.getAds().subscribe({
        next: (response: any) => {
          this.advertisements = response.data;
        },
        error: (error) => {
          console.error('Error loading advertisements:', error);
        }
      })
    );
  }

  private populateForm(): void {
    if (this.schedule) {
      console.log("deviceID", this.schedule.deviceId)
      this.updateForm.patchValue({
        deviceId: this.schedule.deviceId,
        advertisementIds: this.schedule.advertisementIds?.map((ad: any) => ad._id) || [],
        startTime: new Date(this.schedule.startTime).toISOString().slice(0, 16),
        playTime: this.schedule.playTime,
        playMode: this.schedule.playMode || 'sequence',
        repeat: this.schedule.repeat || false
      });
    }
  }

  isAdvertisementSelected(adId: string): boolean {
    const selectedAds = this.updateForm.get('advertisementIds')?.value || [];
    return selectedAds.includes(adId);
  }

  toggleAdvertisement(adId: string): void {
    const currentAds = this.updateForm.get('advertisementIds')?.value || [];
    let newAds: string[];
    
    if (currentAds.includes(adId)) {
      // Remove the ad if it's already selected
      newAds = currentAds.filter((id: string) => id !== adId);
    } else {
      // Add the ad if it's not selected
      newAds = [...currentAds, adId];
    }
    
    this.updateForm.patchValue({ advertisementIds: newAds });
    this.updateForm.get('advertisementIds')?.markAsTouched();
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.populateForm();
    }
  }

  updateSchedule(): void {

    

    const scheduleId = this.schedulednewId;
   

    this.loading = true;
    const formData = this.updateForm.value;
    console.log(formData)
    // Format the data according to server expectations
    const updateData = {
      "deviceId":formData.deviceId._id,
      "advertisementIds": formData.advertisementIds,
      "startTime": new Date(formData.startTime).toISOString(),
      "playTime": parseInt(formData.playTime),
      "playMode": formData.playMode,
      "repeat": formData.repeat
    };

    this.subscriptions.push(  
      this.adminService.updateSchedule(scheduleId, updateData).subscribe({
        next: (response: any) => {
          this.success = 'Schedule updated successfully';
          this.schedule = response.data;
          this.loading = false;
          this.isEditing = false;
          this.loadScheduleDetails(); // Reload to get populated data
        },
        error: (error) => {
          this.error = error.error?.message || 'Error updating schedule';
          this.loading = false;
        }
      })
    );
  }

  goBack(): void {
    this.router.navigate(['/admin/Schedules']);
  }
}
