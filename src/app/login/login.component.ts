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

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          if (this.authService.forcePasswordChange) {
            this.router.navigate(['/changepwd']);
          } else {
            this.router.navigate(['/admin']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Login failed';
        }
      });
  }
}
