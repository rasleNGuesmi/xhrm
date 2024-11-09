import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-technical-sidebar',
  templateUrl: './technical-sidebar.component.html',
  styleUrls: ['./technical-sidebar.component.scss']
})
export class TechnicalSidebarComponent {
  refresh_token: string | null;

  constructor(private authService: AuthService) {
    this.refresh_token = localStorage.getItem('refresh_token');
  }

  @Input() sidebarItems: any[];
  @Input() sideBarSettingsItems: any[];

  logout() {
    console.log('refresh_token:', this.refresh_token);
    this.authService.logout(this.refresh_token).subscribe((data: any) => {
      if (data.success) {
        localStorage.clear();
      }
    });
  }
}
