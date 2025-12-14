import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../environnement/enivronement';
import { jwtDecode } from 'jwt-decode';
import { SocketService } from '../services/socket.service';

interface UserState {
  id: string | null;
  role: string | null;
  token: string | null;
  forcePasswordChange: boolean;
  isActive: boolean;
}

interface JwtPayload {
  id: string;
  role: string;
  forcePasswordChange: boolean;
  isActive: boolean;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userState = new BehaviorSubject<UserState>({
    id: null,
    role: null,
    token: null,
    forcePasswordChange: false,
    isActive: false
  });

  constructor(private http: HttpClient) {
    this.initializeFromStorage();
  }

  private initializeFromStorage(): void {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        this.userState.next({
          id: decoded.id,
          role: decoded.role,
          token,
          forcePasswordChange: decoded.forcePasswordChange,
          isActive: decoded.isActive
        });
      } catch (error) {
        this.logout();
      }
    }
  }

  get currentUser$(): Observable<UserState> {
    return this.userState.asObservable();
  }

  get userId(): string | null {
    const currentState = this.userState.value;
    return currentState ? currentState.id : null;
  }

  get userRole(): string | null {
    return this.userState.value.role;
  }

  get token(): string | null {
    return this.userState.value.token;
  }

  get isAuthenticated(): boolean {
    return !!this.userState.value.token;
  }

  get isAdmin(): boolean {
    return this.userState.value.role === 'admin' ||this.userState.value.role === 'SUPERADMIN' ;
  }

  get forcePasswordChange(): boolean {
    return this.userState.value.forcePasswordChange;
  }

  get isActive(): boolean {
    return this.userState.value.isActive;
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/auth/login`, credentials)
      .pipe(
        tap((response: any) => {
          if (response?.token) {
            const decoded = jwtDecode<JwtPayload>(response.token);
            
            // Double check isActive status from token
            if (!decoded.isActive) {
              sessionStorage.clear();
              throw new Error('Account is inactive');
            }

            // Update state
            this.userState.next({
              id: decoded.id,
              role: decoded.role,
              token: response.token,
              forcePasswordChange: decoded.forcePasswordChange,
              isActive: decoded.isActive
            });

            // Store in sessionStorage for page refreshes
            sessionStorage.setItem('authToken', response.token);
          }
        }),
        catchError((error) => {
          // Clear any existing auth data
          this.logout();
          
          // Rethrow the error to be handled by the component
          throw error;
        })
      );
  }

  logout(): void {
    this.userState.next({
      id: null,
      role: null,
      token: null,
      forcePasswordChange: false,
      isActive: false
    });
    sessionStorage.clear();
    localStorage.clear();
    this
  }

  changePassword(credentials: { 
    userId: string; 
    currentPassword: string; 
    newPassword: string 
  }): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}/api/auth/change-password-verify`, 
      credentials
    ).pipe(
      tap((response: any) => {
        if (response.success && response.token) {
          // Update token and state
          sessionStorage.setItem('authToken', response.token);
          const decoded = jwtDecode<JwtPayload>(response.token);
          
          // Update user state with new token and forcePasswordChange status
          const currentState = this.userState.value;
          this.userState.next({
            ...currentState,
            token: response.token,
            forcePasswordChange: decoded.forcePasswordChange
          });
        }
      })
    );
  }
  resetPassword(email: string) {
    return this.http.post<any>(`${environment.baseUrl}/api/auth/reset-account`, { email }, { observe: 'response' })
      .pipe(
        map(response => ({
          status: response.status,
          message: response.body?.message
        }))
      );
  }
}
