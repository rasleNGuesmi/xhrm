import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { th } from 'date-fns/locale';
import { filter } from 'rxjs/operators';
interface data {
  iconName: string;
  title: string;
  url: string;
}
const sidebarItems: data[] = [
  {
    title: 'dashboard',
    iconName: 'dashboard',
    url: '/admin/dashboard',
  },
  { title: 'employees', iconName: 'groups', url: '/admin/employees' },
  { title: 'presence', iconName: 'back_hand', url: '/admin/presence' },
  {
    title: 'authorisation',
    iconName: 'calendar_month',
    url: '/admin/authorisation',
  },
  { title: 'expenses', iconName: 'point_of_sale', url: '/admin/expenses' },
];

const sideBarSettingsItems: data[] = [
  { title: 'settings', iconName: 'settings', url: '/admin/settings' },
  { title: 'logout', iconName: 'exit_to_app', url: '/guest/login' },
];
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  path: string = '';
  constructor(private router: Router) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        //console.log(event.toString());
        let route = this.router.url.split('/');
        this.path = route[2];
        if (this.path.startsWith('profile-employee')) {
          this.path = 'profile-employee';
        }
        if (
          this.path !== 'dashboard' &&
          this.path !== 'employees' &&
          this.path !== 'presence' &&
          this.path !== 'authorisation' &&
          this.path !== 'settings' &&
          !this.path.startsWith('profile-employee') &&
          this.path !== 'expenses'
        ) {
          this.path = 'Error';
        }
      });
  }
  sidebarItems = sidebarItems;
  sideBarSettingsItems = sideBarSettingsItems;
  username: string | null = localStorage.getItem('username');
}
