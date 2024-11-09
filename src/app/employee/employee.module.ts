import { NgModule } from '@angular/core';
import { EmployeeComponent } from './employee.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeRoutingModule } from './employee-routing.module';
import { DepartmentLayoutComponent } from './department-layout/department-layout.component';
import { TableComponent } from '../shared/components/table/table.component';
import { MatMenuModule } from '@angular/material/menu';
import { LeaveComponent } from './leave/leave.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AuthorizationLayoutComponent } from './authorization-layout/authorization-layout.component';
import { ExpenseComponent } from './expense/expense.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { HistoricComponent } from './historic/historic.component';
import { PresenceComponent } from './presence/presence.component';
import { ReportComponent } from './report/report.component';
import {
  CalendarCommonModule,
  CalendarDayModule,
  CalendarMonthModule,
  CalendarWeekModule,
} from 'angular-calendar';
import { ClockingComponent } from './clocking/clocking.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [
    EmployeeComponent,
    DepartmentLayoutComponent,
    LeaveComponent,
    AuthorizationComponent,
    AuthorizationLayoutComponent,
    ExpenseComponent,
    InProgressComponent,
    HistoricComponent,
    PresenceComponent,
    ReportComponent,
    ClockingComponent,
    DashboardComponent,
    ProfileComponent,
  ],
  imports: [SharedModule, EmployeeRoutingModule, NgHttpLoaderModule],
  exports: [AuthorizationComponent, LeaveComponent, HistoricComponent],
})
export class EmployeeModule {}
