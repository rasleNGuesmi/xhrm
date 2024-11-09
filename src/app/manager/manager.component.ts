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
    url: '/manager/dashboard',
  },
  { title: 'employees', iconName: 'groups', url: '/manager/employees' },
  { title: 'presence', iconName: 'back_hand', url: '/manager/presence' },
  {
    title: 'authorisation',
    iconName: 'calendar_month',
    url: '/manager/authorisation',
  },
  { title: 'expenses', iconName: 'point_of_sale', url: '/manager/expenses' },
];

const sideBarSettingsItems: data[] = [
  { title: 'settings', iconName: 'settings', url: '/manager/settings' },
  { title: 'logout', iconName: 'exit_to_app', url: '/guest/login' },
];
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent {
  path: string = '';
  username: string | null = localStorage.getItem('username');
  constructor(private router: Router) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        //console.log(event.toString());
        let route = this.router.url.split('/');
        this.path = route[2];
        // this.path = route[2]; // TODO REMOVE DUPLICATE
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
