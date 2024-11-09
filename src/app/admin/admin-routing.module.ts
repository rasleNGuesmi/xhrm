import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DepartmentLayoutComponent } from './department-layout/department-layout.component';
import { AuthorizationLayoutComponent } from './authorization-layout/authorization-layout.component';
import { ExpenseComponent } from './expenses/expense.component';
import { PresenceComponent } from './presence/presence.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Page404Component } from '../shared/components/page404/page404.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEmployeeComponent } from './profile-employee/profile-employee.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'employees',
        component: DepartmentLayoutComponent,
      },
      {
        path: 'authorisation',
        component: AuthorizationLayoutComponent,
      },
      {
        path: 'expenses',
        component: ExpenseComponent,
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
        component: ProfileComponent,
      },
      { path: 'profile-employee', component: ProfileEmployeeComponent },
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
  exports: [RouterModule],
})
export class AdminRoutingModule {}
