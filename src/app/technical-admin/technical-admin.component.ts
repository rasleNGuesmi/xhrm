import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
interface data {
  iconName: string;
  title: string;
  url: string;
}
const sidebarItems: data[] = [
  {
    title: 'dashboard',
    iconName: 'dashboard',
    url: '/technical-admin/dashboard',
  },
  {
    title: 'enterprises',
    iconName: 'dashboard', // TODO CHANGE
    url: '/technical-admin/enterprises',
  },
  {
    title: 'employees',
    iconName: 'dashboard', // TODO CHANGE
    url: '/technical-admin/employees'
  },
  {
    title: 'suppliers',
    iconName: 'dashboard', // TODO CHANGE
    url: '/technical-admin/suppliers'
  },
  {
    title: 'présences',
    iconName: 'dashboard', // TODO CHANGE
    url: '/technical-admin/presence'
  },
  {
    title: 'authorizations',
    iconName: 'dashboard', // TODO CHANGE
    url: '/technical-admin/authorizations'
  },
  {
    title: 'expenses',
    iconName: 'dashboard', // TODO CHANGE
    url: '/technical-admin/expenses'
  }
]

const sideBarSettingsItems: data[] = [
  { title: 'settings', iconName: 'settings', url: '/admin/settings' },
  { title: 'logout', iconName: 'exit_to_app', url: '/guest/login' },
];
@Component({
  selector: 'app-technical-admin',
  templateUrl: './technical-admin.component.html',
  styleUrls: ['./technical-admin.component.scss']
})
export class TechnicalAdminComponent {
  path: string = '';
  constructor(private router: Router) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        //console.log(event.toString());
        let route = this.router.url.split('/');
        // TODO new routes
        this.path = route[2];
        if (this.path.startsWith('profile-employee')) {
          this.path = 'profile-employee';
        }
        if (
          this.path !== 'dashboard' &&
          this.path !== 'enterprises' &&
          this.path !== 'employees' &&
          this.path !== 'suppliers' &&
          this.path !== 'presence' &&
          this.path !== 'expenses' &&
          this.path !== 'authorizations'
          // this.path !== 'presence' &&
          // this.path !== 'authorisation' &&
          // this.path !== 'settings' &&
          // !this.path.startsWith('profile-employee') &&
          // this.path !== 'expenses'
        ) {
          this.path = 'Error';
        }
      });
  }
  sidebarItems = sidebarItems;
  sideBarSettingsItems = sideBarSettingsItems;
  username: string | null = localStorage.getItem('username');
}
