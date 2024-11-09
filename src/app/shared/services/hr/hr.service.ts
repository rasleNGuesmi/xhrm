import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Employee} from "../../models/employee";

@Injectable({
  providedIn: 'root'
})
export class HrService {
  constructor(private http: HttpClient) { }

  getHr(id: number) {
    return this.http.get(environment.HR_URL + '/retrieve/' + id + '/');
  }
  updateHr(id: number, employee: Employee) {
    return this.http.put(
      environment.HR_URL + '/update/' + id + '/',
      employee
    );
  }
  getAllHrs(enterprise_id: number) {
    return this.http.get(
      environment.ENTERPRISE_URL + '/get-hrs/' + enterprise_id + '/'
    );
  }
  deleteHr(id: number) {
    return this.http.delete(environment.HR_URL + '/delete/' + id + '/');
  }
}
