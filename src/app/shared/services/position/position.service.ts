import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Position } from '../../models/position';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  constructor(private http: HttpClient) {}
  createPosition(position: Position) {
    return this.http.post(environment.POSITION_URL + '/add/', position);
  }
  GetListPositions(id: number) {
    return this.http.get(
      environment.ENTERPRISE_URL + '/get-positions/' + id + '/'
    );
  }
  getPositionsEmployee(id: number) {
    return this.http.get(
      environment.EMPLOYEE_URL + '/get-enterprise-positions/' + id + '/'
    );
  }
  getPositionsManager(id: number) {
    return this.http.get(
      environment.MANAGER_URL + '/get-enterprise-positions/' + id + '/'
    );
  }
  getPositionsHr(id: number) {
    return this.http.get(
      environment.HR_URL + '/get-enterprise-positions/' + id + '/'
    );
  }
}
