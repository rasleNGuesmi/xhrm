import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { LoginRequest } from '../../shared/models/auth/LoginRequest';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class LoginComponent {
  eyeSlash: boolean = true;
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  onclick() {
    let loginRequest: LoginRequest = {
      username: this.username,
      password: this.password,
    };
    this.login(loginRequest);
  }
  login(loginrequest: LoginRequest) {
    this.authService.login(loginrequest).subscribe(
      (data: any) => {
        console.log('data:', data);

        if (data.success) {
          localStorage.setItem('access_token', data.results.access_token);
          localStorage.setItem('refresh_token', data.results.refresh_token);
          localStorage.setItem('role', data.results.role);
          localStorage.setItem('username', data.results.username);
          localStorage.setItem('entreprise_id', data.results.enterprise_id);

          switch (data.results.role) {
            case 'admin': {
              this.route.navigate(['/admin/dashboard']);

              break;
            }
            case 'employee': {
              localStorage.setItem('user_id', data.results.user_id);
              localStorage.setItem('team_id', data.results.team_id);

              this.route.navigate(['/employee/dashboard']);
              break;
            }
            case 'manager': {
              localStorage.setItem('user_id', data.results.user_id);
              localStorage.setItem('department_id', data.results.department_id);

              this.route.navigate(['/manager/dashboard']);
              break;
            }
            case 'accountant': {
              localStorage.setItem('user_id', data.results.user_id);

              this.route.navigate(['/accountant/dashboard']);
              break;
            }
            case 'team-leader': {
              localStorage.setItem('user_id', data.results.user_id);
              localStorage.setItem('team_id', data.results.team_id);

              this.route.navigate(['/team-leader/dashboard']);
              break;
            }
            case 'hr': {
              localStorage.setItem('user_id', data.results.user_id);
              localStorage.setItem('department_id', data.results.department_id);

              this.route.navigate(['/hr/dashboard']);
              break;
            }
            case 'secretary': {
              localStorage.setItem('user_id', data.results.user_id);

              this.route.navigate(['/secretary/dashboard']);
              break;
            }
            case 'technical-admin': {
              localStorage.setItem('user_id', data.results.user_id);

              this.route.navigate(['/technical-admin/dashboard']);
              break;
            }
          }
        }
      },
      (error: any) => {
        this.toastr.error("Nom d'utilisateur ou mot de passe invalide");
        console.error(error);
      }
    );
  }
  visible: boolean = true;
  isLinear: boolean = true;

  password_visible() {
    this.visible = !this.visible;
  }
}
