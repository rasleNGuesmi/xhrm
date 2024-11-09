import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  constructor(private http: HttpClient) {}

  getPresence(id: number) {
    return this.http.get(
      environment.EMPLOYEE_URL + '/get-month-work-days-count/' + id + '/'
    );
  }
}
