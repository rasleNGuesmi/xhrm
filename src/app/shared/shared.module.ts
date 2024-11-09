import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SideBarComponentComponent } from './components/side-bar-component/side-bar-component.component';
import { HeaderComponentComponent } from './components/header-component/header-component.component';
import { FilterComponent } from './components/filter/filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CreateEmployeeComponent } from './modals/create-employee/create-employee.component';
import { MatCardModule } from '@angular/material/card';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { LeaveRequestComponent } from './modals/leave-request/leave-request.component';
import { AuthorizationRequestComponent } from './modals/authorization-request/authorization-request.component';
import { PurchaseRequestComponent } from './modals/purchase-request/purchase-request.component';
import { CreateSupplierComponent } from './modals/create-supplier/create-supplier.component';
import { CreateExpenseComponent } from './modals/create-expense/create-expense.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import {
  CalendarCommonModule,
  CalendarDayModule,
  CalendarModule,
  CalendarMonthModule,
  CalendarWeekModule,
  DateAdapter,
} from 'angular-calendar';
import { MatTabsModule } from '@angular/material/tabs';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TableComponent } from './components/table/table.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteEmployeeComponent } from './modals/delete-employee/delete-employee.component';

import { MatDialogModule } from '@angular/material/dialog';
import { DeleteExpenseComponent } from './modals/delete-expense/delete-expense.component';
import { UpdateExpenseComponent } from './modals/update-expense/update-expense.component';
import { UpdateSupplierComponent } from './modals/update-supplier/update-supplier.component';
import { UpdateLeaveRequestComponent } from './modals/update-leave-request/update-leave-request.component';
import { UpdateAuthorizationRequestComponent } from './modals/update-authorization-request/update-authorization-request.component';
import { UpdatePurchaseRequestComponent } from './modals/update-purchase-request/update-purchase-request.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CircleProgressComponent } from './components/circle-progress/circle-progress.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ChunkPipePipe } from './components/chunk-pipe.pipe';
import { Page404Component } from './components/page404/page404.component';
import { ChangePasswordComponent } from './modals/change-password/change-password.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { DeleteSupplierComponent } from './modals/delete-supplier/delete-supplier.component';
import { FilterPositionComponent } from './components/filter-position/filter-position.component';
import { DeleteLeaveComponent } from './modals/delete-leave/delete-leave.component';
import { DeleteAuthorizationComponent } from './modals/delete-authorization/delete-authorization.component';
import { DeletePurchaseComponent } from './modals/delete-purchase/delete-purchase.component';
import { FilterTeamComponent } from './components/filter-team/filter-team.component';
import {TechnicalHeaderComponent} from "./components/technical-header/technical-header.component";
import { TechnicalSidebarComponent } from './components/technical-sidebar/technical-sidebar.component';
import { EnterpriseFormComponent } from './modals/create-enterprise/enterprise-form/enterprise-form.component';
import {CompanySignupComponent} from "./components/signup/company-signup/company-signup.component";
import {StepOneComponent} from "./components/signup/step-one/step-one.component";
import {StepTwoComponent} from "./components/signup/step-two/step-two.component";
import {StepThreeComponent} from "./components/signup/step-three/step-three.component";
import { DeleteEnterpriseComponent } from './modals/delete-enterprise/delete-enterprise.component';
import { TechCreateEmployeeComponent } from './modals/tech-create-employee/tech-create-employee.component';
import { TechCreateSupplierComponent } from './modals/tech-create-supplier/tech-create-supplier.component';
import { TechUpdateSupplierComponent } from './modals/tech-update-supplier/tech-update-supplier.component';
import { TechLeaveRequestComponent } from './modals/tech-leave-request/tech-leave-request.component';
import { TechAuthorizationRequestComponent } from './modals/tech-authorization-request/tech-authorization-request.component';
import { TechUpdateExpenseComponent } from './modals/tech-update-expense/tech-update-expense.component';
import { TechCreateExpenseComponent } from './modals/tech-create-expense/tech-create-expense.component';
import { TechPurchaseRequestComponent } from './modals/tech-purchase-request/tech-purchase-request.component';

@NgModule({
  declarations: [
    SideBarComponentComponent,
    HeaderComponentComponent,
    FilterComponent,
    CreateEmployeeComponent,
    HeaderMenuComponent,
    LeaveRequestComponent,
    AuthorizationRequestComponent,
    PurchaseRequestComponent,
    CreateSupplierComponent,
    CreateExpenseComponent,
    CalendarComponent,
    TableComponent,
    PaginatorComponent,
    DeleteEmployeeComponent,
    DeleteExpenseComponent,
    UpdateExpenseComponent,
    UpdateSupplierComponent,
    UpdateLeaveRequestComponent,
    UpdateAuthorizationRequestComponent,
    UpdatePurchaseRequestComponent,
    SearchBarComponent,
    CircleProgressComponent,
    RightSidebarComponent,
    ChunkPipePipe,
    Page404Component,
    ChangePasswordComponent,
    DeleteSupplierComponent,
    FilterPositionComponent,
    DeleteLeaveComponent,
    DeleteAuthorizationComponent,
    DeletePurchaseComponent,
    FilterTeamComponent,
    TechnicalHeaderComponent,
    TechnicalHeaderComponent,
    TechnicalSidebarComponent,
    EnterpriseFormComponent,
    CompanySignupComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    DeleteEnterpriseComponent,
    TechCreateEmployeeComponent,
    TechCreateSupplierComponent,
    TechUpdateSupplierComponent,
    TechLeaveRequestComponent,
    TechAuthorizationRequestComponent,
    TechUpdateExpenseComponent,
    TechCreateExpenseComponent,
    TechPurchaseRequestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NgbModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule,
    MatMenuModule,
    CalendarCommonModule,
    CalendarMonthModule,
    CalendarWeekModule,
    CalendarDayModule,
    MatCardModule,
    MatTabsModule,
    CalendarCommonModule,
    CalendarMonthModule,
    CalendarWeekModule,
    CalendarDayModule,
    FlatpickrModule,
    MatMenuModule,
    MatTabsModule,
    CalendarCommonModule,
    CalendarMonthModule,
    CalendarWeekModule,
    CalendarDayModule,
    MatSlideToggleModule,
    MatCardModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    ToastrModule.forRoot(),
    MatInputModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 50,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
    }),
    MatSidenavModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    TranslateModule,
    HeaderComponentComponent,
    SideBarComponentComponent,
    FilterComponent,
    CreateEmployeeComponent,
    HeaderMenuComponent,
    LeaveRequestComponent,
    AuthorizationRequestComponent,
    PurchaseRequestComponent,
    CreateSupplierComponent,
    CreateExpenseComponent,
    CalendarComponent,
    MatCardModule,
    MatTabsModule,
    CalendarCommonModule,
    CalendarMonthModule,
    CalendarWeekModule,
    CalendarDayModule,
    FlatpickrModule,
    MatMenuModule,
    MatTabsModule,
    CalendarCommonModule,
    CalendarMonthModule,
    CalendarWeekModule,
    CalendarDayModule,
    MatSlideToggleModule,
    TableComponent,
    MatCardModule,
    SearchBarComponent,
    CircleProgressComponent,
    RightSidebarComponent,
    ChangePasswordComponent,
    FilterPositionComponent,
    FilterTeamComponent,
    TechnicalHeaderComponent,
    TechnicalSidebarComponent,
    EnterpriseFormComponent,
    TechCreateEmployeeComponent,
    TechCreateSupplierComponent,
    TechLeaveRequestComponent,
    TechAuthorizationRequestComponent,
    TechCreateExpenseComponent,
    TechPurchaseRequestComponent,
  ],
  bootstrap: [AppComponent],
})
export class SharedModule {}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/lang/', '.json');
}
