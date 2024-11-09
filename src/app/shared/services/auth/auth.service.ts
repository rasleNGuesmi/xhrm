import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../../models/auth/LoginRequest';
import { RequestRefreshToken } from '../../models/auth/RefreshTokenRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest) {
    return this.http.post(environment.API_URL_AUTH + '/login/', loginRequest);
  }

  logout(refreshToken: RequestRefreshToken) {
    localStorage.removeItem('access_token');
    return this.http.post(environment.API_URL + '/auth/logout/', {
      refresh_token: refreshToken,
    });
  }

  refreshToken() {
    return this.http.post(environment.API_URL + '/auth/refresh-token/', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
  }
  getAccessToken(): any {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): any {
    return localStorage.getItem('refresh_token');
  }

  setAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }
}
