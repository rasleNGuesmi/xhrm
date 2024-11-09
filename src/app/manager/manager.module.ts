import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AuthorizationLayoutComponent } from './authorization-layout/authorization-layout.component';
import { ClokingComponent } from './cloking/cloking.component';
import { DepartmentLayoutComponent } from './department-layout/department-layout.component';
import { ExpenseComponent } from './expense/expense.component';
import { HistoricComponent } from './historic/historic.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { LeaveComponent } from './leave/leave.component';
import { PresenceComponent } from './presence/presence.component';
import { ReportComponent } from './report/report.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { SharedModule } from '../shared/shared.module';
import { ManagerComponent } from './manager.component';

@NgModule({
  declarations: [
    ManagerComponent,
    ProfileComponent,
    DashboardComponent,
    AuthorizationComponent,
    AuthorizationLayoutComponent,
    ClokingComponent,
    DepartmentLayoutComponent,
    ExpenseComponent,
    HistoricComponent,
    InProgressComponent,
    LeaveComponent,
    PresenceComponent,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    NgHttpLoaderModule,
    SharedModule,
  ],
  exports: [
    AuthorizationComponent
  ]
})
export class ManagerModule {}
