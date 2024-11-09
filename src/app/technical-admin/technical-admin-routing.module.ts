import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TechnicalAdminComponent} from "./technical-admin.component";
import {TechEnterprisesComponent} from "./tech-enterprises/tech-enterprises.component";
import {Page404Component} from "../shared/components/page404/page404.component";
import {TechDashboardComponent} from "./tech-dashboard/tech-dashboard.component";
import {TechEmployeesComponent} from "./tech-employees/tech-employees.component";
import {TechSuppliersComponent} from "./tech-suppliers/tech-suppliers.component";
import {TechExpensesComponent} from "./tech-expenses/tech-expenses.component";
import {TechAuthLayoutComponent} from "./tech-auth-layout/tech-auth-layout.component";
import {TechPresenceComponent} from "./tech-presence/tech-presence.component";
import {TechProfileEnterpriseComponent} from "./tech-profile-enterprise/tech-profile-enterprise.component";

const routes: Routes = [
  {
    path: '',
    component: TechnicalAdminComponent,
    children: [
      {
        path: 'dashboard',
        component: TechDashboardComponent,
      },
      {
        path: 'enterprises',
        component: TechEnterprisesComponent,
      },
      {
        path: 'employees',
        component: TechEmployeesComponent,
      },
      // TODO OTHER ROUTES
      {
        path: 'suppliers',
        component: TechSuppliersComponent,
      },
      {
        path: 'presence',
        component: TechPresenceComponent,
      },
      {
        path: 'authorizations',
        component: TechAuthLayoutComponent,
      },
      {
        path: 'expenses',
        component: TechExpensesComponent,
      },
      {
        path: 'profile-enterprise',
        component: TechProfileEnterpriseComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        component: Page404Component,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicalAdminRoutingModule { }
