import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NgbModal, NgbModalConfig, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthorizationService} from "../../services/authorization/authorization.service";
import {Authorization} from "../../models/authorization";
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {EmployeeService} from "../../services/employee/employee.service";

@Component({
  selector: 'app-tech-authorization-request',
  templateUrl: './tech-authorization-request.component.html',
  styleUrls: ['./tech-authorization-request.component.scss']
})
export class TechAuthorizationRequestComponent implements OnInit {
  @Output() authorizationRequestCreated: EventEmitter<void> = new EventEmitter<void>();
  enterprise_id: number;
  @Input() days_left: number;
  enterprise_leave_days: number = 0;
  enterpriseItems: any[] = [];
  employeeItems: any[] = [];
  constructor(
    private toastr: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private authorizationService: AuthorizationService,
    private enterpriseService: EnterpriseService,
    private employeeService: EmployeeService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  authorizationRequest: FormGroup;
  modalRef: NgbModalRef;
  open(content: any) {
    this.modalRef = this.modalService.open(content);
  }

  ngOnInit(): void {
    this.listEnterprises();
    this.authorizationRequest = this._formBuilder.group({
      enterprise: ['', Validators.required],
      user: ['', Validators.required],
      date: ['', Validators.required],
      time_out: ['', Validators.required],
      arrival_time: ['', Validators.required],
      reason: [],
    });
  }
  get enterprise(): any {
    return this.authorizationRequest.get('enterprise');
  }
  get user(): any {
    return this.authorizationRequest.get('user');
  }
  get date(): any {
    return this.authorizationRequest.get('date');
  }
  get time_out(): any {
    return this.authorizationRequest.get('time_out');
  }
  get arrival_time(): any {
    return this.authorizationRequest.get('arrival_time');
  }
  get typeLeave(): any {
    return this.authorizationRequest.get('typeLeave');
  }
  get reason(): any {
    return this.authorizationRequest.get('reason');
  }
  createAuthorization() { /* TODO GO ON HERE */
    if (this.authorizationRequest.invalid) {
      this.authorizationRequest.markAllAsTouched();
      this.toastr.error('Veuillez vérifier les champs obligatoires');
      return;
    }
    let authorization: Authorization = {
      date: this.authorizationRequest.value.date,
      time_out: this.authorizationRequest.value.time_out,
      reason: this.authorizationRequest.value.reason,
      arrival_time: this.authorizationRequest.value.arrival_time,
      user: this.authorizationRequest.value.user,
    };
    console.log('Authorization: ', authorization);
    this.authorizationService.createAuthorization(authorization).subscribe(
      (data: any) => {
        if (data.success) {
          console.log('add auth:', data);
          this.toastr.success('Votre demande de sortie a été ajoutée');
          this.authorizationRequestCreated.emit();
          this.modalRef.close();
        }
      },
      (error: any) => {
        this.toastr.error('Veuillez vérifier vos champs');
        console.error(error);
      }
    );
  }

  listEnterprises(): void {
    this.enterpriseService.getAllEnterprises().subscribe(
      (data: any) => {
        if (data.success) {
          console.log("Enterprises: ", data.results);
          this.enterpriseItems = data.results;
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  loadUsers(event: any): void {
    this.enterprise_id = parseInt(event.target.value);
    this.employeeService.getEmployees(this.enterprise_id)
      .subscribe(
        (data: any) => {
          if (data.success) {
            console.log("Employees: ", data.results);
            this.employeeItems = data.results;
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
}
