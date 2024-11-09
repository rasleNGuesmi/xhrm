import { NgModule } from '@angular/core';
import { GuestRoutingModule } from './guest-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './user-login/user-login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { GuestLayoutComponent } from './components/guest-layout/guest-layout.component';
import { GuestComponent } from './guest.component';
import { CompanySignupComponent } from './signup/company-signup/company-signup.component';
import { StepOneComponent } from './signup/step-one/step-one.component';
import { StepTwoComponent } from './signup/step-two/step-two.component';
import { StepThreeComponent } from './signup/step-three/step-three.component';
import { MatCardModule } from '@angular/material/card';
import {NgHttpLoaderModule} from "ng-http-loader";

@NgModule({
  declarations: [
    GuestComponent,
    LoginComponent,
    CompanySignupComponent,
    ResetPasswordComponent,
    GuestLayoutComponent,
    StepOneComponent,
    StepThreeComponent,
    StepTwoComponent,
  ],
  imports: [SharedModule, GuestRoutingModule, NgHttpLoaderModule],
  exports: [
    GuestLayoutComponent
  ]
})
export class GuestModule {}
