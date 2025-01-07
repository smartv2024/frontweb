import { Component } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-advertisement',
  standalone: false,
  
  templateUrl: './add-advertisement.component.html',
  styleUrl: './add-advertisement.component.css'
})
export class AddAdvertisementComponent {
  advertisementObject = {
    name: '',
    description: '',
    videoUrl: '',
    orientation: '',
  };

  orientations = ['portrait', 'landscape']; // Options for the orientation dropdown
  isSubmitting = false; // To handle loading state
  successMessage = ''; // To display success messages
  errorMessage = ''; // To display error messages
  videoResolutionError = ''; // To display resolution errors

  constructor(private adminService: AdminService, private router: Router) {}
  validateVideoResolution(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const videoUrl = inputElement.value;
    this.videoResolutionError = ''; // Reset previous error message
  
    if (videoUrl) {
      this.getMediaDimensions(videoUrl)
        .then((dimensions) => {
          console.log('Video Dimensions:', dimensions);
          if (dimensions.width > 1920 || dimensions.height > 1080) {
            this.videoResolutionError =
              'The video resolution exceeds the maximum allowed size of 1920x1080.';
            this.advertisementObject.videoUrl = ''; // Clear the invalid URL
          }
        })
        .catch((error) => {
          console.error('Error fetching video dimensions:', error);
          this.videoResolutionError =
            'Unable to validate video resolution. Please provide a valid video URL.';
          this.advertisementObject.videoUrl = ''; // Clear the invalid URL
        });
    }
  }
  
  getMediaDimensions(videoUrl: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = videoUrl;
  
      video.onloadedmetadata = () => {
        resolve({ width: video.videoWidth, height: video.videoHeight });
      };
  
      video.onerror = () => {
        reject('Failed to load video metadata.');
      };
    });
  }
  
  addAdvertisement() {
    this.isSubmitting = true;
    this.successMessage = ''; // Clear previous success message
    this.errorMessage = ''; // Clear previous error message

    this.adminService.addAds(this.advertisementObject).subscribe(
      (response) => {
        console.log('Advertisement added:', response);
        this.successMessage = 'Advertisement added successfully!';
        this.isSubmitting = false;

        // Reset the form
        this.advertisementObject = {
          name: '',
          description: '',
          videoUrl: '',
          orientation: '',
        };
      },
      (error) => {
        console.error('Error adding advertisement:', error);
        this.errorMessage = error.error?.message || 'Failed to add advertisement. Please try again.';
        this.isSubmitting = false;
      }
    );
  }

  navigateToList() {
    // Navigate back to the list of advertisements
    this.router.navigate(['/admin/ads']);
  }
  getVideoResolution(url: string): { width: number, height: number } {
    // This is a mock implementation
    return { width: 1280, height: 720 }; // Example resolution
  }
  checkVideoResolution(url: string): string {
    const maxResolution = { width: 1920, height: 1080 };
    const videoResolution = this.getVideoResolution(url);
    if (videoResolution.width > maxResolution.width || videoResolution.height > maxResolution.height) {
      return 'The video resolution exceeds the maximum allowed size of 1920x1080.';
    }
    return '';
  }

}
function getMediaDimensions(arg0: string) {
  throw new Error('Function not implemented.');
}

