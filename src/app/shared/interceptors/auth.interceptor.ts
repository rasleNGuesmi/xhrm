import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HTTP_INTERCEPTORS, HttpErrorResponse,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {catchError, switchMap, tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      request = this.addTokenToRequest(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && accessToken) {
          localStorage.removeItem("access_token")
          return this.authService.refreshToken().pipe(
            switchMap((response:any) => {
              const newToken= response.results.access_token
              const newRefreshToken= response.results.refresh_token

              // update local storage token values
              this.authService.setAccessToken(newToken)
              this.authService.setRefreshToken(newRefreshToken)

              request = this.addTokenToRequest(request, newToken);
              return next.handle(request);
            }),
            catchError((error: any) => {
              this.authService.logout(this.authService.getRefreshToken());
              return throwError(error);
            })
          );
        }
        return throwError(error);
      })
    );
  }

  addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export const AuthInterceptorProvider = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
];
