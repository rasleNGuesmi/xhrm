import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../models/employee';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(private http: HttpClient) {}

  getManager(id: number) {
    return this.http.get(environment.MANAGER_URL + '/retrieve/' + id + '/');
  }
  updateManager(id: number, employee: Employee) {
    return this.http.put(
      environment.MANAGER_URL + '/update/' + id + '/',
      employee
    );
  }
  getAllManagers(enterprise_id: number) {
    return this.http.get(
      environment.ENTERPRISE_URL + '/get-managers/' + enterprise_id + '/'
    );
  }
  deleteManager(id: number) {
    return this.http.delete(environment.MANAGER_URL + '/delete/' + id + '/');
  }
}
