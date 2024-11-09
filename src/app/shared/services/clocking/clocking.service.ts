import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Clocking } from '../../models/clocking';

@Injectable({
  providedIn: 'root',
})
export class ClockingService {
  constructor(private http: HttpClient) {}
  clockIn(clocking: Clocking) {
    return this.http.post(environment.CLOCKING_URL + '/add/', clocking);
  }
  getLastClock(id: number) {
    return this.http.get(
      environment.EMPLOYEE_URL + '/get-today-last-clocking/' + id + '/'
    );
  }
  getAllClockIn(id: number, year: number) {
    return this.http.get(
      environment.EMPLOYEE_URL +
        '/get-clockins-by-year/' +
        id +
        '/' +
        year +
        '/'
    );
  }
}
