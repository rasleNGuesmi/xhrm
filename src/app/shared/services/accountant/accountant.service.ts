import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Employee } from '../../models/employee';

@Injectable({
  providedIn: 'root',
})
export class AccountantService {
  constructor(private http: HttpClient) {}
  getAccountant(id: number) {
    return this.http.get(environment.ACCOUNTANT_URL + '/retrieve/' + id + '/');
  }
  updateAccountant(id: number, employee: Employee) {
    return this.http.put(
      environment.ACCOUNTANT_URL + '/update/' + id + '/',
      employee
    );
  }
  deleteAccountant(id: number) {
    return this.http.delete(environment.ACCOUNTANT_URL + '/delete/' + id + '/');
  }
}
