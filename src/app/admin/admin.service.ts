import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environnement/enivronement';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  private getHeaders() {
    let headers = new HttpHeaders();

    // Only access sessionStorage or localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('authToken'); // Can also use localStorage if needed
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return { headers };
  }

  // ********************************************** Advertisement ********************************************* */

  addAds(body: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/advertisements`, body, this.getHeaders());
  }

  getAds(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/advertisements`, this.getHeaders());
  }

  getAdsById(id: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/advertisements/${id}`, this.getHeaders());
  }

  updateAd(id: string, body: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/api/advertisements/${id}`, body, this.getHeaders());
  }

  archiveAds(id: any): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/advertisements/${id}`, this.getHeaders());
  }

  unarchiveAds(id: any): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/advertisements/undelete/${id}`, this.getHeaders());
  }

  // *********************************************** Devices ********************************************* */

  addDevices(body: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/devices`, body, this.getHeaders());
  }

  getDevices(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/devices`, this.getHeaders());
  }

  getDevicesById(id: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/devices/${id}`, this.getHeaders());
  }

  updateDevices(id: string, body: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/api/devices/${id}`, body, this.getHeaders());
  }

  archiveDevices(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/devices/${id}`, this.getHeaders());
  }

  unarchiveDevices(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/devices/undeleteDevice/${id}`, this.getHeaders());
  }

  //***************************************************** */

  createSchedule(body: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/schedules`, body, this.getHeaders());
  }

  getAllSchedule(): Observable<any>{
    return this.http.get(`${environment.baseUrl}/api/schedules`, this.getHeaders());
  }

  getScheduleById(id: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/schedules/${id}`, this.getHeaders());
  }

  updateSchedule(id: string, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/api/schedules/${id}`, data, this.getHeaders());
  }
}
