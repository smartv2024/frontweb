import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../AuthService/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private route: Router,
    public authService: AuthService
  ) { }
  
  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}
