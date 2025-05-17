import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { AuthService } from '../AuthService/auth.service';
import { environment } from '../../environnement/enivronement';
import { filter, map, Observable, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { VideoDownloadService } from '../services/video-download.service';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private videoDownloadService: VideoDownloadService,
    private http: HttpClient,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Dynamically sets headers based on whether we are in the browser or SSR.
   * If on the browser, sessionStorage is used to retrieve the token. 
   */
  private getHeaders(): { headers: HttpHeaders } {
    let headers = new HttpHeaders();

    // Only attempt to get the token if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return { headers };
  }

  // ********************************************* Advertisement **********************************************

  addAds(body: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/api/cloudinary-advertisements`,
      body,
      this.getHeaders()
    );
  }

  getAds(): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/api/cloudinary-advertisements`,
      this.getHeaders()
    );
  }

  getAdsById(id: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/api/cloudinary-advertisements/${id}`,
      this.getHeaders()
    );
  }

  updateAd(id: string, body: any): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}/api/cloudinary-advertisements/${id}`,
      body,
      this.getHeaders()
    );
  }

  archiveAds(id: any): Observable<any> {
    return this.http.delete(
      `${environment.baseUrl}/api/cloudinary-advertisements/${id}`,
      this.getHeaders()
    );
  }

  unarchiveAds(id: any): Observable<any> {
    return this.http.delete(
      `${environment.baseUrl}/api/cloudinary-advertisements/undelete/${id}`,
      this.getHeaders()
    );
  }

  deleteAdById(id: any): Observable<any> {
    return this.http.delete(
      `${environment.baseUrl}/api/cloudinary-advertisements/${id}`,
      this.getHeaders()
    );
  }

  updateAdvertisementSimple(id: string, data: { name: string, description: string, orientation: string }): Observable<any> {
    return this.http.patch(
      `${environment.baseUrl}/api/cloudinary-advertisements/${id}/updateAdsSimple`,
      data,
      this.getHeaders()
    );
  }

  updateAdvertisementComplex(id: string, formData: FormData): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}/api/cloudinary-advertisements/${id}/updateAdsComplex`,
      formData,
      this.getHeaders()
    );
  }

  updateAdComplex(id: string, formData: FormData): Observable<any> {
    console.log(formData)
    return this.http.put(`${environment.baseUrl}/api/cloudinary-advertisements/${id}/updateAdsComplex`, formData);
  }

  updateAdSimple(id: string, data: any): Observable<any> {
    console.log(data)

    return this.http.patch(`${environment.baseUrl}/api/cloudinary-advertisements/${id}/updateAdsSimple`, data);
  }

  completeAdvertisementCreation(id: string, data: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/api/cloudinary-advertisements/${id}/completeCreation`,
      data,
      this.getHeaders()
    );
  }

  getAdvertisementsByUserId(userId: string): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/api/cloudinary-advertisements/getAdvertisementsByuser/${userId}`,
      this.getHeaders()
    );
  }

  completeAdvertisement(advertisementId: string, advertisementData: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseUrl}/api/cloudinary-advertisements/${advertisementId}/completeCreation`,
      advertisementData
    );
  }

  // *********************************************** Devices *************************************************

  addDevices(body: any): Observable<any> {
    const userId = this.authService.userId; // Assuming authService has userId
    return this.http.post(
      `${environment.baseUrl}/api/devices`,
      { ...body, userId },
      this.getHeaders()
    );
  }

  getDevices(): Observable<any> {
    const userId = this.authService.userId;
    return this.http.get(
      `${environment.baseUrl}/api/devices?userId=${userId}`,
      this.getHeaders()
    );
  }

  getDevicesById(id: any): Observable<any> {
    const userId = this.authService.userId;
    return this.http.get(
      `${environment.baseUrl}/api/devices/${id}?userId=${userId}`,
      this.getHeaders()
    );
  }

  updateDevices(id: string, body: any): Observable<any> {
    const userId = this.authService.userId;
    return this.http.put(
      `${environment.baseUrl}/api/devices/${id}`,
      { ...body, userId },
      this.getHeaders()
    );
  }

  archiveDevices(id: string): Observable<any> {
    const userId = this.authService.userId;
    return this.http.delete(
      `${environment.baseUrl}/api/devices/${id}?userId=${userId}`,
      this.getHeaders()
    );
  }

  unarchiveDevices(id: string): Observable<any> {
    const userId = this.authService.userId;
    return this.http.patch(
      `${environment.baseUrl}/api/devices/unarchive/${id}?userId=${userId}`,
      this.getHeaders()
    );
  }

  isPaired(id: string): Observable<any> {
    const userId = this.authService.userId;
    return this.http.patch(
      `${environment.baseUrl}/api/devices/${id}/unpair?userId=${userId}`,
      {},
      this.getHeaders()
    );
  }

  searchDevices(query: string): Observable<any> {
    const userId = this.authService.userId;
    return this.http.get(
      `${environment.baseUrl}/api/devices/search`,
      { ...this.getHeaders(), params: { query, userId: userId || '' } }
    );
  }

  pairDevice(id: string): Observable<any> {
    const userId = this.authService.userId;
    return this.http.patch(
      `${environment.baseUrl}/api/devices/${id}/isPaired?userId=${userId}`,
      {},
      this.getHeaders()
    );
  }

  deleteDeviceById(id: string): Observable<any> {
    const userId = this.authService.userId;
    return this.http.delete(
      `${environment.baseUrl}/api/devices/${id}?userId=${userId}`,
      this.getHeaders()
    );
  }
  // ************************************************ Schedules **********************************************

  createSchedule(body: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/api/schedules/`,
      body,
      this.getHeaders()
    );
  }

  getAllSchedule(): Observable<any> {
    const userId = this.authService.userId;
    return this.http.get(
      `${environment.baseUrl}/api/schedules/${userId}`,
      {
        ...this.getHeaders(),
      
      }
    );
  }

  getScheduleById(id: any): Observable<any> {
    const userId = this.authService.userId;
    return this.http.get(
      `${environment.baseUrl}/api/schedules/${id}/${userId}`,
      this.getHeaders()
    );
  }

  updateSchedule(id: string, data: any): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}/api/schedules/${id}`,
      data,
      this.getHeaders()
    );
  }

  deleteScheduleById(id: any): Observable<any> {
    return this.http.delete(
      `${environment.baseUrl}/api/schedules/deleteById/${id}`,
      this.getHeaders()
    );
  }

  getSchedulesByFilter(filters: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/api/schedules/search`,
      { ...this.getHeaders(), params: filters }
    );
  }

  archiveSchedule(id: string): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}/api/schedules/archives/${id}`,
      {},
      this.getHeaders()
    );
  }

  getArchivedSchedules(): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/api/schedules/archives`,
      this.getHeaders()
    );
  }

  // User management methods
  addUser(body: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/api/users`,
      body,
      this.getHeaders()
    );
  }

  getUsers(): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/api/users`,
      this.getHeaders()
    );
  }

  updateUser(id: string, body: any): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}/api/users/${id}`,
      body,
      this.getHeaders()
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(
      `${environment.baseUrl}/api/users/${id}`,
      this.getHeaders()
    );
  }

  getCurrentUserProfile(): Observable<any> {
    const userId = this.authService.userId;
    return this.http.get(
      `${environment.baseUrl}/api/users/me/${userId}`,
      this.getHeaders()
    );
  }

  updateProfile(body: any): Observable<any> {
    return this.http.patch(
      `${environment.baseUrl}/api/users/profile`,
      body,
      this.getHeaders()
    );
  }

  createClient(userData: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/api/users/Create-client`,
      userData,
      this.getHeaders()
    );
  }

  toggleUserStatus(userId: string): Observable<any> {
    return this.http.patch(
      `${environment.baseUrl}/api/users/clients/${userId}/toggle-status`,
      {},
      this.getHeaders()
    );
  }

  resetUserAccount(data: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/api/users/reset-account-by-admin`,
      data,
      this.getHeaders()
    );
  }

  changeUserRole(userId: string, role: string): Observable<any> {
    return this.http.patch(
      `${environment.baseUrl}/api/users/clients/${userId}/role`,
      { role },
      this.getHeaders()
    );
  }

  getUserWithVideos(userId: string): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/api/users/${userId}/videos`,
      this.getHeaders()
    );
  }

  uploadVideo(formData: FormData): Observable<any> {
    const progressSubject = new Subject<any>();
    
    // Get the authentication token
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      progressSubject.error({ success: false, message: 'Authentication token not found' });
      return progressSubject.asObservable();
    }
    
    // Create a new XMLHttpRequest for the form data upload
    const xhr = new XMLHttpRequest();
    
    // Open a POST request to the upload endpoint
    xhr.open('POST', `${environment.baseUrl}/api/cloudinary-advertisements/upload-with-progress`, true);
    
    // Set the authorization header
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    
    // Set up progress tracking
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round(100 * (event.loaded / event.total));
        progressSubject.next({
          progress: progress,
          bytesUploaded: event.loaded,
          totalBytes: event.total
        });
      }
    };
    
    // Handle XHR response
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          progressSubject.next({
            ...response,
            progress: 100
          });
          progressSubject.complete();
        } catch (error) {
          progressSubject.error({ 
            success: false, 
            message: 'Failed to parse server response'
          });
        }
      } else {
        // Handle HTTP error
        let errorMessage = 'Upload failed';
        
        try {
          const response = JSON.parse(xhr.responseText);
          errorMessage = response.message || errorMessage;
        } catch (e) {
          // If we can't parse the response, use the status text
          errorMessage = `Upload failed with status ${xhr.status}: ${xhr.statusText}`;
        }
        
        progressSubject.error({ 
          success: false, 
          message: errorMessage
        });
      }
    };
    
    // Handle XHR errors
    xhr.onerror = () => {
      progressSubject.error({ 
        success: false, 
        message: 'Network error during upload'
      });
    };
    
    // Handle XHR abort
    xhr.onabort = () => {
      progressSubject.error({ 
        success: false, 
        message: 'Upload aborted'
      });
    };
    
    // Send the form data
    xhr.send(formData);
    
    return progressSubject.asObservable();
  }

  processYoutubeVideo(url: string): Observable<{ videoUrl: string }> {
    return this.videoDownloadService.downloadYoutubeVideo(url).pipe(
      map(videoPath => ({ videoUrl: videoPath }))
    );
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/api/users/me`,
      this.getHeaders()
    );
  }

  resetOwnAccount(email: string): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/api/users/reset-account`,
      { email },
      this.getHeaders()
    );
  }

  updateFileContent(fileId: string, content: File | string): Observable<any> {
    const formData = new FormData();
    if (content instanceof File) {
      formData.append('video', content);
    } else {
      formData.append('youtubeUrl', content);
    }
    return this.http.put(`${environment.baseUrl}/api/files/${fileId}/content`, formData);
  }

  // Helper method to generate a unique upload ID
  private generateUploadId(): string {
    return 'upload_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

}
