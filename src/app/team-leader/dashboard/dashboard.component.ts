import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { TeamLeaderService } from '../../shared/services/team-leader/team-leader.service';
import { PresenceService } from '../../shared/services/presence/presence.service';
import {TeamLeaderService} from "../../shared/services/team-leader/team-leader.service";
import {EmployeeService} from "../../shared/services/employee/employee.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean = false;
  user_id: number;
  team_id: number;
  username: any;
  pending_authorization_number: number;
  pending_leave_number: number;
  remote: number;
  office: number;
  absent: number;
  total: number;
  absence_num: number = 0;
  office_num: number = 0;
  remote_num: number = 0;

  list: any[] = [];
  listConnected: any[] = [];
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    // private teamleaderservice: TeamLeaderService,
    private presenceService: PresenceService
  ) { }

  ngOnInit() {
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    console.log("USER_ID: "+this.user_id);
    let team: any = localStorage.getItem('team_id');
    this.team_id = parseInt(team);
    console.log("TEAM_ID: "+this.team_id);
    this.username = localStorage.getItem('username');
    console.log("USERNAME: "+this.username);

    this.getPendingRequests();
    this.getConnectedEmployees();
    this.getTodayBirthday();
    this.getTodayPresence();
    this.getPresence();
    console.log('list', this.list); /* LOG */
  }

  onClick() {
    this.router.navigate(['/team-leader/authorisation']);
  }

  getPendingRequests() {
    return this.employeeService
      .getPandingRequests(this.user_id)
      .subscribe((data: any) => {
        console.log('all notif:', data.results);

        this.pending_leave_number = data.results.pending_leave_number;
        this.pending_authorization_number =
          data.results.pending_authorization_number;
      });
  }
  getConnectedEmployees() {
    return this.employeeService
      .getConnectedEmployees(this.team_id)
      .subscribe((data: any) => {
        this.listConnected = data.results;
        console.log('getConnectedEmployees', data.results);
      });
  }

  getTodayBirthday() {
    return this.employeeService
      .getEmployeesTodayBirthday(this.team_id)
      .subscribe((data: any) => {
        this.list = data.results;
      });
  }
  getTodayPresence() {
    return this.employeeService
      .getTodayPresence(this.team_id)
      .subscribe((data: any) => {
        this.remote = data.results.remote * 100;
        this.office = data.results.office * 100;
        this.absent = data.results.absent * 100;
        this.total = Math.floor(
          (data.results.remote + data.results.office) * 100
        );
        console.log('today:', data.results);
      });
  }
  getPresence() {
    return this.presenceService
      .getPresence(this.user_id)
      .subscribe((data: any) => {
        console.log('presence', data.results);
        this.absence_num = data.results.absence_num;
        this.office_num = data.results.office_num;
        this.remote_num = data.results.remote_num;
      });
  }
}
