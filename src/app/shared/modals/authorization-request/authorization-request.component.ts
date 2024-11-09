import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { Leave } from '../../models/leave';
import { Authorization } from '../../models/authorization';

@Component({
  selector: 'app-authorization-request',
  templateUrl: './authorization-request.component.html',
  styleUrls: ['./authorization-request.component.scss'],
})
export class AuthorizationRequestComponent implements OnInit {
  @Output() authorizationRequestCreated: EventEmitter<void> =
    new EventEmitter<void>();
  user_id: number;
  constructor(
    private toastr: ToastrService,

    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private authorizationService: AuthorizationService
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
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    this.authorizationRequest = this._formBuilder.group({
      date: ['', Validators.required],
      time_out: ['', Validators.required],
      arrival_time: ['', Validators.required],
      reason: [],
    });
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
  createAuthorization() {
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
      user: this.user_id,
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
}
