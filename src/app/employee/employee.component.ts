import { Component } from '@angular/core';
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
    url: '/employee/dashboard',
  },
  { title: 'employees', iconName: 'groups', url: '/employee/employees' },
  { title: 'presence', iconName: 'back_hand', url: '/employee/presence' },
  {
    title: 'authorisation',
    iconName: 'calendar_month',
    url: '/employee/authorisation',
  },
  { title: 'expenses', iconName: 'point_of_sale', url: '/employee/expenses' },
];

const sideBarSettingsItems: data[] = [
  { title: 'settings', iconName: 'settings', url: '/employee/settings' },
  { title: 'logout', iconName: 'exit_to_app', url: '/guest/login' },
];

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
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
      {
          this.path = 'Error';
        }
      });
    }
}
