import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Admin } from '../models/admin';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${environment.ADMIN_URL}/add/`, admin);
  }
}
