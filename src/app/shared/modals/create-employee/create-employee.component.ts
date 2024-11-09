import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordRegex } from '../../constants';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee/employee.service';
import { DepartmentService } from '../../services/department/department.service';
import { TeamService } from '../../services/team/team.service';
import { PositionService } from '../../services/position/position.service';
import { RoleService } from '../../services/role/role.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class CreateEmployeeComponent implements OnInit {
  @Output() employeeCreated: EventEmitter<void> = new EventEmitter<void>();
  // TODO RENAME TO TEAM
  employeeRole: boolean = false;
  // TODO RENAME TO DEPARTMENT
  managerRole: boolean = false;
  // TODO RENAME TO X & CHECK
  accountantRole: boolean = false;
  disble: boolean = false;
  constructor(
    private toastr: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private EmployeeService: EmployeeService,
    private DepartmentService: DepartmentService,
    private TeamService: TeamService,
    private positionService: PositionService,
    private roleService: RoleService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  addEmployee: FormGroup;
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
  idEnterprise: any;
  idE: number;
  idDepartment: any;
  idD: number;
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
      department: [],
      team: [],
      position: [],
      role: ['', Validators.required],
    });
    this.idEnterprise = localStorage.getItem('entreprise_id');
    this.idE = parseInt(this.idEnterprise);
    this.idDepartment = localStorage.getItem('department_id');
    this.idD = parseInt(this.idDepartment);
    this.getDep();
    this.getPosition();
    //this.getRole();
  }
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
  createEmployee() {
    if (this.addEmployee.invalid) {
      this.addEmployee.markAllAsTouched();
      this.toastr.error('Veuillez vérifier les champs obligatoires');
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

    console.log('employee:', employee);
    console.log('role:', this.addEmployee.value.role);

    this.EmployeeService.createEmployee(employee).subscribe(
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
  getDep() {
    this.DepartmentService.GetListDepartment(this.idE).subscribe(
      (data: any) => {
        this.departmentsItems = data.results;
      }
    );
  }
  getIdDepartment(event: any) {
    this.disble = true;
    this.getTeam(event.target.value);
  }
  getTeam(id: number) {
    this.TeamService.GetListTeam(id).subscribe((data: any) => {
      this.teamsItems = data.results;
    });
  }
  getPosition() {
    this.positionService.GetListPositions(this.idE).subscribe((data: any) => {
      this.positionItems = data.results;
      console.log('poste', data.results);
    });
  }
  /* getRole() {
    this.roleService.getRoles().subscribe((data: any) => {
      this.rolesItems = data.results;
      console.log('roles', data.results);
    });
  }*/
  visible: boolean = true;

  password_visible() {
    this.visible = !this.visible;
  }
  // TODO FIX COMBOBOXES WITH ROLES
  getRole(event: any) {
    console.log('role? ', event.target.value);
    if (event.target.value == 'manager') {
      this.managerRole = true;
      this.employeeRole = false;
    } else if (event.target.value == 'accountant' || event.target.value == 'secretary') {
      this.employeeRole = false;
      this.managerRole = false;
    } else if (event.target.value == 'employee' || event.target.value == 'team_leader') this.employeeRole = true;
  }
}
