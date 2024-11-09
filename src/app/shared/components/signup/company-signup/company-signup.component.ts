import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { StepOneComponent } from '../step-one/step-one.component';
import { StepTwoComponent } from '../step-two/step-two.component';
import { StepThreeComponent } from '../step-three/step-three.component';
import { Router } from '@angular/router';
import { Admin } from '../../../models/admin';
import { RegisterService } from '../../../services/register.service';
import { LoginRequest } from '../../../models/auth/LoginRequest';
import { ToastrService } from 'ngx-toastr';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-company-signup',
  templateUrl: './company-signup.component.html',
  styleUrls: ['./company-signup.component.scss'],
})
export class CompanySignupComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private registerService: RegisterService,
    private route: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.translate = translate;
  }
  @ViewChild('StepOneComponent') stepOneComponent: StepOneComponent;
  @ViewChild('StepTwoComponent') stepTwoComponent: StepTwoComponent;
  @ViewChild('StepThreeComponent') stepThreeComponent: StepThreeComponent;

  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() reload: EventEmitter<void> = new EventEmitter();

  /* TODO CALL TRANSLATOR */

  language: String = 'fr';

  changeLang() {
    if (this.language == 'en') {
      this.translate.use('fr');
      this.language = 'fr';
    } else {
      this.translate.use('en');
      this.language = 'en';
    }
  }

  get generalInformation() {
    return this.stepOneComponent
      ? this.stepOneComponent.generalInformation
      : this._formBuilder.group({});
    //return this.stepOneComponent.generalInformation;
  }
  get company() {
    return this.stepTwoComponent
      ? this.stepTwoComponent.company
      : this._formBuilder.group({});
  }
  value1: any;
  value2: any;
  value3: any;

  onSubmit1(event: any) {
    console.log('event', event);
    this.value1 = event;
  }
  onSubmit2(event: any) {
    console.log('event', event);
    this.value2 = event;
  }
  onSubmit3(event: any) {
    this.value3 = event;

    console.log('event', event);
    let admin: Admin = {
      email: this.value3.email,
      first_name: this.value1.responsibleFirstName,
      last_name: this.value1.responsibleLastName,
      enterprise: {
        enterprise_name: this.value1.companyName,
        employees_number: this.value1.employeesNumber,
        activity: this.value2.companyActivity,
        phone: this.value2.phoneNumber,
        adresse: this.value2.address,
      },
      username: this.value3.username,
      password: this.value3.password,
    };
    this.register(admin);

  }
  get account() {
    return this.stepThreeComponent
      ? this.stepThreeComponent.account
      : this._formBuilder.group({});
  }

  register(admin: Admin) {
    this.registerService.register(admin).subscribe(
      (data: any) => {
        console.log('data:', data);
        if (data.success) {
          // this.route.navigate(['/guest/login']);
          this.toastr.success('Entreprise ajoutée avec succès');
          this.reload.emit();
          this.close.emit();
        }
      },
      (error: any) => {
        this.toastr.error('Veuillez vérifier vos champs');
        console.error(error);
      }
    );
  }
}
