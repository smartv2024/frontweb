import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: false,
  
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    const authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
      // Redirect to login page
      this.router.navigate(['/login']);
    }
  }
}
