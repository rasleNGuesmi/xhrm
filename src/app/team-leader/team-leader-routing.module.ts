import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamLeaderComponent } from "./team-leader.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Page404Component } from "../shared/components/page404/page404.component";
import { DepartmentLayoutComponent } from "./department-layout/department-layout.component";
import { PresenceComponent } from "./presence/presence.component";
import { AuthorizationLayoutComponent } from "./authorization-layout/authorization-layout.component";
import { ExpenseComponent } from "./expense/expense.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  {
    path: '',
    component: TeamLeaderComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'employees',
        component: DepartmentLayoutComponent,
      },
      {
        path: 'authorization',
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
        path: 'settings',
        component: ProfileComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        component: Page404Component,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamLeaderRoutingModule { }
