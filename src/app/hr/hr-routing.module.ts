import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrComponent } from "./hr.component";
// import {DepartmentLayoutComponent} from "./department-layout/department-layout.component";
// import {AuthorizationLayoutComponent} from "./authorization-layout/authorization-layout.component";
// import {ExpenseComponent} from "./expense/expense.component";
// import {PresenceComponent} from "./presence/presence.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
// import {ProfileComponent} from "./profile/profile.component";
import {Page404Component} from "../shared/components/page404/page404.component";
import {DepartmentLayoutComponent} from "./department-layout/department-layout.component";
import {PresenceComponent} from "./presence/presence.component";
import {AuthorizationLayoutHrComponent} from "./authorization-layout-hr/authorization-layout-hr.component";
import {ExpensesHrComponent} from "./expenses-hr/expenses-hr.component";
import {ProfileHrComponent} from "./profile-hr/profile-hr.component";

const routes: Routes = [
  {
    path: '',
    component: HrComponent,
    children: [
      {
        path: 'employees',
        component: DepartmentLayoutComponent,
      },
      {
        path: 'authorisation',
        component: AuthorizationLayoutHrComponent,
      },
      {
        path: 'expenses',
        component: ExpensesHrComponent,
      },
      {
        path: 'presence',
        component: PresenceComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'settings',
        component: ProfileHrComponent,
      },
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
export class HrRoutingModule { }
