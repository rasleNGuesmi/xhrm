import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LeaveService } from '../../services/leave/leave.service';
import { Leave } from '../../models/leave';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss'],
})
export class LeaveRequestComponent implements OnInit {
  @Output() leaveRequestCreated: EventEmitter<void> = new EventEmitter<void>();
  user_id: number;
  @Input() days_left: number;
  @Input() enterprise_leave_days: number;
  constructor(
    private toastr: ToastrService,

    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private leaveService: LeaveService
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
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    this.leaveRequest = this._formBuilder.group({
      startDate: ['', Validators.required],
      daysNumber: ['', Validators.required],
      typeLeave: ['', Validators.required],
      reason: [],
    });
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
      user: this.user_id,
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
}
