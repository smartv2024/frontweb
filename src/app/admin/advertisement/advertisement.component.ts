import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { AuthService } from '../../AuthService/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-advertisement',
  standalone: false,
  
  templateUrl: './advertisement.component.html',
  styleUrl: './advertisement.component.css'
})
export class AdvertisementComponent implements OnInit {
  advertisements: any[] = [];
  successMessage = '';
  searchTerm: string = ''; // Search term for filtering

  errorMessage = '';
  selectedVideoUrl: string = '';
  isModalOpen: boolean = false;
  isEditModalOpen: boolean = false; // For the edit modal
  isConfirmDialogOpen: boolean = false;
  archivingAdId: string = '';
  editAdvertisementObject: any = {}; // To store the advertisement being edited
  orientations = ['portrait', 'landscape']; // Orientation options

  currentPage: number = 1;
  itemsPerPage: number = 5;
  filteredAds: any[] = [];
  userRole!: string ;
  userId!: string ;

  // Add new properties for video handling
  selectedVideoSource: string = 'local';
  videoSources = ['local', 'youtube'];
  selectedFile: File | null = null;
  youtubeUrl: string = '';
  isUploading: boolean = false;
  uploadProgress: number = 0;
  videoResolutionError: string = '';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private authService: AuthService
  ) {
    this.userRole = this.authService.userRole || 'user';
    this.userId = this.authService.userId || '';
  }

  ngOnInit() {
    this.loadAdvertisements();
  }

  loadAdvertisements() {
    if (this.userRole === 'admin') {
      this.adminService.getAds().subscribe(
        (data: any) => {
          this.advertisements = (data.data || []).filter((ad: any) => ad.isDeleted === false);
          this.filteredAds = [...this.advertisements];
        },
        (error) => {
          this.errorMessage = error.error?.message || 'Failed to load advertisements.';
        }
      );
    } else {
      this.adminService.getAdvertisementsByUserId(this.userId).subscribe(
        (data: any) => {
          this.advertisements = (data.data || []).filter((ad: any) => ad.isDeleted === false);
          this.filteredAds = [...this.advertisements];
        },
        (error) => {
          this.errorMessage = error.error?.message || 'Failed to load advertisements.';
        }
      );
    }
  }

  filteredAdvertisements() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    
    if (!this.searchTerm.trim()) {
      return this.filteredAds.slice(start, end);
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    return this.filteredAds
      .filter(ad => 
        ad.name?.toLowerCase().includes(searchTermLower) ||
        ad.description?.toLowerCase().includes(searchTermLower) ||
        ad.userId?.username?.toLowerCase().includes(searchTermLower) ||
        ad.userId?.email?.toLowerCase().includes(searchTermLower)
      )
      .slice(start, end);
  }

  paginatedAdvertisements() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredAds.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.filteredAds.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  openModal(videoUrl: string) {
    this.selectedVideoUrl = videoUrl;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openEditModal(ad: any) {
    this.editAdvertisementObject = { ...ad };
    this.selectedVideoSource = 'local';
    this.selectedFile = null;
    this.youtubeUrl = '';
    this.uploadProgress = 0;
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        this.errorMessage = 'Please select a valid video file.';
        return;
      }
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
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

    if (!this.validateYoutubeUrl(this.youtubeUrl)) {
      this.errorMessage = 'Please enter a valid YouTube URL';
      return;
    }

    try {
      this.isUploading = true;
      this.errorMessage = '';
      // Here you could add additional YouTube URL validation or processing
      this.isUploading = false;
    } catch (error: any) {
      this.errorMessage = 'Failed to process YouTube URL';
      this.isUploading = false;
    }
  }

  async updateAdvertisement() {
    try {
      this.isUploading = true;
      this.errorMessage = '';
      this.successMessage = '';

      // Check if video update is needed
      const isVideoUpdate = (this.selectedVideoSource === 'local' && this.selectedFile) || 
                          (this.selectedVideoSource === 'youtube' && this.youtubeUrl);

      if (isVideoUpdate) {
        // Use complex update route when updating video
        const formData = new FormData();
        formData.append('name', this.editAdvertisementObject.name);
        formData.append('description', this.editAdvertisementObject.description);
        formData.append('orientation', this.editAdvertisementObject.orientation);

        if (this.selectedVideoSource === 'local' && this.selectedFile) {
          formData.append('video', this.selectedFile);
        } else if (this.selectedVideoSource === 'youtube' && this.youtubeUrl) {
          formData.append('youtubeUrl', this.youtubeUrl);
        }

        await this.adminService.updateAdComplex(
          this.editAdvertisementObject._id, 
          formData
        ).toPromise();
      } else {
        // Use simple update route when only updating attributes
        const updateData = {
          name: this.editAdvertisementObject.name,
          description: this.editAdvertisementObject.description,
          orientation: this.editAdvertisementObject.orientation
        };

        await this.adminService.updateAdSimple(
          this.editAdvertisementObject._id,
          updateData
        ).toPromise();
      }

      this.successMessage = 'Advertisement updated successfully!';
      this.isEditModalOpen = false;
      this.loadAdvertisements();
    } catch (error: any) {
      console.error('Error updating advertisement:', error);
      this.errorMessage = error.message || 'Failed to update advertisement.';
    } finally {
      this.isUploading = false;
    }
  }

  confirmArchive(id: string) {
    this.archivingAdId = id;
    this.isConfirmDialogOpen = true;
  }

  archiveAd(id: string) {
    this.adminService.archiveAds(id).subscribe(
      () => {
        this.successMessage = 'Advertisement archived successfully!';
        this.loadAdvertisements();
        this.closeConfirmDialog();
      },
      (error) => {
        console.error('Error archiving advertisement:', error);
        this.errorMessage =
          error.error?.message || 'Failed to archive advertisement.';
      }
    );
  }

  closeConfirmDialog() {
    this.isConfirmDialogOpen = false;
    this.archivingAdId = '';
  }

  navigateToAddAdvertisement() {
    this.router.navigate(['/admin/newAds']);
  }

  // Method to check video resolution
  checkVideoResolution(url: string): boolean {
    // Placeholder logic for resolution check
    // In a real scenario, you would fetch video metadata to verify resolution
    const maxResolution = { width: 1920, height: 1080 };
    // Assume a function getVideoResolution() that returns the resolution
    const videoResolution = this.getVideoResolution(url);
    return videoResolution.width <= maxResolution.width && videoResolution.height <= maxResolution.height;
  }

  // Mock function to simulate getting video resolution
  getVideoResolution(url: string): { width: number, height: number } {
    // This is a mock implementation
    return { width: 1280, height: 720 }; // Example resolution
  }

  deleteAdvertisement(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteAdById(id).subscribe(
          () => {
            Swal.fire(
              'Deleted!',
              'Advertisement has been deleted.',
              'success'
            );
            this.loadAdvertisements();
          },
          (error) => {
            Swal.fire(
              'Error!',
              error.error?.message || 'Failed to delete advertisement.',
              'error'
            );
          }
        );
      }
    });
  }

  // Add progress tracking method
  updateUploadProgress(event: any) {
    if (event.lengthComputable) {
      this.uploadProgress = Math.round((event.loaded / event.total) * 100);
    }
  }

  // Add validation method for YouTube URL
  validateYoutubeUrl(url: string): boolean {
    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  }
}
