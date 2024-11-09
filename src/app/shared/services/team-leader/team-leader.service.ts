import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TeamLeader } from '../../models/team-leader';
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeamLeaderService {
  constructor(private http: HttpClient) { }

  getTeamLeader(id: number) {
    return this.http.get(environment.TEAM_LEADER_URL + '/retrieve/' + id + '/');
  }
  updateTeamLeader(id: number, teamLeader: TeamLeader) {
    return this.http.put(
      environment.TEAM_LEADER_URL + '/update/' + id + '/',
      teamLeader
    );
  }
  getAllTeamLeaders(enterprise_id: number) {
    return this.http.get(
      environment.ENTERPRISE_URL + '/get-team-leaders/' + enterprise_id + '/'
    );
  }
  deleteTeamLeader(id: number) {
    return this.http.delete(environment.TEAM_LEADER_URL + '/delete/' + id + '/');
  }
}
