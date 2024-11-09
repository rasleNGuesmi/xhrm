import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicalAdminRoutingModule } from './technical-admin-routing.module';
import { TechnicalAdminComponent } from './technical-admin.component';
import {SharedModule} from "../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import { TechDashboardComponent } from './tech-dashboard/tech-dashboard.component';
import { TechEnterprisesComponent } from './tech-enterprises/tech-enterprises.component';
import {NgHttpLoaderModule} from "ng-http-loader";
import { TechEmployeesComponent } from './tech-employees/tech-employees.component';
import { TechSuppliersComponent } from './tech-suppliers/tech-suppliers.component';
import { TechExpensesComponent } from './tech-expenses/tech-expenses.component';
import { TechRequestsComponent } from './tech-requests/tech-requests.component';
import { TechPeriodicalComponent } from './tech-periodical/tech-periodical.component';
import { TechAuthLayoutComponent } from './tech-auth-layout/tech-auth-layout.component';
import { TechLeaveComponent } from './tech-leave/tech-leave.component';
import { TechAuthorizationComponent } from './tech-authorization/tech-authorization.component';
import { TechOverviewComponent } from './tech-overview/tech-overview.component';
import { TechPresenceComponent } from './tech-presence/tech-presence.component';
import { TechTodayPresenceComponent } from './tech-today-presence/tech-today-presence.component';
import { TechProfileEnterpriseComponent } from './tech-profile-enterprise/tech-profile-enterprise.component';


@NgModule({
  declarations: [
    TechnicalAdminComponent,
    TechDashboardComponent,
    TechEnterprisesComponent,
    TechEmployeesComponent,
    TechSuppliersComponent,
    TechExpensesComponent,
    TechRequestsComponent,
    TechPeriodicalComponent,
    TechAuthLayoutComponent,
    TechLeaveComponent,
    TechAuthorizationComponent,
    TechOverviewComponent,
    TechPresenceComponent,
    TechTodayPresenceComponent,
    TechProfileEnterpriseComponent
  ],
    imports: [
        CommonModule,
        TechnicalAdminRoutingModule,
        SharedModule,
        TranslateModule,
        NgHttpLoaderModule,
    ]
})
export class TechnicalAdminModule { }
