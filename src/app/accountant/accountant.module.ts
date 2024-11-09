import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountantRoutingModule } from './accountant-routing.module';
import { AccountantComponent } from './accountant.component';
import { SharedModule } from '../shared/shared.module';
import { ExpenseComponent } from './expense/expense.component';
import { AuthorizationLayoutComponent } from './authorization-layout/authorization-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PresenceComponent } from './presence/presence.component';
import { ProfileComponent } from './profile/profile.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ClockingComponent } from './clocking/clocking.component';
import { ReportComponent } from './report/report.component';
import { LeaveComponent } from './leave/leave.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AdminModule } from '../admin/admin.module';
import { RequestsComponent } from './requests/requests.component';

@NgModule({
  declarations: [
    AccountantComponent,
    ExpenseComponent,
    AuthorizationLayoutComponent,
    DashboardComponent,
    PresenceComponent,
    ProfileComponent,
    ClockingComponent,
    ReportComponent,
    LeaveComponent,
    AuthorizationComponent,
    RequestsComponent,
  ],
  imports: [
    CommonModule,
    AccountantRoutingModule,
    SharedModule,
    NgHttpLoaderModule,
    AdminModule,
  ],
})
export class AccountantModule {}
