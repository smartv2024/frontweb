import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-list-users',
  standalone: false,
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  errorMessage: string = '';
  successMessage: string = '';
  availableRoles = ['client', 'admin'];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe(
      (data: any) => {
        this.users = data.data || [];
        this.filteredUsers = [...this.users];
        this.calculatePagination();
      },
      (error) => {
        this.errorMessage = error.error?.message || 'Failed to load users. Please try again.';
      }
    );
  }

  // Add new toggleUserStatus method
  toggleUserStatus(userId: string) {
    if (confirm('Are you sure you want to change this user\'s status?')) {
      this.adminService.toggleUserStatus(userId).subscribe(
        () => {
          this.loadUsers(); // Reload users after status change
        },
        (error) => {
          this.errorMessage = error.error?.message || 'Failed to update user status.';
        }
      );
    }
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = [...this.users];
    } else {
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredUsers = this.users.filter(user =>
        user.username?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.phoneNumber?.toString().includes(term) ||
        user.role?.toLowerCase().includes(term)
      );
    }
    this.currentPage = 1; // Reset to first page when searching
    this.calculatePagination();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  getCurrentPageUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
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

  navigateToAddUser() {
    this.router.navigate(['/admin/addUser']);
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(id).subscribe(
        () => {
          this.loadUsers();
        },
        (error) => {
          this.errorMessage = error.error?.message || 'Failed to delete user.';
        }
      );
    }
  }

  getRoleBadgeClass(role: string): string {
    return role.toLowerCase() === 'admin' 
      ? 'badge bg-primary' 
      : 'badge bg-secondary';
  }

  resetUserPassword(userId: string, email: string) {
    if (confirm(`Are you sure you want to reset the password for user with email ${email}?`)) {
      this.adminService.resetUserAccount({ userId, email }).subscribe(
        () => {
          this.successMessage = 'Password reset successful. User will receive new credentials via email.';
          setTimeout(() => this.successMessage = '', 3000);
        },
        (error) => {
          this.errorMessage = error.error?.message || 'Failed to reset password.';
        }
      );
    }
  }

  changeRole(userId: string, newRole: string) {
    if (confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      this.adminService.changeUserRole(userId, newRole).subscribe(
        () => {
          this.loadUsers();
          this.successMessage = `User role successfully changed to ${newRole}`;
          setTimeout(() => this.successMessage = '', 3000);
        },
        (error) => {
          this.errorMessage = error.error?.message || 'Failed to change user role.';
        }
      );
    }
  }
}
