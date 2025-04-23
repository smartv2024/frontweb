import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css'],
  standalone:false
})
export class ChangepwdComponent implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Initialize any necessary data or perform actions when the component is initialized
  }

  validateForm(): boolean {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'All fields are required';
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

  onSubmit() {
  
    const userId = this.authService.userId;

    if (!userId) {
      this.errorMessage = 'User ID not found. Please try logging in again.';
      return;
    }
console.log(userId)
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.changePassword({
      userId: userId,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'Password changed successfully';
        this.isLoading = false;
        
        // Clear form
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        
        // Redirect to admin dashboard after successful password change
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to change password. Please try again.';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
