import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";

import { TeamLeaderRoutingModule } from './team-leader-routing.module';
import { TeamLeaderComponent } from './team-leader.component';

import { NgHttpLoaderModule } from "ng-http-loader";
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentLayoutComponent } from './department-layout/department-layout.component';
import { PresenceComponent } from './presence/presence.component';
import { ClockingComponent } from './clocking/clocking.component';
import { ReportComponent } from './report/report.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AuthorizationLayoutComponent } from './authorization-layout/authorization-layout.component';
import { EmployeeModule } from "../employee/employee.module";
import { ExpenseComponent } from './expense/expense.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { HistoricComponent } from './historic/historic.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    TeamLeaderComponent,
    DashboardComponent,
    DepartmentLayoutComponent,
    PresenceComponent,
    ClockingComponent,
    ReportComponent,
    AuthorizationComponent,
    AuthorizationLayoutComponent,
    ExpenseComponent,
    InProgressComponent,
    HistoricComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    TeamLeaderRoutingModule,
    NgHttpLoaderModule,
    SharedModule,
    EmployeeModule,
  ]
})
export class TeamLeaderModule { }
