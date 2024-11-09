import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Admin} from "../../shared/models/admin";
import {AdminService} from "../../shared/services/admin/admin.service";
import {AuthService} from "../../shared/services/auth/auth.service";
import {DepartmentService} from "../../shared/services/department/department.service";
import {TeamService} from "../../shared/services/team/team.service";
import {PositionService} from "../../shared/services/position/position.service";
import {RoleService} from "../../shared/services/role/role.service";
import {ToastrService} from "ngx-toastr";
import {Position} from "../../shared/models/position";
import {team} from "../../shared/models/team";
import {department} from "../../shared/models/department";
import {enterprise} from "../../shared/models/enterprise";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tech-profile-enterprise',
  templateUrl: './tech-profile-enterprise.component.html',
  styleUrls: ['./tech-profile-enterprise.component.scss']
})
export class TechProfileEnterpriseComponent implements OnInit {
  'admin_name' = '';
  // TODO CHECK listConnected: any[] = [];
  list: any[] = []; // TODO CHECK
  totalLeave: any;
  // TODO CHECK REMOTE OFFICE ABSENT
  file: string = '';
  enterprise_name: string;
  email: string;
  phone: number;
  activity: string;
  employees_number: number;
  'working_hours_end': number;
  'working_hours_start': number;
  selectedEmployeesCount: string;
  leave_days_number: number;
  saturday_off: boolean = false;
  sunday_off: boolean = false;
  friday_off: boolean = false;
  enterprise_id: number;
  department_id: number;
  disable: boolean = false;
  constructor(
    private translate: TranslateService,
    private adminService: AdminService,
    private authService: AuthService,
    private departmentService: DepartmentService,
    private teamService: TeamService,
    private positionService: PositionService,
    private roleService: RoleService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {
    // TODO GET ENTERPRISE_ID FROM ROUTE
    this.route.queryParams.subscribe(params => {
      this.enterprise_id = params['id'];
      this.admin_name = params['username'];
      // console.log("ADMIN_NAME: ", this.admin_name);
    });
    this.translate = translate;
  }
  ngOnInit(): void {
    console.log("ADMIN_NAME", this.admin_name);
    this.getAdmin();
    this.getDep(this.enterprise_id);
    this.getPositions(this.enterprise_id);
    // this.getRoles();
  }
  url: any;
  // TODO CHECK
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = event => {
        this.url = event.target?.result;
      };
    }
  }
  buttonsPostes: any[] = [];
  buttonsDepartments: any[] = [];
  buttonsEquipes: any[] = [];
  buttonsRoles: any[] = [];
  newButtonValueEquipe: string = '';
  newButtonValueDepartment: string = '';
  newButtonValueRole: string = '';
  newButtonValuePoste: string = '';

  @ViewChild('newButtonInput') newButtonInput!: ElementRef;

  addButtonPostes(): void {
    if (this.newButtonValuePoste) {
      this.buttonsPostes.push(this.newButtonValuePoste);
      let position: Position = {
        position_name: this.newButtonValuePoste,
        enterprise: this.enterprise_id,
      };
      this.addPosition(position);
      this.newButtonValuePoste = '';
      setTimeout(() => {
        this.newButtonInput.nativeElement.focus();
      });
    }
  }
  getIdDepartment(event: any) {
    // TODO CHECK EDIT
    localStorage.setItem('department_id', event);
    this.department_id = event;
    this.getTeam(this.department_id);
    this.disable = true;
  }
  updateButtonValuePostes(index: number, buttonElement: HTMLElement): void {
    const updatedButtonValue = buttonElement.textContent?.trim();
    if (updatedButtonValue) {
      this.buttonsPostes[index] = updatedButtonValue;
    }
  }
  addButtonDepartment(): void {
    if (this.newButtonValueDepartment) {
      this.buttonsDepartments.push(this.newButtonValueDepartment);

      let department: department = {
        department_name: this.newButtonValueDepartment,
        description: 'aucun',
        enterprise: this.enterprise_id,
      };
      this.addDepartment(department);
      this.newButtonValueDepartment = '';
      setTimeout(() => {
        this.newButtonInput.nativeElement.focus();
      });
    }
  }
  updateButtonValueDepartment(index: number, buttonElement: HTMLElement): void {
    const updatedButtonValue = buttonElement.textContent?.trim();
    if (updatedButtonValue) {
      this.buttonsDepartments[index] = updatedButtonValue;
    }
  }
  addButtonEquipe(): void {
    if (this.newButtonValueEquipe) {
      let team: team = {
        team_name: this.newButtonValueEquipe,
        description: 'aucun',
        department: this.department_id,
      };

      this.teamService.createTeam(team).subscribe(
        (data: any) => {
          if (data.success) {
            this.getTeam(this.department_id);
            this.toastr.success('Équipe ajoutée avec succès !');
          }
        },
        () => {
          this.toastr.error("Échec de l'ajout de l'équipe!");
        }
      );

      this.newButtonValueEquipe = '';
      setTimeout(() => {
        this.newButtonInput.nativeElement.focus();
      });
    }
  }
  updateButtonValueEquipe(index: number, buttonElement: HTMLElement): void {
    const updatedButtonValue = buttonElement.textContent?.trim();
    if (updatedButtonValue) {
      this.buttonsPostes[index] = updatedButtonValue;
    }
  }
  getAdmin() {
    this.adminService.getAdminByUsernameTech(this.admin_name).subscribe((data: any) => {
      console.log(data);
      this.enterprise_id = data.results.enterprise.enterprise_id;
      this.enterprise_name = data.results.enterprise.enterprise_name;
      this.email = data.results.email;
      this.phone = data.results.enterprise.phone;
      this.activity = data.results.enterprise.activity;
      this.employees_number = data.results.enterprise.employees_number;
      this.working_hours_start = data.results.enterprise.working_hours_start;
      this.working_hours_end = data.results.enterprise.working_hours_end;
      this.leave_days_number = data.results.enterprise.leave_days_number;
      this.saturday_off = data.results.enterprise.days_off.saturday_off;
      this.sunday_off = data.results.enterprise.days_off.sunday_off;
      this.friday_off = data.results.enterprise.days_off.friday_off;
      this.getDep(this.enterprise_id);
      this.getPositions(this.enterprise_id);
      this.getRoles();
    });
  }
  getDep(enterprise_id: number) {
    this.departmentService.GetListDepartment(enterprise_id).subscribe(
      (data: any) => {
        this.buttonsDepartments = data.results;
        console.log('all dep:', data.results);
      }
    );
  }
  getTeam(department_id: number) {
    this.teamService.GetListTeam(department_id).subscribe((data: any) => {
      this.buttonsEquipes = data.results;
    });
  }
  getPositions(enterprise_id: number) {
    this.positionService.GetListPositions(enterprise_id).subscribe(
      (data: any) => {
        this.buttonsPostes = data.results;
        console.log('position', data.results);
      }
    );
  }
  getRoles() {
    this.roleService.getRoles().subscribe((data: any) => {
      this.buttonsRoles = data.results;
      console.log('role:', data.results);
    });
  }
  onClick() {
    let enterprise: enterprise = {
      avatar: this.url,
      enterprise_name: this.enterprise_name,
      employees_number: this.employees_number,
      days_off: {
        saturday_off: this.saturday_off,
        sunday_off: this.sunday_off,
        friday_off: this.friday_off,
      },
      leave_days_number: this.leave_days_number,
      phone: this.phone,
      working_hours_end: this.working_hours_end,
      working_hours_start: this.working_hours_start,
      activity: this.activity,
    };
    console.log(enterprise);
    this.udpateEnterprise(enterprise, this.enterprise_id);
  }
  udpateEnterprise(enterprise: enterprise, enterprise_id: number) {
    this.adminService.updateEntreprise(enterprise, enterprise_id).subscribe(
      (data: any) => {
        if (data.success) {
          this.toastr.success('Entreprise mise à jour avec succès!');
        }
      },
      (error: any) => {
        this.toastr.error('Veuillez vérifier vos champs');
        console.error(error);
      }
    );
  }

  addDepartment(department: department) {
    this.departmentService.createDepartment(department).subscribe(
      (data: any) => {
        if (data.success) {
          this.getDep(this.enterprise_id);
          this.toastr.success('Département ajoutée avec succès !');

          console.log('add department:', data);
        }
      },
      () => {
        this.toastr.error("Échec de l'ajout de département!");
      }
    );
  }

  addPosition(position: Position) {
    this.positionService.createPosition(position).subscribe(
      (data: any) => {
        if (data.success) {
          console.log('add position:', data);
          this.getAdmin();
          this.toastr.success('Poste ajoutée avec succès !');
        }
      },
      () => {
        this.toastr.error("Échec de l'ajout de poste!");
      }
    );
  }
}