import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { enterprise } from '../../models/enterprise';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  getAdminByUsername() {
    return this.http.get(
      environment.ADMIN_URL +
        '/get-by-username/' +
        localStorage.getItem('username')
    );
  }
  getAdminByUsernameTech(username: string) {
    return this.http.get(
      environment.ADMIN_URL +
      '/get-by-username/' +
      username
    );
  }
  getSecretaryByUsername() {
    return this.http.get(
      environment.SECRETARY_URL +
      '/get-by-username/' +
      localStorage.getItem('username')
    );
  }
  updateEntreprise(enterprise: enterprise, enterprise_id: number) {
    return this.http.put(
      environment.ENTERPRISE_URL + '/update/' + enterprise_id + '/',
      enterprise
    );
  }
  getTotalPendings(enterprise_id: number) {
    return this.http.get(
      environment.ENTERPRISE_URL + '/get-total-pendings/' + enterprise_id + '/'
    );
  }
  getTodayPresence(enterprise_id: number) {
    return this.http.get(
      environment.ENTERPRISE_URL +
        '/get-today-presence-rate/' +
        enterprise_id +
        '/'
    );
  }
  getTodayBirthday(enterprise_id: number) {
    return this.http.get(
      environment.ENTERPRISE_URL +
        '/get-employees-today-birthday/' +
        enterprise_id +
        '/'
    );
  }
  getConnectedEmployees(enterprise_id: number) {
    return this.http.get(
      environment.ENTERPRISE_URL +
        '/get-connected-employees/' +
        enterprise_id +
        '/'
    );
  }
}
