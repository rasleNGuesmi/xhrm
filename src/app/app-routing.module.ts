import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./shared/guards/auth.guard";
import {RoleGuard} from "./shared/guards/role.guard";
import { HomeRoutingModule } from './home/home-routing.module';

const routes: Routes = [
  {
    path: 'employee',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'employee'},
    loadChildren: () =>
      import('./employee/employee-routing.module').then(
        m => m.EmployeeRoutingModule
      ),
  },
  {
    path: 'guest',
    loadChildren: () =>
      import('./guest/guest-routing.module').then(m => m.GuestRoutingModule),
  },
  {
    path: 'manager',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'manager'},
    loadChildren: () =>
      import('./manager/manager-routing.module').then(
        m => m.ManagerRoutingModule
      ),
  },
  {
    path: 'accountant',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'accountant'},
    loadChildren: () =>
      import('./accountant/accountant-routing.module').then(
        m => m.AccountantRoutingModule
      ),
  },
  {
    path: 'team-leader',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'team-leader'},
    loadChildren: () =>
      import('./team-leader/team-leader-routing.module').then(
        m => m.TeamLeaderRoutingModule
      ),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin'},
    loadChildren: () =>
      import('./admin/admin-routing.module').then(
        m => m.AdminRoutingModule
      ),
  },
  {
    path: 'hr',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'hr'},
    loadChildren: () =>
      import('./hr/hr-routing.module').then(
        m => m.HrRoutingModule
      ),
  },
  {
    path: 'secretary',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'secretary'},
    loadChildren: () =>
      import('./secretary/secretary-routing.module').then(
        m => m.SecretaryRoutingModule
      ),
  },
  {
    path: 'technical-admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'technical-admin'},
    loadChildren: () =>
      import('./technical-admin/technical-admin-routing.module').then(
        m => m.TechnicalAdminRoutingModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
        import('./home-page/home-page-routing.module').then(m => m.HomePageRoutingModule),
  },
  /*{
    path : 'home',
    loadChildren: () =>
      import('./home/home-routing.module').then(m => m.HomeRoutingModule),
  },*/
  {
    path :'',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
