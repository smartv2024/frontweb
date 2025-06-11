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
  devices: any[] = [];
  filteredDevices: any[] = [];
  ads: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 0;
  errorMessage: string = '';
  editDeviceObject: any = {};
  isEditModalOpen: boolean = false;
  isConfirmDialogOpen: boolean = false;
  archivingDeviceId: string = '';
  selectedDevice: any = null;
  selectedAds: string[] = [];
  isScheduleModalOpen: boolean = false;
  isDetailModalOpen: boolean = false;
  userId!: string;
  userRole!: string;
  activeTab: string = 'all';
  allDevices: any[] = [];
  myDevices: any[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.userRole = this.authService.userRole || 'user';
    this.userId = this.authService.userId || '';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadDevices();
    });
  }

  loadDevices() {
    if (this.userRole === 'admin' || this.userRole === 'SUPERADMIN') {
      this.adminService.getDevices().subscribe(
        (data: any) => {
          if (data && Array.isArray(data.data)) {
            this.allDevices = data.data.filter(
              (device: any) => device.isDeleted === false
            );
            this.myDevices = this.allDevices.filter(
              (device: any) => device.userId?._id === this.userId || device.userId === this.userId
            );
            this.devices = this.activeTab === 'all' ? this.allDevices : this.myDevices;
            this.filteredDevices = [...this.devices];
            this.calculatePagination();
          }
        },
        (error) => {
          this.errorMessage = error.error?.message || 'Failed to load devices. Please try again.';
        }
      );
    } else {
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
          this.errorMessage = error.error?.message || 'Failed to load devices. Please try again.';
        }
      );
    }
  }

  unpairageDevice(deviceId: string) {
    this.adminService.isPaired(deviceId).subscribe(
      () => {
        this.loadDevices();
      }
    );
  }

  loadAds() {
    if (this.userRole === 'admin' || this.userRole === 'SUPERADMIN') {
      this.adminService.getAds().subscribe(
        (data: any) => {
          this.ads = (data.data || []).filter(
            (ad: any) => ad.isDeleted === false
          );
        },
        (error) => {
          console.error('Error fetching ads:', error);
          this.errorMessage = error.error?.message || 'Failed to load ads.';
        }
      );
    } else {
      this.adminService.getAdvertisementsByUserId(this.userId).subscribe(
        (data: any) => {
          this.ads = (data.data || []).filter(
            (ad: any) => ad.isDeleted === false
          );
        },
        (error) => {
          console.error('Error fetching ads:', error);
          this.errorMessage = error.error?.message || 'Failed to load ads.';
        }
      );
    }
  }

  onSearch() {
    const lowerCaseTerm = this.searchTerm.toLowerCase();
    this.filteredDevices = this.devices.filter(
      (device) =>
        device.name.toLowerCase().includes(lowerCaseTerm) ||
        device.description.toLowerCase().includes(lowerCaseTerm) ||
        device.orientation.toLowerCase().includes(lowerCaseTerm) ||
        device.deviceId.toLowerCase().includes(lowerCaseTerm)
    );
    this.calculatePagination();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredDevices.length / this.itemsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
  }

  getPaginatedDevices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredDevices.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  openEditModal(device: any) {
    this.editDeviceObject = { ...device };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  updateDevice() {
    this.adminService
      .updateDevices(this.editDeviceObject._id, this.editDeviceObject)
      .subscribe(
        () => {
          this.loadDevices();
          this.isEditModalOpen = false;
        },
        (error) => {
          this.errorMessage = error.error?.message || 'Failed to update device. Please try again.';
        }
      );
  }

  confirmArchive(deviceId: string) {
    this.archivingDeviceId = deviceId;
    this.isConfirmDialogOpen = true;
  }

  archiveDevice() {
    this.adminService.archiveDevices(this.archivingDeviceId).subscribe(
      () => {
        this.loadDevices();
        this.isConfirmDialogOpen = false;
      },
      (error) => {
        this.errorMessage = error.error?.message || 'Failed to archive device. Please try again.';
      }
    );
  }

  closeConfirmDialog() {
    this.isConfirmDialogOpen = false;
    this.archivingDeviceId = '';
  }

  openDetailModal(device: any) {
    this.selectedDevice = device;
    this.isDetailModalOpen = true;
  }

  closeDetailModal() {
    this.isDetailModalOpen = false;
    this.selectedDevice = null;
  }

  isScheduleButtonDisabled(device: any): boolean {
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
    return "Schedule ads for this device";
  }

  openScheduleModal(device: any): void {
    if (this.isScheduleButtonDisabled(device)) {
      return;
    }
    this.selectedDevice = device;
    this.loadAds();
    this.isScheduleModalOpen = true;
  }

  navigateToSchedule() {
    this.isScheduleModalOpen = false;
    const queryParams = {
      deviceId: this.selectedDevice._id,
      ads: this.selectedAds.join(','),
    };
    this.router.navigate(['/admin/Makeschedule'], { queryParams });
  }

  toggleAdSelection(adId: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedAds.push(adId);
    } else {
      this.selectedAds = this.selectedAds.filter((id) => id !== adId);
    }
  }

  navigateToAddDevice() {
    this.router.navigate(['/admin/addDevices']);
  }

  navigateToAddAd() {
    this.router.navigate(['/admin/addAdvertisements']);
    this.isScheduleModalOpen = false;
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
  }
}