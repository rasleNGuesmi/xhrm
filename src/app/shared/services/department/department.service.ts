import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { department } from '../../models/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}
  createDepartment(department: department) {
    return this.http.post(environment.DEPARTMENT_URL + '/add/', department);
  }
  GetListDepartment(id: number) {
    return this.http.get(
      environment.DEPARTMENT_URL + '/list/?enterprise=' + id
    );
  }
  getTodayBirthday(department_id: number) {
    return this.http.get(
      environment.DEPARTMENT_URL + '/get-today-birthdays/' + department_id + '/'
    );
  }
  getConnectedEmployees(department_id: number) {
    return this.http.get(
      environment.DEPARTMENT_URL +
        '/get-connected-employees/' +
        department_id +
        '/'
    );
  }
  getTodayPresence(department_id: number) {
    return this.http.get(
      environment.DEPARTMENT_URL +
        '/get-today-presence-rate/' +
        department_id +
        '/'
    );
  }
}
