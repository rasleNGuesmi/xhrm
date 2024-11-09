import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../models/employee';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  createEmployee(employee: Employee) {
    return this.http.post(environment.EMPLOYEE_URL + '/add/', employee);
  }
  getEmployees(enterprise_id: number) {
    return this.http.get(
      environment.ENTERPRISE_URL + '/get-all-employees/' + enterprise_id + '/'
    );
  }
  getEmployeesPresence(enterprise_id: number) {
    return this.http.get(
      environment.ENTERPRISE_URL +
        '/get-all-employees-presence/' +
        enterprise_id +
        '/'
    );
  }
  listEmployeesPresence() {
    return this.http.get(
      environment.ENTERPRISE_URL +
      '/list-all-employees-presence/'
    );
  }
  getEmployeesPresenceByDepartment(department_id: number) {
    return this.http.get(
      environment.DEPARTMENT_URL +
      '/get-all-employees-presence/' +
      department_id +
      '/'
    );
  }
  getEmployeesByTeam(team_id: number) {
    return this.http.get(
      environment.TEAM_URL + '/get-team-colleague-employees/' + team_id + '/'
    );
  }
  getEmployeeByDepartment(department_id: number) {
    return this.http.get(
      environment.DEPARTMENT_URL + '/get-employees/' + department_id + '/'
    );
  }
  getEmployee(id: number) {
    return this.http.get(environment.EMPLOYEE_URL + '/retrieve/' + id + '/');
  }
  updateEmployee(id: number, employee: Employee) {
    return this.http.put(
      environment.EMPLOYEE_URL + '/update/' + id + '/',
      employee
    );
  }
  deleteEmployee(id: number) {
    return this.http.delete(environment.EMPLOYEE_URL + '/delete/' + id + '/');
  }
  getPandingRequests(id: number) {
    return this.http.get(
      environment.EMPLOYEE_URL + '/get-pending-requests/' + id + '/'
    );
  }
  //TODO FOR DEPARTMENT V
  getConnectedEmployees(id_employee: number) {
    return this.http.get(
      environment.TEAM_URL + '/get-connected-employees/' + id_employee + '/'
    );
  }
  //TODO USE
  getConnectedEmployeesByDepartment(department_id: number) {
    return this.http.get(
      environment.DEPARTMENT_URL + '/get-connected-employees/' + department_id + '/'
    );
  }

  //TODO FOR DEPARTMENT V
  getEmployeesTodayBirthday(id_employee: number) {
    return this.http.get(
      environment.TEAM_URL +
        '/get-employees-today-birthday/' +
        id_employee +
        '/'
    );
  }
  //TODO USE
  getEmployeesTodayBirthdayByDepartment(department_id: number) {
    return this.http.get(
      environment.DEPARTMENT_URL +
      '/get-today-birthdays/' +
      department_id +
      '/'
    );
  }
  //TODO FOR DEPARTMENT V
  getTodayPresence(team_id: number) {
    return this.http.get(
      environment.TEAM_URL + '/get-today-presence-rate/' + team_id + '/'
    );
  }
  //TODO USE
  getTodayPresenceByDepartment(department_id: number) {
    return this.http.get(
      environment.DEPARTMENT_URL + '/get-today-presence-rate/' + department_id + '/'
    );
  }

  retrieveAllEmployees() {
    return this.http.get(
      environment.EMPLOYEE_URL + '/list-all-employees/'
    );
  }
}
