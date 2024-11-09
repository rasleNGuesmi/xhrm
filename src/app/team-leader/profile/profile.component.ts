import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../shared/services/employee/employee.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
// import {Employee} from "../../shared/models/employee";
import {TeamLeaderService} from "../../shared/services/team-leader/team-leader.service";
import {TeamLeader} from "../../shared/models/team-leader";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  team_id: number;
  username: string;
  avatar: string;
  name: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  contact: string;
  email: string;
  address: string;
  maritalStatus: string;
  // department: string;
  team: string;
  // position: string;
  role: string;
  gender: string;
  joinDate: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  discord: string;

  file: string = '';
  user_id: number;
  maritalStatusList: any[] = [
    { id: 'Single', name: 'Célébataire' },
    { id: 'Married', name: 'Marié(e)' },
  ];
  genreList: any[] = [
    { id: 'MALE', name: 'Male' },
    { id: 'FEMALE', name: 'Female' },
  ];
  constructor(
    private employeeservice: EmployeeService,
    private teamLeaderService: TeamLeaderService,
    private _formBuilder: FormBuilder,
    private translate: TranslateService,
    private toastr: ToastrService
  ) {
    this.translate = translate;
  }
  userInformationForm: FormGroup;
  usersocialmedia: FormGroup;

  ngOnInit(): void {
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    let team: any = localStorage.getItem('team_id');
    this.team_id = parseInt(team);
    this.getTeamLeader();
    this.getConnectedEmployees();
    this.getTodayBirthday();
    this.getTodayPresence();
  }

  url: any;
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = event => {
        this.url = event.target?.result;
      };
    }
  }
  getTeamLeader () {
    return this.teamLeaderService
      .getTeamLeader(this.user_id)
      .subscribe((data: any) => {
        console.log('get employee:', data.results);
        this.avatar = data.results.avatar;
        this.username = data.results.username;
        this.name = data.results.first_name + ' ' + data.results.last_name;
        this.first_name = data.results.first_name;
        this.last_name = data.results.last_name;
        // this.position = data.results.position.position_name;
        this.address = data.results.address;
        this.email = data.results.email;
        this.contact = data.results.contact;
        this.team = data.results.team.team_name;
        const date = new Date(data.results.joinDate);
        const options: Intl.DateTimeFormatOptions = {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        };
        const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(
          date
        );
        this.joinDate = formattedDate;
        this.birth_date = data.results.birth_date;
        this.gender = data.results.gender;
        //this.department = data.results.team.department.department_name;
        this.facebook = data.results.social_media.facebook;
        this.twitter = data.results.social_media.twitter;
        this.discord = data.results.social_media.discord;
        this.linkedin = data.results.social_media.linkedin;
      });
  }
  onClick() {
    let teamLeader: TeamLeader = {
      username: this.username,
      avatar: this.avatar,
      first_name: this.first_name,
      last_name: this.last_name,
      gender: this.gender,
      email: this.email,
      address: this.address,
      contact: this.contact,
      maritalStatus: this.maritalStatus,
      birth_date: this.birth_date,
      social_media: {
        discord: this.discord,
        facebook: this.facebook,
        linkedin: this.linkedin,
        twitter: this.twitter,
      },
    };
    console.log('update employee:', teamLeader);
    this.updateTeamLeader(teamLeader, this.user_id);
  }
  updateTeamLeader(teamLeader: TeamLeader, id: number) {
    console.log('id', id);
    this.teamLeaderService.updateTeamLeader(id, teamLeader).subscribe(
      (data: any) => {
        if (data.success) {
          this.getTeamLeader();
          this.toastr.success('Profil mis à jour avec succès!');
        }
      },
      (error: any) => {
        this.toastr.error('Veuillez vérifier vos champs');
        console.error(error);
      }
    );
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
      });
  }
  remote: number;
  office: number;
  getTodayPresence() {
    return this.employeeservice
      .getTodayPresence(this.team_id)
      .subscribe((data: any) => {
        this.remote = data.results.remote * 100;
        this.office = data.results.office * 100;
        console.log('today:', data.results);
      });
  }
}
