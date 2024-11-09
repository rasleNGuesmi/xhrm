import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../shared/services/employee/employee.service';
import { environment } from '../../../environments/environment';
import { PresenceService } from '../../shared/services/presence/presence.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isAdmin = false;
  user_id: number;
  team_id: number;
  username: any;
  pending_authorization_number: number;
  pending_leave_number: number;
  remote: number;
  office: number;
  absent: number;
  total: number;
  constructor(
    private router: Router,
    private employeeservice: EmployeeService,
    private presenceService: PresenceService
  ) {}
  absence_num: number = 0;
  office_num: number = 0;
  remote_num: number = 0;
  onClick() {
    this.router.navigate(['/employee/authorisation']);
  }

  ngOnInit(): void {
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    let team: any = localStorage.getItem('team_id');
    this.team_id = parseInt(team);
    this.username = localStorage.getItem('username');

    this.getConnectedEmployees();
    this.getTodayBirthday();
    this.getTodayPresence();
    this.getPresence();
    this.getPandingRequests();
    console.log('list', this.list);
  }

  getConnectedEmployees() {
    return this.employeeservice
      .getConnectedEmployees(this.team_id)
      .subscribe((data: any) => {
        this.listConnected = data.results;
        console.log('getConnectedEmployees', data.results);
      });
  }
  list: any[] = [];
  listConnected: any[] = [];
  getTodayBirthday() {
    return this.employeeservice
      .getEmployeesTodayBirthday(this.team_id)
      .subscribe((data: any) => {
        this.list = data.results;
        console.log('annif lyoum:', data.results);
      });
  }
  getTodayPresence() {
    return this.employeeservice
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
        console.log('aka l7esba', data.results);
        this.absence_num = data.results.absence_num;
        this.office_num = data.results.office_num;
        this.remote_num = data.results.remote_num;
      });
  }
  getPandingRequests() {
    return this.employeeservice
      .getPandingRequests(this.user_id)
      .subscribe((data: any) => {
        console.log('all notif:', data.results);

        this.pending_leave_number = data.results.pending_leave_number;
        this.pending_authorization_number =
          data.results.pending_authorization_number;
      });
  }
}
