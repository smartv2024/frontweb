import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone:false
})
export class ProfileComponent implements OnInit {
  userProfile = {
    name: '',
    email: '',
    phoneNumber: '',
    role: ''
  };

  isEditing = false;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
   

    this.adminService.getCurrentUserProfile().subscribe(
      (response: any) => {
        if (response.success && response.data) {
          const userData = response.data;
          this.userProfile = {
            name: userData.username,
            email: userData.email,
            phoneNumber: userData.phoneNumber || '',
            role: userData.role
          };
        }
      },
      (error: any) => {
        this.errorMessage = 'Failed to load profile data';
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    );
  }

  resetPassword() {
    if (confirm('Are you sure you want to reset your password? A new password will be sent to your email.')) {
      this.adminService.resetOwnAccount(this.userProfile.email).subscribe(
        (response) => {
          this.successMessage = 'Password reset successful. Please check your email for the new password.';
          setTimeout(() => this.successMessage = '', 5000);
        },
        (error) => {
          this.errorMessage = error.error?.message || 'Failed to reset password';
          setTimeout(() => this.errorMessage = '', 5000);
        }
      );
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // Reset form to original values when canceling edit
      this.loadUserProfile();
    }
  }

  updateProfile() {
    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const updateData = {
      username: this.userProfile.name,
      email: this.userProfile.email,
      phoneNumber: this.userProfile.phoneNumber
    };

    this.adminService.updateProfile(updateData).subscribe(
      (response: any) => {
        if (response.success) {
          this.successMessage = response.message || 'Profile updated successfully!';
          this.isSubmitting = false;
          this.isEditing = false;
          // Reload the profile to get the latest data
          this.loadUserProfile();
        } else {
          this.errorMessage = response.message || 'Update failed';
          this.isSubmitting = false;
        }
      },
      (error: { error: { message: string; }; }) => {
        this.errorMessage = error.error?.message || 'Failed to update profile';
        this.isSubmitting = false;
      }
    );
  }

  goBack() {
    this.router.navigate(['/admin/Schedules']);
  }
}
