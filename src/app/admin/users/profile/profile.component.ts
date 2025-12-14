import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { AuthService } from '../../../AuthService/auth.service';

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
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  isChangingPassword: boolean = false;
  showPasswordForm: boolean = false;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
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
    if (!this.validatePasswordForm()) {
      return;
    }

    this.isChangingPassword = true;
    this.errorMessage = '';
    this.successMessage = '';

    const userId = this.authService.userId!;
    
    this.authService.changePassword({
      userId: userId,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: (response: any) => {
        this.successMessage = 'Password changed successfully';
        this.isChangingPassword = false;
        this.showPasswordForm = false;
        // Reset form
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (error: { error: { message: string; }; }) => {
        this.isChangingPassword = false;
        this.errorMessage = error.error?.message || 'Failed to change password';
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    });
  }

  validatePasswordForm(): boolean {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'All password fields are required';
      return false;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New password and confirmation do not match';
      return false;
    }

    if (this.newPassword.length < 8) {
      this.errorMessage = 'New password must be at least 8 characters long';
      return false;
    }

    return true;
  }

  togglePasswordForm() {
    this.showPasswordForm = !this.showPasswordForm;
    if (!this.showPasswordForm) {
      // Reset form when closing
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.errorMessage = '';
      this.successMessage = '';
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
    const userId=this.authService.userId
    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const updateData = {
      userId,
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
