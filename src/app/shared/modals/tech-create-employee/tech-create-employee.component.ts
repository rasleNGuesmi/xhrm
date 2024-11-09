import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbModal, NgbModalConfig, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../services/employee/employee.service";
import {DepartmentService} from "../../services/department/department.service";
import {PositionService} from "../../services/position/position.service";
import {TeamService} from "../../services/team/team.service";
import {RoleService} from "../../services/role/role.service";
import {passwordRegex} from "../../constants";
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {Employee} from "../../models/employee";

@Component({
  selector: 'app-tech-create-employee',
  templateUrl: './tech-create-employee.component.html',
  styleUrls: ['./tech-create-employee.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class TechCreateEmployeeComponent implements OnInit {
  @Output() employeeCreated: EventEmitter<void> = new EventEmitter<void>();
  // employeeRole: boolean = false; TODO REMOVE
  teamRole: boolean = false;
  // managerRole: boolean = false; TODO REMOVE
  departmentRole: boolean = false;
  accountantRole: boolean = false;
  enableDepartment: boolean = false;
  enableTeam: boolean = false;
  constructor(
    private toastr: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private enterpriseService: EnterpriseService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private teamService: TeamService,
    private positionService: PositionService,
    private roleService: RoleService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  addEmployee: FormGroup;
  enterprisesItems: any[] = [];
  departmentsItems: any[] = [];
  teamsItems: any[] = [];
  positionItems: any[] = [];
  rolesItems: any[] = [
    { name: 'Employé(e)', value: 'employee' },
    { name: 'Manager', value: 'manager' },
    { name: 'Comptable', value: 'accountant' },
    { name: 'Team leader', value: 'team-leader' },
    { name: 'Hr', value: 'hr' },
    { name: 'Secretary', value: 'secretary' },
  ];
  modalRef: NgbModalRef;
  open(content: any) {
    this.modalRef = this.modalService.open(content);
  }
  idE: number;

  ngOnInit(): void {
    this.addEmployee = this._formBuilder.group({
      responsibleFirstName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      responsibleLastName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(passwordRegex),
        ]),
      ],
      enterprise: ['', Validators.required],
      department: [],
      team: [],
      position: [],
      role: ['', Validators.required],
    });
    this.getEnterprises();
  }

  // TODO GETTERS
  get responsibleFirstName(): any {
    return this.addEmployee.get('responsibleFirstName');
  }
  get responsibleLastName(): any {
    return this.addEmployee.get('responsibleLastName');
  }
  get email(): any {
    return this.addEmployee.get('email');
  }

  get password(): any {
    return this.addEmployee.get('password');
  }
  get enterprise(): any {
    return this.addEmployee.get('enterprise');
  }
  get department(): any {
    return this.addEmployee.get('department');
  }
  get team(): any {
    return this.addEmployee.get('team');
  }
  get position(): any {
    return this.addEmployee.get('position');
  }
  get role(): any {
    return this.addEmployee.get('role');
  }

  // TODO CREATE EMPLOYEE
  createEmployee() {
    if (this.addEmployee.invalid) {
      this.addEmployee.markAllAsTouched();
      this.toastr.error('Veuillez vérifier les camps obligatoires');
      return;
    }
    let employee: Employee = {
      avatar: 'assets/avatar.png',
      email: this.addEmployee.value.email,
      first_name: this.addEmployee.value.responsibleFirstName,
      last_name: this.addEmployee.value.responsibleLastName,
      password: this.addEmployee.value.password,
      department: this.addEmployee.value.department
        ? this.addEmployee.value.department
        : '',
      team: this.addEmployee.value.team ? this.addEmployee.value.team : '',
      position: this.addEmployee.value.position
        ? this.addEmployee.value.position
        : '',
      role: this.addEmployee.value.role,
      enterprise: this.idE,
    };

    console.log('employee: ', employee);
    console.log('role: ', this.addEmployee.value.role);

    this.employeeService.createEmployee(employee).subscribe(
      (data: any) => {
        if (data.success) {
          console.log('data:', data);

          this.employeeCreated.emit();
          this.modalRef.close();
          this.toastr.success('Votre employé a été ajouté');
        }
      },
      (error: any) => {
        this.toastr.error('Veuillez vérifier vos champs');
        console.error(error);
      }
    );
  }

  getEnterprises() {
    this.enterpriseService.getAllEnterprises().subscribe(
      (data: any) => {
        this.enterprisesItems = data.results;
      }
    );
  }
  // TODO GET ID ENTERPRISE
  getIdEnterprise(event: any) {
    // TODO CHECK
    this.enableDepartment = true;
    this.idE = parseInt(event.target.value);
    // TODO GET DEPARTMENTS
    this.getDepartments(event.target.value);
    this.getPosition(this.idE);
  }
  // TODO GET ID DEPARTMENT
  getIdDepartment(event: any) {
    // TODO CHECK
    this.enableTeam = true;
    // TODO GET TEAMS
    this.getTeams(event.target.value);
  }
  // TODO GET DEPARTMENTS
  getDepartments(id: number) {
    this.departmentService.GetListDepartment(id).subscribe((data: any) => {
      this.departmentsItems = data.results;
    });
  }
  // TODO GET TEAMS
  getTeams(id: number) {
    this.teamService.GetListTeam(id).subscribe((data: any) => {
      this.teamsItems = data.results;
    });
  }
  // TODO GET POSITION
  getPosition(idE: number) {
    this.positionService.GetListPositions(idE).subscribe((data: any) => {
      this.positionItems = data.results;
      console.log('Postes: ', data.results);
    });
  }
  /*
  getRole() {
    this.roleService.getRoles().subscribe((data: any) => {
      this.rolesItems = data.results;
      console.log('roles', data.results);
    });
  }
  */
  // TODO GET ROLE & CHECK
  visible: boolean = true;
  password_visible() {
    this.visible = !this.visible;
  }
  // TODO FIX COMBOBOXES WITH ROLES
  getRole(event: any) {
    console.log('role? ', event.target.value);
    if (event.target.value == 'manager' || event.target.value == 'hr') {
      this.departmentRole = true;
      this.teamRole = false;
    } else if (event.target.value == 'accountant' || event.target.value == 'secretary') {
      this.teamRole = false;
      this.departmentRole = false;
    } else if (event.target.value == 'employee' || event.target.value == 'team-leader') this.teamRole = true;
  }
}
