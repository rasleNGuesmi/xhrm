import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { team } from '../../models/team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) {}
  createTeam(team: team) {
    return this.http.post(environment.TEAM_URL + '/add/', team);
  }
  GetListTeam(id: number) {
    return this.http.get(environment.TEAM_URL + '/list/?department=' + id);
  }
}
