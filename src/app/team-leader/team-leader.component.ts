import { Component } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
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
    url: '/team-leader/dashboard',
  },
  { title: 'employees', iconName: 'groups', url: '/team-leader/employees' },
  { title: 'presence', iconName: 'back_hand', url: '/team-leader/presence' },
  {
    title: 'authorisation',
    iconName: 'calendar_month',
    url: '/team-leader/authorization',
  },
  { title: 'expenses', iconName: 'point_of_sale', url: '/team-leader/expenses' },
];

const sideBarSettingsItems: data[] = [
  { title: 'settings', iconName: 'settings', url: '/team-leader/settings' },
  { title: 'logout', iconName: 'exit_to_app', url: '/guest/login' },
];
@Component({
  selector: 'app-team-leader',
  templateUrl: './team-leader.component.html',
  styleUrls: ['./team-leader.component.scss']
})
export class TeamLeaderComponent {
  path: string = '';
  username: string | null = localStorage.getItem('username');
  constructor(private router: Router) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        let route =  this.router.url.split('/');
        this.path !== route[2];
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
