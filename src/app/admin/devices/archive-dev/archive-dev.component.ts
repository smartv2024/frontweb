import { Component } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archive-dev',
  standalone: false,
  
  templateUrl: './archive-dev.component.html',
  styleUrl: './archive-dev.component.css'
})
export class ArchiveDevComponent {
 devices: any[] = []; // To store the list of devices
  filteredDevices: any[] = []; // To store filtered devices
  searchTerm: string = ''; // Search term for filtering
  currentPage: number = 1; // Current page for pagination
  itemsPerPage: number = 5; // Number of items to display per page
  totalPages: number = 0; // Total number of pages
  errorMessage: string = ''; // Error message for fetching devices
  editDeviceObject: any = {}; // To store the selected device for editing
  isEditModalOpen: boolean = false; // To toggle the edit modal
  isConfirmDialogOpen: boolean = false; // To toggle the confirmation dialog
  archivingDeviceId: string = ''; // To store the device ID for archiving

  constructor(private adminService: AdminService, private router:Router) {}

  ngOnInit() {
    this.loadDevices();
  }

  // Fetch devices with isDeleted = false
  loadDevices() {
    this.adminService.getDevices().subscribe(
      (data: any) => {
        console.log('API Response  un:', data.data);
        if (data && Array.isArray(data.data)) {
          this.devices = data.data.filter((device: any) => device.isDeleted === true);
          this.filteredDevices = [...this.devices]; // Initialize filteredDevices with all devices
          this.calculatePagination();
        } else {
          console.error('Unexpected response format:', data);
          throw new TypeError('Unexpected response format. Expected an object with a data array.');
        }
      },
      (error) => {
        console.error('Error fetching devices:', error);
        this.errorMessage =
          error.error?.message || 'Failed to load devices. Please try again.';
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
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1); // Adjust currentPage if necessary
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
    this.editDeviceObject = { ...device }; // Create a copy of the device for editing
    this.isEditModalOpen = true; // Toggle modal open
  }
  
  closeEditModal() {
    this.isEditModalOpen = false; // Toggle modal closed
  }
  
 

  // Update the device
  updateDevice() {
    this.adminService.updateDevices(this.editDeviceObject._id, this.editDeviceObject).subscribe(
      () => {
        this.loadDevices(); // Reload the list
        this.isEditModalOpen = false; // Close the modal
      },
      (error) => {
        console.error('Error updating device:', error);
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
  unarchiveDevices() {
    this.adminService.unarchiveDevices(this.archivingDeviceId).subscribe(
      () => {
        this.loadDevices(); // Reload the list
        this.isConfirmDialogOpen = false; // Close the confirmation dialog
      },
      (error) => {
        console.error('Error archiving device:', error);
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
  navigateToAddDevice(){
    this.router.navigate(['/admin/addDevices']);
  }
}
