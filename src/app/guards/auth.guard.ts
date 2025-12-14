import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isAuthenticated || !this.authService.isActive) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check for admin routes
    if (route.data['requiresAdmin'] && !this.authService.isAdmin) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
