import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder) {}
  generalInformation: FormGroup;
  @Output() submit = new EventEmitter();
  onSubmitClick() {
    this.submit.emit(this.generalInformation.value);
  }
  ngOnInit(): void {
    this.generalInformation = this._formBuilder.group({
      responsibleFirstName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      responsibleLastName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      companyName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      employeesNumber: ['', Validators.required],
    });
  }
  get responsibleFirstName(): any {
    return this.generalInformation.get('responsibleFirstName');
  }

  get responsibleLastName(): any {
    return this.generalInformation.get('responsibleLastName');
  }

  get companyName(): any {
    return this.generalInformation.get('companyName');
  }
  get employeesNumber(): any {
    return this.generalInformation.get('employeesNumber');
  }
}
