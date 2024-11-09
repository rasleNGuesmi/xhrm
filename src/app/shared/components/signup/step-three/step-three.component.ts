import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordRegex } from '../../../constants';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
})
export class StepThreeComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder) {}
  @Output() submit = new EventEmitter();
  @Output() close = new EventEmitter();

  emitClose() {
    this.close.emit();
  }
  onSubmitClick() {
    this.submit.emit(this.account.value);
  }
  account: FormGroup;
  ngOnInit(): void {
    this.account = this._formBuilder.group({
      username: [
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
    });
  }
  visible: boolean = true;

  password_visible() {
    this.visible = !this.visible;
  }

  get username(): any {
    return this.account.get('username');
  }

  get email(): any {
    return this.account.get('email');
  }

  get password(): any {
    return this.account.get('password');
  }
}
