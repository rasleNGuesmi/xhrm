import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NgbModal, NgbModalConfig, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LeaveService} from "../../services/leave/leave.service";
import {Leave} from "../../models/leave";
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {EmployeeService} from "../../services/employee/employee.service";

@Component({
  selector: 'app-tech-leave-request',
  templateUrl: './tech-leave-request.component.html',
  styleUrls: ['./tech-leave-request.component.scss']
})
export class TechLeaveRequestComponent implements OnInit {
  @Output() leaveRequestCreated: EventEmitter<void> = new EventEmitter<void>();
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
    private leaveService: LeaveService,
    private enterpriseService: EnterpriseService,
    private employeeService: EmployeeService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  leaveRequest: FormGroup;
  modalRef: NgbModalRef;
  open(content: any) {
    this.modalRef = this.modalService.open(content);
  }

  typesLeave = ['CP', 'RTT'];

  ngOnInit(): void {
    this.listEnterprises();
    this.leaveRequest = this._formBuilder.group({
      enterprise: ['', Validators.required],
      user: ['', Validators.required],
      startDate: ['', Validators.required],
      daysNumber: ['', Validators.required],
      typeLeave: ['', Validators.required],
      reason: [],
    })
  }

  get enterprise(): any { // TODO CHECK
    return this.leaveRequest.get('enterprise');
  }
  get user(): any { // TODO CHECK
    return this.leaveRequest.get('user');
  }
  get startDate(): any {
    return this.leaveRequest.get('startDate');
  }
  get daysNumber(): any {
    return this.leaveRequest.get('daysNumber');
  }
  get typeLeave(): any {
    return this.leaveRequest.get('typeLeave');
  }
  get reason(): any {
    return this.leaveRequest.get('reason');
  }
  createLeave() {
    if (this.leaveRequest.invalid) {
      this.leaveRequest.markAllAsTouched();
      this.toastr.error('Veuillez vérifier les champs obligatoires');
      return;
    }
    let leave: Leave = {
      initial_date: this.leaveRequest.value.startDate,
      days_number: this.leaveRequest.value.daysNumber,
      reason: this.leaveRequest.value.reason,
      type: this.leaveRequest.value.typeLeave,
      user: this.leaveRequest.value.user
    };
    this.leaveService.createLeave(leave).subscribe(
      (data: any) => {
        if (data.success) {
          this.toastr.success('Votre demande de congé a été ajoutée');
          this.leaveRequestCreated.emit();
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
            this.employeeItems = data.results
            this.enterprise_leave_days = this.enterpriseItems.find(e => e.enterprise_id === this.enterprise_id).leave_days_number ?? 0;
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
  // TODO ON CHANGE USER GET LEAVE DAYS LEFT
}
