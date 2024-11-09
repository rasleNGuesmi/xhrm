import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder) {}
  company: FormGroup;
  @Output() submit = new EventEmitter();
  onSubmitClick() {
    this.submit.emit(this.company.value);
  }
  ngOnInit(): void {
    this.company = this._formBuilder.group({
      companyActivity: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      phoneNumber: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      address: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }

  get companyActivity(): any {
    return this.company.get('companyActivity');
  }

  get phoneNumber(): any {
    return this.company.get('phoneNumber');
  }

  get address(): any {
    return this.company.get('address');
  }
}
