import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:false
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  isMuted: boolean = true;

  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement;
    video.defaultMuted = true;
    video.muted = true;
  
    const playVideo = () => {
      video.play().catch((error: any) => {
        console.log("Video autoplay failed:", error);
      });
    };
  
    // Try autoplay
    playVideo();
  
    // Retry on interaction if autoplay fails
    document.addEventListener('click', playVideo, { once: true });
    document.addEventListener('touchstart', playVideo, { once: true });
  }
  

  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  // Forgot password properties
  showForgotPasswordModal = false;
  resetEmail = '';
  isResetting = false;
  forgotPasswordError = '';
  forgotPasswordSuccess = '';

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
          this.router.navigate(['/changepwd']);
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

  openForgotPasswordModal() {
    this.showForgotPasswordModal = true;
    this.resetEmail = '';
    this.forgotPasswordError = '';
    this.forgotPasswordSuccess = '';
  }

  closeForgotPasswordModal() {
    this.showForgotPasswordModal = false;
    this.resetEmail = '';
    this.forgotPasswordError = '';
    this.forgotPasswordSuccess = '';
  }

  onForgotPasswordSubmit() {
    if (!this.resetEmail) return;

    this.isResetting = true;
    this.forgotPasswordError = '';
    this.forgotPasswordSuccess = '';

    this.authService.resetPassword(this.resetEmail).subscribe({
      next: (response) => {
        this.isResetting = false;
        this.forgotPasswordSuccess = 'Password reset email sent successfully. Please check your email.';
        setTimeout(() => {
          this.closeForgotPasswordModal();
        }, 3000);
      },
      error: (error) => {
        this.isResetting = false;
        this.forgotPasswordError = error.error?.message || 'Failed to reset password. Please try again.';
      }
    });
  }
  toggleSound() {
    if (!this.videoPlayer) return;
  
    const video = this.videoPlayer.nativeElement;
  
    // Toggle mute state
    this.isMuted = !this.isMuted;
    video.muted = this.isMuted;
  
    video.play().catch((error: any) => {
      console.error(this.isMuted ? 'Playback failed while muting:' : 'Unmute failed:', error);
      // Optional: revert mute state if unmuting fails
      if (!this.isMuted) {
        this.isMuted = true;
        video.muted = true;
      }
    });
  }
  
}
