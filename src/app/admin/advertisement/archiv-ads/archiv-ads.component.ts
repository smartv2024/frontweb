import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { AuthService } from '../../../AuthService/auth.service';

@Component({
  selector: 'app-archiv-ads',
  standalone: false,

  templateUrl: './archiv-ads.component.html',
  styleUrl: './archiv-ads.component.css',
})
export class ArchivAdsComponent implements OnInit {
  advertisements: any[] = [];
  filteredAds: any[] = [];
  userRole: string = '';
  userId: string = '';
  successMessage = '';
  errorMessage: string = '';
  selectedVideoUrl: string = '';
  isModalOpen: boolean = false;
  isConfirmDialogOpen: boolean = false;
  archivingAdId: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string = '';

  constructor(
    private adminService: AdminService,
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
          this.advertisements = (data.data || []).filter(
            (ad: any) => ad.isDeleted === true
          );
          this.filteredAds = [...this.advertisements];
        },
        (error) => {
          console.error('Error fetching advertisements:', error);
          this.errorMessage =
            error.error?.message || 'Failed to load advertisements.';
        }
      );
    } else {
      this.adminService.getAdvertisementsByUserId(this.userId).subscribe(
        (data: any) => {
          this.advertisements = (data.data || []).filter(
            (ad: any) => ad.isDeleted === true
          );
          this.filteredAds = [...this.advertisements];
        },
        (error) => {
          console.error('Error fetching advertisements:', error);
          this.errorMessage =
            error.error?.message || 'Failed to load advertisements.';
        }
      );
    }
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
