import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page404Component } from '../shared/components/page404/page404.component';
import { AccountantComponent } from './accountant.component';
import { ExpenseComponent } from './expense/expense.component';
import { AuthorizationLayoutComponent } from './authorization-layout/authorization-layout.component';
import { PresenceComponent } from './presence/presence.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: AccountantComponent,
    children: [
      {
        path: 'expenses',
        component: ExpenseComponent,
      },
      {
        path: 'authorisation',
        component: AuthorizationLayoutComponent,
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
export class AccountantRoutingModule {}
