import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ForcePasswordChangeGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.forcePasswordChange) {
      // If force password change is true, only allow access to change password route
      if (!route.routeConfig?.path?.includes('changepwd')) {
        this.router.navigate(['/admin/changepwd']);
        return false;
      }
    }
    return true;
  }
}