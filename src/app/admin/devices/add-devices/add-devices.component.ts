import { Component } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-devices',
  standalone: false,
  
  templateUrl: './add-devices.component.html',
  styleUrl: './add-devices.component.css'
})
export class AddDevicesComponent {
  deviceObject = {
    name: '',
    description: '',
    orientation: '',
  };

  orientations = ['portrait', 'landscape']; // Options for the orientation dropdown
  isSubmitting = false; // To handle loading state
  successMessage = ''; // To display success messages
  errorMessage = ''; // To display error messages

  constructor(private adminService: AdminService, private router:Router) {}

  addDevice() {
    this.isSubmitting = true;
    this.successMessage = ''; // Clear previous success message
    this.errorMessage = ''; // Clear previous error message

    this.adminService.addDevices(this.deviceObject).subscribe(
      (response) => {
        console.log('Device added:', response);
        this.successMessage = 'Device added successfully!';
        this.isSubmitting = false;

        // Reset the form
        this.deviceObject = {
          name: '',
          description: '',
          orientation: '',
        };
      },
      (error) => {
        console.error('Error adding device:', error);
        this.errorMessage =
          error.error?.message || 'Failed to add device. Please try again.';
        this.isSubmitting = false;
      }
    );
  }
  navigateToList() {
    // Navigate back to the list of advertisements
    this.router.navigate(['/admin/Devices']);
  }
}
