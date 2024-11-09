import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecretaryRoutingModule } from './secretary-routing.module';
import { SecretaryComponent } from './secretary.component';
import {SharedModule} from "../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import { DashboardSecretaryComponent } from './dashboard-secretary/dashboard-secretary.component';
import {NgHttpLoaderModule} from "ng-http-loader";
import { DepartmentLayoutSecretaryComponent } from './department-layout-secretary/department-layout-secretary.component';
import { AuthorizationLayoutSecretaryComponent } from './authorization-layout-secretary/authorization-layout-secretary.component';
import { LeaveSecretaryComponent } from './leave-secretary/leave-secretary.component';
import { AuthorizationSecretaryComponent } from './authorization-secretary/authorization-secretary.component';
import { OverviewSecretaryComponent } from './overview-secretary/overview-secretary.component';
import { PresenceSecretaryComponent } from './presence-secretary/presence-secretary.component';
import { HistoricSecretaryComponent } from './historic-secretary/historic-secretary.component';
import { ExpensesSecretaryComponent } from './expenses-secretary/expenses-secretary.component';
import {AdminModule} from "../admin/admin.module";
import { RequestsSecretaryComponent } from './requests-secretary/requests-secretary.component';
import { PeriodicalSecretaryComponent } from './periodical-secretary/periodical-secretary.component';
import { SuppliersSecretaryComponent } from './suppliers-secretary/suppliers-secretary.component';
import { ProfileSecretaryComponent } from './profile-secretary/profile-secretary.component';


@NgModule({
  declarations: [
    SecretaryComponent,
    DashboardSecretaryComponent,
    DepartmentLayoutSecretaryComponent,
    AuthorizationLayoutSecretaryComponent,
    LeaveSecretaryComponent,
    AuthorizationSecretaryComponent,
    OverviewSecretaryComponent,
    PresenceSecretaryComponent,
    HistoricSecretaryComponent,
    ExpensesSecretaryComponent,
    RequestsSecretaryComponent,
    PeriodicalSecretaryComponent,
    SuppliersSecretaryComponent,
    ProfileSecretaryComponent
  ],
  imports: [
    CommonModule,
    SecretaryRoutingModule,
    SharedModule,
    TranslateModule,
    NgHttpLoaderModule,
    AdminModule
  ]
})
export class SecretaryModule { }
