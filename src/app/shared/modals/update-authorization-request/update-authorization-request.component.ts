import { Component, Inject, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { Leave } from '../../models/leave';
import { Authorization } from '../../models/authorization';

@Component({
  selector: 'app-update-authorization-request',
  templateUrl: './update-authorization-request.component.html',
  styleUrls: ['./update-authorization-request.component.scss'],
})
export class UpdateAuthorizationRequestComponent implements OnInit {
  authorization: any;
  user_id: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateAuthorizationRequestComponent>,
    private authorizationService: AuthorizationService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  authorizationRequest: FormGroup;
  open(content: any) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    this.authorization = this.data.authorization;
    this.authorizationRequest = this._formBuilder.group({
      releaseDate: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      reason: ['', Validators.required],
    });
    let timeOut = this.authorization.time_out;
    let formattedTimeOut = timeOut.replace('h', '');
    let Arrival_time = this.authorization.arrival_time;
    let formatted_Arrival_time = Arrival_time.replace('h', '');
    this.authorizationRequest.patchValue({
      releaseDate: this.authorization.date,
      from: formattedTimeOut,
      reason: this.authorization.reason,
      to: formatted_Arrival_time,
    });
  }
  get releaseDate(): any {
    return this.authorizationRequest.get('releaseDate');
  }
  get from(): any {
    return this.authorizationRequest.get('from');
  }
  get to(): any {
    return this.authorizationRequest.get('to');
  }
  get reason(): any {
    return this.authorizationRequest.get('reason');
  }
  update() {
    if (this.authorizationRequest.invalid) {
      this.authorizationRequest.markAllAsTouched();
      this.toastr.error('Veuillez vérifier les champs obligatoires');
      return;
    }
    let authorization: Authorization = {
      date: this.authorizationRequest.value.releaseDate,
      time_out: this.authorizationRequest.value.from,
      arrival_time: this.authorizationRequest.value.to,
      reason: this.authorizationRequest.value.reason,
      user: this.user_id,
    };
    console.log('new authorization:', authorization);
    return this.authorizationService
      .updateAuthorization(this.authorization.authorization_id, authorization)
      .subscribe(
        (data: any) => {
          console.log('update authorization:', data.results);
          this.toastr.success('Demande de sortie mise à jour avec succès!');
          this.dialogRef.close('update');
        },
        (error: any) => {
          this.toastr.error('Veuillez vérifier vos champs');
          console.error(error);
        }
      );
  }
}
