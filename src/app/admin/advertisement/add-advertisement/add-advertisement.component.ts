import { Component, NgZone } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { VideoDownloadService } from '../../../services/video-download.service';
import { map } from 'rxjs';
import { environment } from '../../../../environnement/enivronement';

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
  estimatedUploadTime: number | null = null; // new property to store seconds

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
    private router: Router,
    private ngZone: NgZone // Add NgZone for handling async updates
  ) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', {
        name: file.name,
        type: file.type,
        size: file.size
      });
      
      // Check if the file type is a valid video format
     
      
      if (file.size > 100 * 1024 * 1024) {
        this.errorMessage = 'File size should not exceed 100MB.';
        console.error('File too large:', file.size);
        this.selectedFile = null;
        return;
      }
      
      this.selectedFile = file;
      this.errorMessage = '';
      console.log('File accepted:', file.name);
   //   this.measureUploadSpeedAndEstimateTime(file);
    }
  }
  private async measureUploadSpeedAndEstimateTime(file: File) {
    try {
      const dummyData = new FormData();
      dummyData.append('file', new Blob([new Uint8Array(100000)]));

      const startTime = Date.now();
      await this.adminService.uploadVideo(dummyData).toPromise();
      const endTime = Date.now();

      const durationSeconds = (endTime - startTime) / 1000;
      const dummySizeBits = 100000 * 8;
      const uploadSpeedBps = dummySizeBits / durationSeconds;

      const fileSizeBits = file.size * 8;
      const estimatedSeconds = fileSizeBits / uploadSpeedBps;

      this.estimatedUploadTime = Math.round(estimatedSeconds);
    } catch (error) {
      console.error('Error estimating upload time:', error);
      this.estimatedUploadTime = null;
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
    console.log('=== UPLOAD VIDEO STARTED ===');
    
    if (!this.selectedFile) {
      console.error('No file selected');
      this.errorMessage = 'Please select a video file';
      return;
    }
    
    // Double-check file type before uploading
  
    
    console.log('Selected file:', {
      name: this.selectedFile.name,
      type: this.selectedFile.type,
      size: this.formatBytes(this.selectedFile.size)
    });

    const formData = new FormData();
    
    // Ensure the file is properly named with the correct extension
    let fileName = this.selectedFile.name;
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    
    // If the file doesn't have a proper video extension, add one based on the mime type
    if (!this.isValidVideoExtension(fileExtension)) {
      console.warn('File has invalid or missing extension:', fileExtension);
      
      // Map mime type to extension
      const extensionMap: {[key: string]: string} = {
        'video/mp4': 'mp4',
        'video/mpeg': 'mpeg',
        'video/x-matroska': 'mkv',
        'video/x-msvideo': 'avi',
        'video/quicktime': 'mov',
        'video/webm': 'webm',
        'video/x-flv': 'flv',
        'video/3gpp': '3gp',
        'video/3gpp2': '3g2',
        'video/x-ms-wmv': 'wmv'
      };
      
      const newExtension = extensionMap[this.selectedFile.type] || 'mp4';
      fileName = `${fileName.split('.')[0]}.${newExtension}`;
      console.log('Renamed file to ensure proper extension:', fileName);
    }
    
    // Create a new File object with the corrected name if needed
    const fileToUpload = fileName !== this.selectedFile.name 
      ? new File([this.selectedFile], fileName, { type: this.selectedFile.type }) 
      : this.selectedFile;
    
    formData.append('video', fileToUpload);
    formData.append('name', this.advertisementObject.name || fileName);
    formData.append('description', this.advertisementObject.description || '');
    formData.append('orientation', this.advertisementObject.orientation || '');
    
    console.log('Form data prepared with file:', fileName);

    this.uploadProgress = 0;
    this.isUploading = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Get the authentication token
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      this.errorMessage = 'Authentication token not found';
      this.isUploading = false;
      return;
    }

    try {
      // Create a unique upload ID to correlate this upload
      const uploadId = Date.now().toString();
      formData.append('uploadId', uploadId);

      // Create headers for fetch API
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${token}`);

      // Use fetch API for the upload with SSE response
      const response = await fetch(`${environment.baseUrl}/api/cloudinary-advertisements/upload-with-progress`, {
        method: 'POST',
        headers: headers,
        body: formData,
       // credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Process the SSE stream
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      // Read the stream
      const decoder = new TextDecoder();
      let buffer = '';

      const processStream = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              console.log('Stream complete');
              break;
            }
            
            // Decode the chunk and add it to our buffer
            buffer += decoder.decode(value, { stream: true });
            
            // Process complete SSE messages in the buffer
            const messages = buffer.split('\n\n');
            buffer = messages.pop() || ''; // Keep the last incomplete message in the buffer
            
            for (const message of messages) {
              if (message.startsWith('data: ')) {
                try {
                  const data = JSON.parse(message.substring(6));
                  
                  this.ngZone.run(() => {
                    if (data.event === 'progress') {
                      this.uploadProgress = data.percentage;
                      this.successMessage = `Uploading: ${this.uploadProgress}%`;
                    } else if (data.event === 'complete') {
                      this.uploadedVideoUrl = data.data.fileInfo.url;
                      this.advertisementId = data.data.advertisementId;
                      this.successMessage = data.message || 'Video uploaded successfully!';
                      this.isVideoProcessed = true;
                      this.isUploading = false;
                    } else if (data.event === 'error') {
                      this.errorMessage = data.message || 'Upload failed';
                      this.isUploading = false;
                    }
                  });
                } catch (error) {
                  console.error('Error parsing SSE message:', error, message);
                }
              }
            }
          }
        } catch (error) {
          console.error('Error reading stream:', error);
          this.ngZone.run(() => {
            this.errorMessage = 'Error processing upload stream';
            this.isUploading = false;
          });
        }
      };

      // Start processing the stream
      processStream();
    } catch (error) {
      console.error('Error in upload process:', error);
      this.errorMessage = 'Failed to upload video. Please try again.';
      this.isUploading = false;
    }
  }

  
  // Helper function to generate a random alphanumeric string
  generateRandomString(length: number = 5): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  // Helper function to sanitize filenames (now replaces (number) with random string)
  sanitizeFileName(filename: string): string {
    let sanitized = filename.replace(/\(\d+\)/g, () => this.generateRandomString());
    sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '_');
    sanitized = sanitized.replace(/_+/g, '_');
    return sanitized;
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
    this.advertisementId = null;
    this.isVideoProcessed = false; // Reset the video processed state
    this.uploadProgress = 0;
  }

  // Helper method to validate video file types
  private isValidVideoType(mimeType: string): boolean {
    const validVideoTypes = [
      'video/mp4',
      'video/mpeg',
      'video/x-matroska',  // MKV
      'video/x-msvideo',   // AVI
      'video/quicktime',   // MOV
      'video/webm',        // WebM
      'video/x-flv',       // FLV
      'video/3gpp',        // 3GP
      'video/3gpp2',       // 3G2
      'video/x-ms-wmv'     // WMV
    ];
    
    console.log('Checking if mimetype is valid:', mimeType);
    return validVideoTypes.includes(mimeType);
  }

  // Helper method to validate video file extensions
  private isValidVideoExtension(extension?: string): boolean {
    if (!extension) return false;
    
    const validExtensions = [
      'mp4', 'mpeg', 'mpg', 'mkv', 'avi', 'mov', 
      'webm', 'flv', '3gp', '3g2', 'wmv'
    ];
    
    return validExtensions.includes(extension.toLowerCase());
  }

  // Helper function to format bytes
  private formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
