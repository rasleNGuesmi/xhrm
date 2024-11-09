import { Injectable, NgModule } from '@angular/core';
import { CanActivate, Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [

  {
    path: '',
    component:HomeComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
/*@Injectable({
  providedIn: 'root'
})*/
export class HomeRoutingModule /*implements CanActivate*/{ 
  /*constructor(private router: Router){}
  canActivate(): boolean  {
    this.router.navigate(['/home']);
    return false;
  }*/
}
