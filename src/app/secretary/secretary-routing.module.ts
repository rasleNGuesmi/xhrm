import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DepartmentLayoutComponent} from "../admin/department-layout/department-layout.component";
import {AuthorizationLayoutComponent} from "../admin/authorization-layout/authorization-layout.component";
import {ExpenseComponent} from "../admin/expenses/expense.component";
import {PresenceComponent} from "../admin/presence/presence.component";
import {DashboardComponent} from "../admin/dashboard/dashboard.component";
import {ProfileComponent} from "../admin/profile/profile.component";
import {ProfileEmployeeComponent} from "../admin/profile-employee/profile-employee.component";
import {Page404Component} from "../shared/components/page404/page404.component";
import {SecretaryComponent} from "./secretary.component";
import {DepartmentLayoutSecretaryComponent} from "./department-layout-secretary/department-layout-secretary.component";
import {DashboardSecretaryComponent} from "./dashboard-secretary/dashboard-secretary.component";
import {
  AuthorizationLayoutSecretaryComponent
} from "./authorization-layout-secretary/authorization-layout-secretary.component";
import {PresenceSecretaryComponent} from "./presence-secretary/presence-secretary.component";
import {ExpensesSecretaryComponent} from "./expenses-secretary/expenses-secretary.component";
import {ProfileSecretaryComponent} from "./profile-secretary/profile-secretary.component";

const routes: Routes = [
  {
    path: '',
    component: SecretaryComponent,
    children: [
      {
        path: 'employees',
        component: DepartmentLayoutSecretaryComponent,
      },
      {
        path: 'authorisation',
        component: AuthorizationLayoutSecretaryComponent,
      },
      {
        path: 'expenses',
        component: ExpensesSecretaryComponent,
      },
      {
        path: 'presence',
        component: PresenceSecretaryComponent,
      },
      {
        path: 'dashboard',
        component: DashboardSecretaryComponent,
      },
      {
        path: 'settings',
        component: ProfileSecretaryComponent,
      },
      /*{ path: 'profile-employee', component: ProfileEmployeeComponent },*/
      {
        path: '**',
        pathMatch: 'full',
        component: Page404Component,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretaryRoutingModule { }
