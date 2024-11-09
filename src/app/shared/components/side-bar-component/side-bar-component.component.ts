import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RequestRefreshToken } from '../../models/auth/RefreshTokenRequest';

@Component({
  selector: 'app-side-bar-component',
  templateUrl: './side-bar-component.component.html',
  styleUrls: ['./side-bar-component.component.scss'],
})
export class SideBarComponentComponent {
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