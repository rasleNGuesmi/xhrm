import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
    url: '/accountant/dashboard',
  },
  { title: 'presence', iconName: 'back_hand', url: '/accountant/presence' },
  {
    title: 'authorisation',
    iconName: 'calendar_month',
    url: '/accountant/authorisation',
  },
  { title: 'expenses', iconName: 'point_of_sale', url: '/accountant/expenses' },
];

const sideBarSettingsItems: data[] = [
  { title: 'settings', iconName: 'settings', url: '/accountant/settings' },
  { title: 'logout', iconName: 'exit_to_app', url: '/guest/login' },
];
@Component({
  selector: 'app-accountant',
  templateUrl: './accountant.component.html',
  styleUrls: ['./accountant.component.scss'],
})
export class AccountantComponent {
  path: string = '';
  username: string | null = localStorage.getItem('username');
  constructor(private router: Router) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        //console.log(event.toString());
        let route = this.router.url.split('/');
        this.path = route[2];
        this.path = route[2];
        if (
          this.path !== 'dashboard' &&
          this.path !== 'employees' &&
          this.path !== 'presence' &&
          this.path !== 'authorisation' &&
          this.path !== 'settings' &&
          this.path !== 'expenses'
        ) {
          this.path = 'Error';
        }
      });
  }
  sidebarItems = sidebarItems;
  sideBarSettingsItems = sideBarSettingsItems;
}
