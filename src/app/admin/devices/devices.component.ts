import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  standalone:false
})
export class DevicesComponent implements OnInit {
  devices: any[] = []; // To store the list of devices
  filteredDevices: any[] = []; // To store filtered devices
  ads: any[] = []; // To store advertisements for scheduling
  searchTerm: string = ''; // Search term for filtering
  currentPage: number = 1; // Current page for pagination
  itemsPerPage: number = 5; // Number of items to display per page
  totalPages: number = 0; // Total number of pages
  errorMessage: string = ''; // Error message for fetching devices
  editDeviceObject: any = {}; // To store the selected device for editing
  isEditModalOpen: boolean = false; // To toggle the edit modal
  isConfirmDialogOpen: boolean = false; // To toggle the confirmation dialog
  archivingDeviceId: string = ''; // To store the device ID for archiving
  selectedDevice: any = null; // To store the device being scheduled for ads
  selectedAds: string[] = []; // To store selected ad IDs
  isScheduleModalOpen: boolean = false; // To toggle the schedule modal

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.loadDevices();
  }

  // Fetch devices with isDeleted = false
  loadDevices() {
    this.adminService.getDevices().subscribe(
      (data: any) => {
        if (data && Array.isArray(data.data)) {
          this.devices = data.data.filter(
            (device: any) => device.isDeleted === false
          );
          this.filteredDevices = [...this.devices];
          this.calculatePagination();
        } else {
          console.error('Unexpected response format:', data);
        }
      },
      (error) => {
        this.errorMessage =
          error.error?.message || 'Failed to load devices. Please try again.';
      }
    );
  }

  // Fetch all advertisements
  loadAds() {
    this.adminService.getAds().subscribe(
      (data: any) => {
        this.ads = (data.data || []).filter((ad: any) => ad.isDeleted === false);
      },
      (error) => {
        this.errorMessage =
          error.error?.message || 'Failed to load advertisements.';
      }
    );
  }

  // Filter devices based on the search term
  onSearch() {
    const lowerCaseTerm = this.searchTerm.toLowerCase();
    this.filteredDevices = this.devices.filter(
      (device) =>
        device.name.toLowerCase().includes(lowerCaseTerm) ||
        device.description.toLowerCase().includes(lowerCaseTerm) ||
        device.orientation.toLowerCase().includes(lowerCaseTerm)
    );
    this.calculatePagination();
  }

  // Calculate pagination details
  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredDevices.length / this.itemsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
  }

  // Get devices for the current page
  getPaginatedDevices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredDevices.slice(startIndex, endIndex);
  }

  // Navigate to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Navigate to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Open the edit modal
  openEditModal(device: any) {
    this.editDeviceObject = { ...device };
    this.isEditModalOpen = true;
  }

  // Close the edit modal
  closeEditModal() {
    this.isEditModalOpen = false;
  }

  // Update the device
  updateDevice() {
    this.adminService
      .updateDevices(this.editDeviceObject._id, this.editDeviceObject)
      .subscribe(
        () => {
          this.loadDevices();
          this.isEditModalOpen = false;
        },
        (error) => {
          this.errorMessage =
            error.error?.message || 'Failed to update device. Please try again.';
        }
      );
  }

  // Confirm the archiving of a device
  confirmArchive(deviceId: string) {
    this.archivingDeviceId = deviceId;
    this.isConfirmDialogOpen = true;
  }

  // Archive the device
  archiveDevice() {
    this.adminService.archiveDevices(this.archivingDeviceId).subscribe(
      () => {
        this.loadDevices();
        this.isConfirmDialogOpen = false;
      },
      (error) => {
        this.errorMessage =
          error.error?.message || 'Failed to archive device. Please try again.';
      }
    );
  }

  // Close the confirmation dialog
  closeConfirmDialog() {
    this.isConfirmDialogOpen = false;
    this.archivingDeviceId = '';
  }

  // Open the schedule modal
  openScheduleModal(device: any) {
    this.selectedDevice = device;
    this.loadAds();
    this.isScheduleModalOpen = true;
  }

  // Close schedule modal and navigate to schedule
  navigateToSchedule() {
    this.isScheduleModalOpen = false; // Close modal
    const queryParams = {
      deviceId: this.selectedDevice._id,
      ads: this.selectedAds.join(','),
    };
    this.router.navigate(['/admin/Makeschedule'], { queryParams });
  }

  // Toggle the selection of an ad
  toggleAdSelection(adId: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedAds.push(adId);
    } else {
      this.selectedAds = this.selectedAds.filter((id) => id !== adId);
    }
  }

  // Navigate to the add device page
  navigateToAddDevice() {
    this.router.navigate(['/admin/addDevices']); // Navigate to the 'addDevices' route
  }
}
