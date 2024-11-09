import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordRegex } from '../../constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private toastr: ToastrService,

    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  leaveRequest: FormGroup;
  open(content: any) {
    this.modalService.open(content);
  }
  visible: boolean = true;

  password_visible() {
    this.visible = !this.visible;
  }

  onSubmit() {
    this.toastr.success('Votre demande a été ajoutée');
  }
  ngOnInit(): void {
    this.leaveRequest = this._formBuilder.group({
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(passwordRegex),
        ]),
      ],
    });
  }
  get password(): any {
    return this.leaveRequest.get('password');
  }
}
