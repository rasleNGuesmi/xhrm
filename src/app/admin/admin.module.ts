import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { EmployeeModule } from '../employee/employee.module';
import { DepartmentLayoutComponent } from './department-layout/department-layout.component';
import { MatCardModule } from '@angular/material/card';
import { AuthorizationLayoutComponent } from './authorization-layout/authorization-layout.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LeaveComponent } from './leave/leave.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { OverviewComponent } from './overview/overview.component';
import { ExpenseComponent } from './expenses/expense.component';
import { RequestsComponent } from './requests/requests.component';
import { PeriodicalComponent } from './periodical/periodical.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { PresenceComponent } from './presence/presence.component';
import { HistoricComponent } from './historic/historic.component';
import {
  CalendarCommonModule,
  CalendarDayModule,
  CalendarMonthModule,
  CalendarWeekModule,
} from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEmployeeComponent } from './profile-employee/profile-employee.component';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [
    AdminComponent,
    DepartmentLayoutComponent,
    AuthorizationLayoutComponent,
    LeaveComponent,
    AuthorizationComponent,
    OverviewComponent,
    ExpenseComponent,
    RequestsComponent,
    PeriodicalComponent,
    SuppliersComponent,
    PresenceComponent,
    HistoricComponent,
    DashboardComponent,
    ProfileComponent,
    ProfileEmployeeComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatSidenavModule,
    NgHttpLoaderModule,
  ],
  exports: [RequestsComponent, PeriodicalComponent, SuppliersComponent],
})
export class AdminModule {}
