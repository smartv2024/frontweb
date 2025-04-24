import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:false
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ 
      username: this.username, 
      password: this.password 
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (this.authService.forcePasswordChange) {
          this.router.navigate(['/change-password']);
        } else {
          this.router.navigate(['/admin']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 403) {
          this.errorMessage = 'Your account is inactive. Please contact administrator.';
        } else {
          this.errorMessage = error.error?.message || 'An error occurred during login';
        }
      }
    });
  }
}
