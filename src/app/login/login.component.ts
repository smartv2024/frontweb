import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush // Use OnPush for better performance
})
export class LoginComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  
  // Use private variables with getters where needed
  private _isMuted: boolean = true;
  private _username: string = '';
  private _password: string = '';
  private _errorMessage: string = '';
  private _isLoading: boolean = false;
  private _showForgotPasswordModal: boolean = false;
  private _resetEmail: string = '';
  private _isResetting: boolean = false;
  private _forgotPasswordError: string = '';
  private _forgotPasswordSuccess: string = '';
  
  // Destroy subject for cleanup
  private destroy$ = new Subject<void>();
  
  // Lazy load video
  videoLoaded: boolean = false;
  
  // Getters and setters for properties
  get isMuted(): boolean { return this._isMuted; }
  set isMuted(value: boolean) { this._isMuted = value; }
  
  get username(): string { return this._username; }
  set username(value: string) { this._username = value; }
  
  get password(): string { return this._password; }
  set password(value: string) { this._password = value; }
  
  get errorMessage(): string { return this._errorMessage; }
  set errorMessage(value: string) { this._errorMessage = value; }
  
  get isLoading(): boolean { return this._isLoading; }
  set isLoading(value: boolean) { this._isLoading = value; }
  
  get showForgotPasswordModal(): boolean { return this._showForgotPasswordModal; }
  set showForgotPasswordModal(value: boolean) { this._showForgotPasswordModal = value; }
  
  get resetEmail(): string { return this._resetEmail; }
  set resetEmail(value: string) { this._resetEmail = value; }
  
  get isResetting(): boolean { return this._isResetting; }
  set isResetting(value: boolean) { this._isResetting = value; }
  
  get forgotPasswordError(): string { return this._forgotPasswordError; }
  set forgotPasswordError(value: string) { this._forgotPasswordError = value; }
  
  get forgotPasswordSuccess(): string { return this._forgotPasswordSuccess; }
  set forgotPasswordSuccess(value: string) { this._forgotPasswordSuccess = value; }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Preconnect to API endpoint to speed up subsequent requests
    this.addPreconnect();
  }

  ngAfterViewInit() {
    // Defer video initialization to improve initial load time
    setTimeout(() => this.initializeVideo(), 100);
    
    // Use passive event listeners for better scroll performance
    this.setupEventListeners();
  }
  
  private addPreconnect(): void {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = new URL(location.origin).origin;
    document.head.appendChild(link);
  }
  
  private initializeVideo(): void {
    if (!this.videoPlayer) return;
    
    const video = this.videoPlayer.nativeElement;
    video.defaultMuted = true;
    video.muted = true;
    video.preload = 'metadata'; // Only load metadata initially
    
    // Load video content when visible in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.preload = 'auto';
          this.playVideoWithRetry();
          this.videoLoaded = true;
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(video);
  }
  
  private playVideoWithRetry(): void {
    if (!this.videoPlayer) return;
    
    const video = this.videoPlayer.nativeElement;
    
    const playVideo = () => {
      video.play().catch((error: any) => {
        console.log("Video autoplay failed:", error);
      });
    };
    
    // Try autoplay
    playVideo();
  }
  
  private setupEventListeners(): void {
    // Use passive event listeners for better performance
    document.addEventListener('click', () => this.playVideoWithRetry(), { once: true, passive: true });
    document.addEventListener('touchstart', () => this.playVideoWithRetry(), { once: true, passive: true });
    
    // Clean up any potential memory leaks
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(150),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        // Adjust video sizing if needed
        this.optimizeVideoForViewport();
      });
  }
  
  private optimizeVideoForViewport(): void {
    if (!this.videoPlayer || !this.videoLoaded) return;
    
    const video = this.videoPlayer.nativeElement;
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    // Optimize video quality based on viewport
    if (viewport.width <= 768) {
      // Lower quality for mobile
      if (video.currentTime === 0) {
        video.currentTime = 0.1; // Skip first frame to trigger load
      }
    }
  }

  onSubmit() {
    if (this.isLoading) return; // Prevent multiple submissions
    
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
    // Clean up resources
    setTimeout(() => {
      this.resetEmail = '';
      this.forgotPasswordError = '';
      this.forgotPasswordSuccess = '';
    }, 300); // After animation completes
  }

  onForgotPasswordSubmit() {
    if (!this.resetEmail || this.isResetting) return;

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
    if (!this.videoPlayer || !this.videoLoaded) return;
  
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
  
  ngOnDestroy(): void {
    // Clean up resources
    this.destroy$.next();
    this.destroy$.complete();
    
    // Clean up any video resources
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      video.pause();
      video.src = '';
      video.load();
    }
  }
}
