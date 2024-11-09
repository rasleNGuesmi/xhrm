import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from '../../shared/services/employee/employee.service';
import { DepartmentService } from '../../shared/services/department/department.service';
import { TeamService } from '../../shared/services/team/team.service';
import { Employee } from '../../shared/models/employee';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../../shared/services/position/position.service';
import { RoleService } from '../../shared/services/role/role.service';
import { ToastrService } from 'ngx-toastr';
import { ManagerService } from '../../shared/services/manager/manager.service';
import { AccountantService } from '../../shared/services/accountant/accountant.service';

@Component({
  selector: 'app-profile-employee',
  templateUrl: './profile-employee.component.html',
  styleUrls: ['./profile-employee.component.scss'],
})
export class ProfileEmployeeComponent implements OnInit {
  file: string = '';
  avatar: any;
  first_name: string;
  username: string;
  last_name: string;
  gender: string;
  birth_date: Date;
  email: string;
  contact: string;
  address: string;
  maritalStatus: string;
  team: number;
  role: string;
  department: number;
  position: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  discord: string;
  joinDate: string;
  departments: any[];
  teams: any[];
  positions: any[];
  roles: any[] = [
    { name: 'Employé(e)', value: 'employee' },
    { name: 'Manager', value: 'manager' },
    { name: 'Comptable', value: 'accountant' },
  ];
  disabled: boolean = false;
  enterprise_id: number;
  employee_id: number;
  position_name: string;
  role_employee: any;
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private managerService: ManagerService,
    private accountantService: AccountantService,
    private departmentService: DepartmentService,
    private teamService: TeamService,
    private positionService: PositionService,
    private roleService: RoleService,
    private toastr: ToastrService
  ) {
    this.route.queryParams.subscribe(params => {
      this.employee_id = params['id'];
      this.role_employee = params['role'];
    });
    this.translate = translate;
  }
  genreList: any[] = [
    { id: 'MALE', name: 'Male' },
    { id: 'FEMALE', name: 'Female' },
  ];
  maritalStatusList: any[] = [
    { id: 'Single', name: 'Célébataire' },
    { id: 'Married', name: 'Marié(e)' },
  ];
  getIdDepartment(event: any) {
    this.getTeam(event);
    this.disabled = true;
  }
  ngOnInit(): void {
    this.getEmployee(this.employee_id);
    let idE: any = localStorage.getItem('entreprise_id');
    this.enterprise_id = parseInt(idE);
    this.getDep(this.enterprise_id);
    this.getPositions(this.enterprise_id);
    // this.getRoles();
  }
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = event => {
        this.avatar = event.target?.result;
      };
    }
  }

  getEmployee(id: number) {
    switch (this.role_employee) {
      case 'employee': {
        this.employeeService.getEmployee(id).subscribe((data: any) => {
          this.first_name = data.results.first_name;
          this.last_name = data.results.last_name;
          this.gender = data.results.gender;
          this.contact = data.results.contact;
          this.address = data.results.address;
          this.email = data.results.email;
          this.position = data.results.position.id;
          this.birth_date = data.results.birth_date;
          this.role = 'employee';
          this.username = data.results.username;
          this.department = data.results.team.department.department_id;
          this.team = data.results.team.team_id;
          this.facebook = data.results.social_media.facebook;
          this.twitter = data.results.social_media.twitter;
          this.linkedin = data.results.social_media.linkedin;
          this.discord = data.results.social_media.discord;
          this.maritalStatus = data.results.maritalStatus;
          this.position_name = this.getPositionNameById(this.position);
          const date = new Date(data.results.joinDate);
          const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          };
          const formattedDate = new Intl.DateTimeFormat(
            'fr-FR',
            options
          ).format(date);
          this.joinDate = formattedDate;
          this.birth_date = data.results.birth_date;
          console.log('data employee:', data.results);
        });
        break;
      }
      case 'manager': {
        this.managerService.getManager(id).subscribe((data: any) => {
          this.first_name = data.results.first_name;
          this.last_name = data.results.last_name;
          this.gender = data.results.gender;
          this.contact = data.results.contact;
          this.address = data.results.address;
          this.email = data.results.email;
          this.birth_date = data.results.birth_date;
          this.position_name = 'Manager';
          this.role = 'manager';
          this.username = data.results.username;
          this.department = data.results.department.department_id;
          this.facebook = data.results.social_media.facebook;
          this.twitter = data.results.social_media.twitter;
          this.linkedin = data.results.social_media.linkedin;
          this.discord = data.results.social_media.discord;
          this.maritalStatus = data.results.maritalStatus;
          const date = new Date(data.results.joinDate);
          const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          };
          const formattedDate = new Intl.DateTimeFormat(
            'fr-FR',
            options
          ).format(date);
          this.joinDate = formattedDate;
          this.birth_date = data.results.birth_date;
          console.log('data manager:', data.results);
        });
        break;
      }
      case 'accountant': {
        this.accountantService.getAccountant(id).subscribe((data: any) => {
          this.first_name = data.results.first_name;
          this.last_name = data.results.last_name;
          this.gender = data.results.gender;
          this.contact = data.results.contact;
          this.address = data.results.address;
          this.email = data.results.email;
          this.birth_date = data.results.birth_date;
          this.position_name = 'Comptable';

          this.role = 'accountant';
          this.username = data.results.username;
          this.facebook = data.results.social_media.facebook;
          this.twitter = data.results.social_media.twitter;
          this.linkedin = data.results.social_media.linkedin;
          this.discord = data.results.social_media.discord;
          this.maritalStatus = data.results.maritalStatus;
          const date = new Date(data.results.joinDate);
          const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          };
          const formattedDate = new Intl.DateTimeFormat(
            'fr-FR',
            options
          ).format(date);
          this.joinDate = formattedDate;
          this.birth_date = data.results.birth_date;
          console.log('data accountant:', data.results);
        });
        break;
      }
    }
  }

  getDep(enterprise_id: number) {
    this.departmentService
      .GetListDepartment(enterprise_id)
      .subscribe((data: any) => {
        this.departments = data.results;
      });
  }
  getPositions(enterprise_id: number) {
    this.positionService
      .GetListPositions(enterprise_id)
      .subscribe((data: any) => {
        this.positions = data.results;
      });
  }
  /*getRoles() {
    this.roleService.getRoles().subscribe((data: any) => {
      this.roles = data.results;
    });
  }*/
  getTeam(department_id: number) {
    this.teamService.GetListTeam(department_id).subscribe((data: any) => {
      this.teams = data.results;
    });
  }
  onClick() {
    let employee: Employee = {
      avatar: this.avatar,
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username,
      gender: this.gender,
      email: this.email,
      address: this.address,
      contact: this.contact,
      maritalStatus: this.maritalStatus,
      department: this.department,
      team: this.team,
      birth_date: this.birth_date,
      position: this.position,
      social_media: {
        discord: this.discord,
        facebook: this.facebook,
        linkedin: this.linkedin,
        twitter: this.twitter,
      },
    };
    console.log('update employee:', employee);
    this.updateEmployee(employee, this.employee_id);
  }
  updateEmployee(employee: Employee, id: number) {
    switch (this.role_employee) {
      case 'employee': {
        this.employeeService.updateEmployee(id, employee).subscribe(
          (data: any) => {
            if (data.success) {
              this.getEmployee(this.employee_id);
              this.toastr.success('Profil employé mise à jour avec succès!');
            }
          },
          (error: any) => {
            this.toastr.error('Veuillez vérifier vos champs');
            console.error(error);
          }
        );
        break;
      }
      case 'manager': {
        this.managerService.updateManager(id, employee).subscribe(
          (data: any) => {
            if (data.success) {
              this.getEmployee(this.employee_id);
              this.toastr.success('Profil manager mise à jour avec succès!');
            }
          },
          (error: any) => {
            this.toastr.error('Veuillez vérifier vos champs');
            console.error(error);
          }
        );
        break;
      }
      case 'accountant': {
        this.accountantService.updateAccountant(id, employee).subscribe(
          (data: any) => {
            if (data.success) {
              this.getEmployee(this.employee_id);
              this.toastr.success('Profil comptable mise à jour avec succès!');
            }
          },
          (error: any) => {
            this.toastr.error('Veuillez vérifier vos champs');
            console.error(error);
          }
        );
        break;
      }
    }
  }
  getPositionNameById(positionId: any): string {
    const position = this.positions.find((p: any) => p.id === positionId);
    return position.position_name;
  }
}
