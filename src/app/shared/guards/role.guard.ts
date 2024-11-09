import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = route.data['role'];
    const userRole = localStorage.getItem("role");
    if(userRole !== role) {
      this.router.navigate(["/" + userRole + "/dashboard"]);
      return false;
    }
    return true;
  }
}
