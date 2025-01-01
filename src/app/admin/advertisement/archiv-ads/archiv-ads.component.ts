import { Component } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-archiv-ads',
  standalone: false,

  templateUrl: './archiv-ads.component.html',
  styleUrl: './archiv-ads.component.css',
})
export class ArchivAdsComponent {
  advertisements: any[] = [];
  filteredAds: any[] = [];
  successMessage = '';
  errorMessage = '';
  selectedVideoUrl: string = '';
  isModalOpen: boolean = false;
  isConfirmDialogOpen: boolean = false;
  archivingAdId: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadAdvertisements();
  }

  loadAdvertisements() {
    this.adminService.getAds().subscribe(
      (data: any) => {
        this.advertisements = (data.data || []).filter(
          (ad: any) => ad.isDeleted === true
        );
        this.filteredAds = [...this.advertisements]; // Initialize filtered ads
      },
      (error) => {
        console.error('Error fetching advertisements:', error);
        this.errorMessage =
          error.error?.message || 'Failed to load advertisements.';
      }
    );
  }

  // Filter advertisements based on the search term
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

  // Get the paginated advertisements
  paginatedAdvertisements() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredAds.slice(startIndex, endIndex);
  }

  // Get total pages
  get totalPages() {
    return Math.ceil(this.filteredAds.length / this.itemsPerPage);
  }

  // Navigate to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Navigate to the previous page
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

  confirmArchive(id: string) {
    this.archivingAdId = id;
    this.isConfirmDialogOpen = true;
  }

  unarchiveAd(id: string) {
    this.adminService.unarchiveAds(id).subscribe(
      () => {
        this.successMessage = 'Advertisement unarchived successfully!';
        this.loadAdvertisements();
        this.closeConfirmDialog();
      },
      (error) => {
        console.error('Error unarchiving advertisement:', error);
        this.errorMessage =
          error.error?.message || 'Failed to unarchive advertisement.';
      }
    );
  }

  closeConfirmDialog() {
    this.isConfirmDialogOpen = false;
    this.archivingAdId = '';
  }
}
