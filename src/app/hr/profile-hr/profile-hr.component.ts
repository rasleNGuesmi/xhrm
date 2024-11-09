import { Component, OnInit } from '@angular/core';
import {ManagerService} from "../../shared/services/manager/manager.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {EmployeeService} from "../../shared/services/employee/employee.service";
import {DepartmentService} from "../../shared/services/department/department.service";
import {Employee} from "../../shared/models/employee";
import {HrService} from "../../shared/services/hr/hr.service";

@Component({
  selector: 'app-profile-hr',
  templateUrl: './profile-hr.component.html',
  styleUrls: ['./profile-hr.component.scss']
})
export class ProfileHrComponent implements OnInit {
  department_id: number;

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
  department: string;
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
    private hrService: HrService,
    private _formBuilder: FormBuilder,
    private translate: TranslateService,
    private toastr: ToastrService,
    private employeeservice: EmployeeService,
    private departmentService: DepartmentService,
  ) {
    this.translate = translate;
  }
  userInformationForm: FormGroup;
  usersocialmedia: FormGroup;

  ngOnInit(): void {
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    let dep: any = localStorage.getItem('department_id');
    this.department_id = parseInt(dep);
    this.getEmployee();
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
  getEmployee() {
    return this.hrService
      .getHr(this.user_id)
      .subscribe((data: any) => {
        /* TODO REMOVE */
        console.log('get employee:', data.results);
        this.avatar = data.results.avatar;
        this.username = data.results.username;
        this.name = data.results.first_name + ' ' + data.results.last_name;
        this.first_name = data.results.first_name;
        this.last_name = data.results.last_name;
        this.email = data.results.email;
        this.maritalStatus = data.results.maritalStatus;
        this.contact = data.results.contact;
        this.address = data.results.address;
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
        this.department = data.results.department.department_name;
        this.facebook = data.results.social_media.facebook;
        this.twitter = data.results.social_media.twitter;
        this.discord = data.results.social_media.discord;
        this.linkedin = data.results.social_media.linkedin;
      });
  }
  onClick() {
    let employee: Employee = {
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
      department: this.department_id,
      social_media: {
        discord: this.discord,
        facebook: this.facebook,
        linkedin: this.linkedin,
        twitter: this.twitter,
      },
    };
    /* TODO REMOVE */
    console.log('update employee:', employee);
    this.updateEmployee(employee, this.user_id);
  }
  updateEmployee(employee: Employee, id: number) {
    console.log('id', id);
    // TODO CHANGE TO HR
    //this.managerService.updateManager(id, employee).subscribe(
    // TODO DOING
    this.hrService.updateHr(id, employee).subscribe(
      (data: any) => {
        if (data.success) {
          this.getEmployee();
          this.toastr.success('Profil employé (hr) mise à jour avec succès!');
        }
      },
      (error: any) => {
        this.toastr.error('Veuillez vérifier vos champs');
        console.error(error);
      }
    );
  }
  getConnectedEmployees() {
    return this.departmentService
      .getConnectedEmployees(this.department_id)
      .subscribe((data: any) => {
        this.listConnected = data.results;
        console.log('getConnectedEmployees', data.results);
      });
  }
  list: any[] = [];
  listConnected: any[] = [];
  getTodayBirthday() {
    return this.departmentService
      .getTodayBirthday(this.department_id)
      .subscribe((data: any) => {
        this.list = data.results;
      });
  }
  remote: number;
  office: number;
  getTodayPresence() {
    return this.departmentService
      .getTodayPresence(this.department_id)
      .subscribe((data: any) => {
        this.remote = data.results.remote * 100;
        this.office = data.results.office * 100;
        console.log('today:', data.results);
      });
  }
}
