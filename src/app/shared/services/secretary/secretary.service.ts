import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Employee} from "../../models/employee";

@Injectable({
  providedIn: 'root'
})
export class SecretaryService {
  constructor(private http: HttpClient) { }

  getSecretary(id: number) {
    return this.http.get(environment.SECRETARY_URL + '/retrieve/' + id + '/');
  }
  updateSecretary(id: number, employee: Employee) {
    return this.http.put(
      environment.SECRETARY_URL + '/update/' + id + '/',
      employee
    );
  }
  getAllSecretaries(enterprise_id: number) {
    return this.http.get(
      // TODO IMPLEMENT IN BACKEND
      environment.ENTERPRISE_URL + '/get-secretaries/' + enterprise_id + '/'
    );
  }
  deleteSecretary(id: number) {
    return this.http.delete(environment.SECRETARY_URL + '/delete/' + id + '/');
  }
}
