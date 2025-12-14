import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../AuthService/auth.service';
import { SocketService } from '../../services/socket.service';
import { environment } from '../../../environnement/enivronement';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private route: Router,
    public authService: AuthService,
    private socketService: SocketService
  ) { }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.socketService.disconnect();
    this.route.navigate(['/login']);
  }

  redirectToDashboard() {
    window.open(`${environment.baseUrl}/dashboard`, '_blank');
  }

  redirectToDeviceManagement() {
    window.open(`${environment.baseUrl}/device-management`, '_blank');
  }
}
