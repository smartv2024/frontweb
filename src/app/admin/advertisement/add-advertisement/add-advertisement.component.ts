import { Component } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { VideoDownloadService } from '../../../services/video-download.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.scss'],
  standalone: false
})
export class AddAdvertisementComponent {
  advertisementObject = {
    name: '',
    description: '',
    videoUrl: '',
    orientation: '',
  };

  orientations = ['portrait', 'landscape'];
  videoSources = ['local', 'youtube'];
  selectedVideoSource = 'local';
  selectedFile: File | null = null;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  videoResolutionError = '';
  youtubeUrl = '';

  // New properties for video quality handling
  availableQualities: any[] = [];
  showQualitySelector = false;
  selectedQuality: string | null = null;
  videoInfo: any = null;

  uploadProgress = 0;
  isUploading = false;
  isVideoProcessed = false;
  uploadedVideoUrl: string | null = null;

  // Add new property to store advertisementId
  private advertisementId: string | null = null;

  constructor(
    private adminService: AdminService,
    private videoDownloadService: VideoDownloadService,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        this.errorMessage = 'Please select a valid video file.';
        return;
      }
      if (file.size > 100 * 1024 * 1024) {
        this.errorMessage = 'File size should not exceed 100MB.';
        return;
      }
      this.selectedFile = file;
      this.errorMessage = '';
    }
  }

  async processYoutubeUrl() {
    if (!this.youtubeUrl) {
      this.errorMessage = 'Please enter a YouTube URL';
      return;
    }

    if (!this.videoDownloadService.isValidYoutubeUrl(this.youtubeUrl)) {
      this.errorMessage = 'Please enter a valid YouTube URL';
      return;
    }

    try {
      this.isSubmitting = true;
      this.successMessage = 'Processing YouTube video...';
      this.errorMessage = '';
      this.showQualitySelector = false;
      this.availableQualities = [];

      const response = await this.videoDownloadService.downloadYoutubeVideo(this.youtubeUrl).toPromise();
      
      if (response && Array.isArray(response) && response.length > 0) {
        this.videoInfo = response[0];
        
        if (this.videoInfo.urls && Array.isArray(this.videoInfo.urls)) {
          // Filter MP4 videos and sort by quality (highest first)
          this.availableQualities = this.videoInfo.urls
            .filter((item: any) => item.extension === 'mp4')
            .sort((a: any, b: any) => {
              const qualityA = parseInt(a.quality) || 0;
              const qualityB = parseInt(b.quality) || 0;
              return qualityB - qualityA;
            });

          if (this.availableQualities.length > 0) {
            this.showQualitySelector = true;
            this.successMessage = `${this.videoInfo.meta.title} - Select a video quality`;
          } else {
            throw new Error('No MP4 formats available for this video');
          }
        } else {
          throw new Error('Invalid video URLs in response');
        }
      } else {
        throw new Error('Invalid response from YouTube API');
      }
    } catch (error) {
      console.error('Error processing YouTube URL:', error);
      this.errorMessage = (error as Error).message || 'Failed to process YouTube video. Please try again.';
      this.successMessage = '';
    } finally {
      this.isSubmitting = false;
    }
  }

  onQualitySelected() {
    if (this.selectedQuality) {
      const selectedVideo = this.availableQualities.find(q => q.quality === this.selectedQuality);
      if (selectedVideo) {
        this.advertisementObject.videoUrl = selectedVideo.url;
        this.successMessage = `Selected quality: ${selectedVideo.quality}p - Ready to submit`;
      }
    }
  }

  downloadVideo() {
    if (this.selectedQuality) {
      const selectedVideo = this.availableQualities.find(q => q.quality === this.selectedQuality);
      if (selectedVideo && selectedVideo.url) {
        // Create a temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = selectedVideo.url;
        link.target = '_blank';
        link.download = `video_${this.selectedQuality}p.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  async uploadVideo() {
    if (!this.selectedFile && !this.youtubeUrl) {
      this.errorMessage = 'Please select a file or enter YouTube URL';
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;
    this.successMessage = '';
    this.errorMessage = '';
    
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('video', this.selectedFile);
    } else if (this.youtubeUrl) {
      formData.append('youtubeUrl', this.youtubeUrl);
    }

    try {
      this.adminService.uploadVideo(formData).subscribe({
        next: (response: any) => {
          if (response.progress !== undefined) {
            this.uploadProgress = response.progress;
          } 
          else if (response.success) {
            this.uploadedVideoUrl = response.data.fileInfo.url;
            this.advertisementId = response.data.advertisementId; // Store the advertisementId
            this.isVideoProcessed = true;
            this.successMessage = response.message || 'Video uploaded successfully!';
            this.isUploading = false;
          }
        },
        error: (error) => {
          console.error('Upload error:', error);
          this.errorMessage = error.error?.message || 'Failed to process video. Please try again.';
          this.isUploading = false;
          this.uploadProgress = 0;
        },
        complete: () => {
          this.isUploading = false;
        }
      });
    } catch (error) {
      this.errorMessage = 'Failed to process video. Please try again.';
      console.error('Upload error:', error);
      this.isUploading = false;
      this.uploadProgress = 0;
    }
  }

  async addAdvertisement() {
    if (!this.isVideoProcessed || !this.advertisementId) {
      this.errorMessage = 'Please process the video first';
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    try {
      this.advertisementObject.videoUrl = this.uploadedVideoUrl!;
      const response = await this.adminService.completeAdvertisement(
        this.advertisementId,
        this.advertisementObject
      ).toPromise();
      
      console.log('Advertisement added:', response);
      this.successMessage = 'Advertisement added successfully!';
      this.resetForm();
    } catch (error) {
      console.error('Error adding advertisement:', error);
      this.errorMessage = (error as { error?: { message?: string } }).error?.message || 'Failed to add advertisement. Please try again.';
    } finally {
      this.isSubmitting = false;
    }
  }

  private resetForm() {
    this.advertisementObject = {
      name: '',
      description: '',
      videoUrl: '',
      orientation: '',
    };
    this.selectedFile = null;
    this.youtubeUrl = '';
    this.selectedVideoSource = 'local';
    this.availableQualities = [];
    this.showQualitySelector = false;
    this.selectedQuality = null;
    this.videoInfo = null;
    this.advertisementId = null; // Add this line to reset advertisementId
  }
}
