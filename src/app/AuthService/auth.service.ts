import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environnement/enivronement';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  login(body: any){
    return this.http.post(`${environment.baseUrl}/api/auth/login`, body);
  }
}
