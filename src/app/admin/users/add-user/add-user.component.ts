import { Component } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  userObject = {
    username: '', // Changed from name to username to match backend
    email: '',
    phoneNumber: '',
    role: 'client' // Default role
  };

  roles = ['client', 'admin']; // Available roles
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private adminService: AdminService, private router: Router) {}

  addUser() {
    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Use createClient instead of addUser to match the backend route
    this.adminService.createClient(this.userObject).subscribe(
      (response) => {
        console.log('User created:', response);
        this.successMessage = 'User created successfully! Login credentials have been sent to the user\'s email.';
        this.isSubmitting = false;

        // Reset form
        this.userObject = {
          username: '',
          email: '',
          phoneNumber: '',
          role: 'client'
        };

        // Optional: Navigate to users list after short delay
        setTimeout(() => {
          this.navigateToList();
        }, 2000);
      },
      (error) => {
        console.error('Error creating user:', error);
        this.errorMessage = error.error?.message || 'Failed to create user. Please try again.';
        this.isSubmitting = false;
      }
    );
  }

  navigateToList() {
    this.router.navigate(['/admin/users']);
  }
}
