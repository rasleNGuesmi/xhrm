import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LeaveService } from '../../services/leave/leave.service';
import { Expense } from '../../models/expense';
import { Leave } from '../../models/leave';

@Component({
  selector: 'app-update-leave-request',
  templateUrl: './update-leave-request.component.html',
  styleUrls: ['./update-leave-request.component.scss'],
})
export class UpdateLeaveRequestComponent implements OnInit {
  leave: any;
  user_id: number;
  days_left: any;
  enterprise_leave_days: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private leaveService: LeaveService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateLeaveRequestComponent>
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  leaveRequest: FormGroup;
  open(content: any) {
    this.modalService.open(content);
  }

  typesLeave = ['CP', 'RTT'];
  ngOnInit(): void {
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    this.days_left = this.data.days_left;
    this.enterprise_leave_days = this.data.enterprise_leave_days;
    this.leave = this.data.leave;
    this.leaveRequest = this._formBuilder.group({
      initial_date: ['', Validators.required],
      days_number: ['', Validators.required],
      type: ['', Validators.required],
      reason: [],
    });
    this.leaveRequest.patchValue({
      initial_date: this.leave.initial_date,
      days_number: this.leave.days_number,
      reason: this.leave.reason,
      type: this.leave.type,
    });
    console.log('leave :', this.data.days_left);
  }
  get initial_date(): any {
    return this.leaveRequest.get('initial_date');
  }
  get days_number(): any {
    return this.leaveRequest.get('days_number');
  }
  get type(): any {
    return this.leaveRequest.get('type');
  }
  get reason(): any {
    return this.leaveRequest.get('typeLeave');
  }

  update() {
    if (this.leaveRequest.invalid) {
      this.leaveRequest.markAllAsTouched();
      this.toastr.error('Veuillez vérifier les champs obligatoires');
      return;
    }
    let leave: Leave = {
      initial_date: this.leaveRequest.value.initial_date,
      days_number: this.leaveRequest.value.days_number,
      type: this.leaveRequest.value.type,
      reason: this.leaveRequest.value.reason,
      user: this.user_id,
    };
    console.log('new leave:', leave);
    return this.leaveService
      .updateLeave(this.leave.leave_request_id, leave)
      .subscribe(
        (data: any) => {
          console.log('update expense:', data.results);
          this.toastr.success('Demande congé mise à jour avec succès!');
          this.dialogRef.close('update');
        },
        (error: any) => {
          this.toastr.error('Veuillez vérifier vos champs');
          console.error(error);
        }
      );
  }
}
