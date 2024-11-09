import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Leave } from '../../models/leave';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  constructor(private http: HttpClient) {}

  createLeave(leave: Leave) {
    return this.http.post(environment.LEAVE_REQUEST_URL + '/add/', leave);
  }
  // TODO BY DEPARTMENT
  GetListLeave(id: number) {
    return this.http.get(
      environment.ENTERPRISE_URL + '/get-leave-requests/' + id + '/'
    );
  }
  // TODO DOING
  getListLeaveByDepartment(id: number) {
    return this.http.get(
      environment.DEPARTMENT_URL + '/get-leave-requests/' + id + '/'
    );
  }
  getLeavesByEmployee(user_id: number) {
    return this.http.get(
      environment.EMPLOYEE_URL + '/leave-requests/' + user_id
    );
  }
  updateLeave(id: number, leave: Leave) {
    return this.http.put(
      environment.LEAVE_REQUEST_URL + '/update/' + id + '/',
      leave
    );
  }
  deleteLeave(id: number) {
    return this.http.delete(
      environment.LEAVE_REQUEST_URL + '/delete/' + id + '/'
    );
  }
  acceptLeave(id: number, leave: Leave) {
    return this.http.put(
      environment.LEAVE_REQUEST_URL + '/accept/' + id + '/',
      leave
    );
  }
  rejectLeave(id: number, leave: Leave) {
    return this.http.put(
      environment.LEAVE_REQUEST_URL + '/reject/' + id + '/',
      leave
    );
  }
  getOverView(id: number) {
    return this.http.get(
      environment.ENTERPRISE_URL + '/get-global-leave-auth/' + id + '/'
    );
  }
  getTechOverview() {
    return this.http.get(
      environment.ENTERPRISE_URL + '/get-tech-global-leave-auth/'
    );
  }
  getOverViewByDepartment(id: number) {
    return this.http.get(
      environment.DEPARTMENT_URL + '/get-global-leave-auth/' + id + '/'
    );
  }
  getLeaveDaysLeft(id: number) {
    return this.http.get(
      environment.EMPLOYEE_URL + '/get-leave-days-left/' + id + '/'
    );
  }
  getLeaveDaysLeftManager(id: number) {
    return this.http.get(
      environment.MANAGER_URL + '/get-leave-days-left/' + id + '/'
    );
  }
  listAllLeaveRequests() {
    return this.http.get(
      environment.LEAVE_REQUEST_URL + '/list/'
    );
  }
}
