import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { HrComponent } from './hr.component';
import {SharedModule} from "../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgHttpLoaderModule} from "ng-http-loader";
import { DepartmentLayoutComponent } from './department-layout/department-layout.component';
import { PresenceComponent } from './presence/presence.component';
import { HistoricComponent } from './historic/historic.component';
import { AuthorizationLayoutHrComponent } from './authorization-layout-hr/authorization-layout-hr.component';
import { LeaveHrComponent } from './leave-hr/leave-hr.component';
import { AuthorizationHrComponent } from './authorization-hr/authorization-hr.component';
import { OverviewHrComponent } from './overview-hr/overview-hr.component';
import { ExpensesHrComponent } from './expenses-hr/expenses-hr.component';
import {AdminModule} from "../admin/admin.module";
import { RequestsHrComponent } from './requests-hr/requests-hr.component';
import { PeriodicalHrComponent } from './periodical-hr/periodical-hr.component';
import { SuppliersHrComponent } from './suppliers-hr/suppliers-hr.component';
import { ProfileHrComponent } from './profile-hr/profile-hr.component';


@NgModule({
  declarations: [
    HrComponent,
    DashboardComponent,
    DepartmentLayoutComponent,
    PresenceComponent,
    HistoricComponent,
    AuthorizationLayoutHrComponent,
    LeaveHrComponent,
    AuthorizationHrComponent,
    OverviewHrComponent,
    ExpensesHrComponent,
    RequestsHrComponent,
    PeriodicalHrComponent,
    SuppliersHrComponent,
    ProfileHrComponent
  ],
    imports: [
        CommonModule,
        HrRoutingModule,
        SharedModule,
        TranslateModule,
        NgHttpLoaderModule,
        AdminModule
    ]
})
export class HrModule { }
