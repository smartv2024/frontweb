import { Component } from '@angular/core';
import { AuthService } from '../AuthService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = ''; // To store and display error messages
  isLoading = false;

  constructor(private authService: AuthService, private route:Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login({ username: this.username, password: this.password }).subscribe(
      (res: any) => {
        this.isLoading = false;
        console.log('Login successful:', res);
        // Save the token to sessionStorage
        if (res?.token) {
          sessionStorage.setItem('authToken', res.token);
          alert('Login successful!');
          this.route.navigate(['/admin']); // Navigate to the home page
          // Add logic to navigate to a protected page, if required
        } else {
          this.errorMessage = 'No token received. Please try again.';
        }
      },
      (err: any) => {
        this.isLoading = false;
        console.error('Login error:', err);
        // Extract and display error message
        this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
      }
    );
  }
}
