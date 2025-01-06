import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advertisement',
  standalone: false,
  
  templateUrl: './advertisement.component.html',
  styleUrl: './advertisement.component.css'
})
export class AdvertisementComponent {
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

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.loadAdvertisements();
  }

  loadAdvertisements() {
    this.adminService.getAds().subscribe(
      (data: any) => {
        this.advertisements = (data.data || []).filter((ad: any) => ad.isDeleted === false);
        this.filteredAds = [...this.advertisements]; // Initialize filtered ads
      },
      (error) => {
        this.errorMessage = error.error?.message || 'Failed to load advertisements.';
      }
    );
  }

  filteredAdvertisements() {
    if (!this.searchTerm) {
      this.filteredAds = this.advertisements;
    } else {
      const lowerCaseTerm = this.searchTerm.toLowerCase();
      this.filteredAds = this.advertisements.filter((ad) =>
        ad.name.toLowerCase().includes(lowerCaseTerm) ||
        ad.description.toLowerCase().includes(lowerCaseTerm) ||
        ad.orientation.toLowerCase().includes(lowerCaseTerm)
      );
    }
    return this.paginatedAdvertisements();
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
    this.editAdvertisementObject = { ...ad }; // Create a copy of the ad for editing
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  updateAdvertisement() {
    this.adminService.updateAd(this.editAdvertisementObject._id, this.editAdvertisementObject).subscribe(
      () => {
        this.successMessage = 'Advertisement updated successfully!';
        this.isEditModalOpen = false; // Close the edit modal
        this.loadAdvertisements(); // Reload the list
      },
      (error) => {
        console.error('Error updating advertisement:', error);
        this.errorMessage =
          error.error?.message || 'Failed to update advertisement.';
      }
    );
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
}
