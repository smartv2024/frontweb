import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import { AuthService } from '../../AuthService/auth.service';

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
  userId!: string;
  filteredAds: any[] = [];
  userRole!: string ;
  activeTab: string = 'all';
  allDevices: any[] = [];
  myDevices: any[] = [];

constructor(
    private adminService: AdminService,
    private router: Router,
    private authService: AuthService,
    private route:ActivatedRoute
  ) {
    this.userRole = this.authService.userRole || 'user';
    this.userId = this.authService.userId || '';
    console.log('Constructor - User ID:', this.userId);
    console.log('Constructor - User Role:', this.userRole);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadDevices();
    });
  }

  // Fetch devices with isDeleted = false
  loadDevices() {
    if (this.userRole === 'admin' || this.userRole === 'SUPERADMIN') {
      // Load all devices
      this.adminService.getDevices().subscribe(
        (data: any) => {
          if (data && Array.isArray(data.data)) {
            // Store all non-deleted devices
            this.allDevices = data.data.filter(
              (device: any) => device.isDeleted === false
            );
            
            // Filter my devices - make sure to compare strings
            this.myDevices = this.allDevices.filter(
              (device: any) => device.userId?._id === this.userId || device.userId === this.userId
            );
            
            console.log('All Devices:', this.allDevices);
            console.log('My Devices:', this.myDevices);
            console.log('Current User ID:', this.userId);
            
            // Set devices based on active tab
            this.devices = this.activeTab === 'all' ? this.allDevices : this.myDevices;
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
    } else {
      // For regular users, only load their devices
      this.adminService.getDevices().subscribe(
        (data: any) => {
          if (data && Array.isArray(data.data)) {
            this.devices = data.data.filter(
              (device: any) => device.isDeleted === false
            );
            this.myDevices = [...this.devices];
            this.allDevices = [...this.devices];
            this.filteredDevices = [...this.devices];
            this.calculatePagination();
          }
        },
        (error) => {
          this.errorMessage =
            error.error?.message || 'Failed to load devices. Please try again.';
        }
      );
    }
  }

  unpairageDevice(deviceId: string) {
    this.adminService.isPaired(deviceId).subscribe(
     re=>{
      this.loadDevices()
     }
    );
  }
  // Fetch all advertisements
  loadAds() {
    if (this.userRole === 'admin') {
      this.adminService.getAds().subscribe(
        (data: any) => {
          this.ads = (data.data || []).filter(
            (ad: any) => ad.isDeleted === false
            
          );
          this.filteredAds = [...this.ads];
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
          this.ads = (data.data || []).filter(
            (ad: any) => ad.isDeleted === false
          );
          this.filteredAds = [...this.ads];
        },
        (error) => {
          console.error('Error fetching advertisements:', error);
          this.errorMessage =
            error.error?.message || 'Failed to load advertisements.';
        }
      );
    }
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

  isScheduleButtonDisabled(device: any): boolean {
    // If user is admin/superadmin and device is not owned by them
    if ((this.userRole === 'admin' || this.userRole === 'SUPERADMIN') && 
        device.userId?._id !== this.userId) {
      return true;
    }
    return false;
  }

  getScheduleButtonTooltip(device: any): string {
    if (this.isScheduleButtonDisabled(device)) {
      return "Only the device owner can create schedules";
    }
    return "";
  }

  openScheduleModal(device: any): void {
    if (this.isScheduleButtonDisabled(device)) {
      return;
    }
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

  deleteDevice(id: string) {
    this.adminService.deleteDeviceById(id).subscribe(
      () => {
        this.loadDevices();
      },
      (error) => {
        this.errorMessage = error.error?.message || 'Failed to delete device.';
      }
    );
  }

  switchTab(tab: string) {
    this.activeTab = tab;
    this.devices = tab === 'all' ? this.allDevices : this.myDevices;
    this.filteredDevices = [...this.devices];
    this.calculatePagination();
    this.currentPage = 1;
    console.log('Switched to tab:', tab);
    console.log('Current devices:', this.devices);
  }
}
