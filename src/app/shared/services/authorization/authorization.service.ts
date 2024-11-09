import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Authorization } from '../../models/authorization';
import { Leave } from '../../models/leave';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private http: HttpClient) {}

  createAuthorization(authorization: Authorization) {
    return this.http.post(
      environment.AUTHORIZATION_REQUEST_URL + '/add/',
      authorization
    );
  }
  // TODO BY DEPARTMENT
  GetListAuthorization(id: number) {
    return this.http.get(
      environment.ENTERPRISE_URL + '/get-authorization-requests/' + id + '/'
    );
  }
  // TODO DOING
  getListAuthorizationByDepartment(id: number) {
    return this.http.get(
      environment.DEPARTMENT_URL + '/get-authorization-requests/' + id + '/'
    );
  }
  getAuthorizationsByEmployee(id: number) {
    return this.http.get(
      environment.EMPLOYEE_URL + '/authorization-requests/' + id + '/'
    );
  }
  updateAuthorization(id: number, authorization: Authorization) {
    return this.http.put(
      environment.AUTHORIZATION_REQUEST_URL + '/update/' + id + '/',
      authorization
    );
  }
  deleteAuthorization(id: number) {
    return this.http.delete(
      environment.AUTHORIZATION_REQUEST_URL + '/delete/' + id + '/'
    );
  }
  acceptAuthorization(id: number, authorization: Authorization) {
    return this.http.put(
      environment.AUTHORIZATION_REQUEST_URL + '/accept/' + id + '/',
      authorization
    );
  }
  rejectAuthorization(id: number, authorization: Authorization) {
    return this.http.put(
      environment.AUTHORIZATION_REQUEST_URL + '/reject/' + id + '/',
      authorization
    );
  }
  listAuthorizationRequests() {
    return this.http.get(
      environment.AUTHORIZATION_REQUEST_URL + '/list/'
    );
  }
}
