import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeModule } from './employee/employee.module';
import { GuestModule } from './guest/guest.module';
import { AdminModule } from './admin/admin.module';

import { AuthInterceptorProvider } from './shared/interceptors/auth.interceptor';
import { ManagerModule } from './manager/manager.module';
import { SharedModule } from './shared/shared.module';
import { AccountantModule } from './accountant/accountant.module';
import {TeamLeaderModule} from "./team-leader/team-leader.module";
import {HrModule} from "./hr/hr.module";
import {SecretaryModule} from "./secretary/secretary.module";
import {HomePageModule} from "./home-page/home-page.module";
import {TechnicalAdminModule} from "./technical-admin/technical-admin.module";
@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    EmployeeModule,
    GuestModule,
    AdminModule,
    ManagerModule,
    AccountantModule,
    TeamLeaderModule,
    HrModule,
    SecretaryModule,
    HomePageModule,
    TechnicalAdminModule,
    SharedModule,
  ],
  exports: [AppRoutingModule],
  providers: [AuthInterceptorProvider],

  bootstrap: [AppComponent],
})
export class AppModule {}
