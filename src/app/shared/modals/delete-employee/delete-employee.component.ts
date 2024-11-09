import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee/employee.service';
import { ManagerService } from '../../services/manager/manager.service';
import { AccountantService } from '../../services/accountant/accountant.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss'],
})
export class DeleteEmployeeComponent implements OnInit {
  id: any;
  role: any;

  constructor(
    private employeeService: EmployeeService,
    private managerService: ManagerService,
    private accountantService: AccountantService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteEmployeeComponent>
  ) {}

  ngOnInit() {
    this.id = this.data.id;
    this.role = this.data.role;
  }

  onSubmit() {
    console.log(this.role);
    switch (this.role) {
      case 'employee': {
        this.employeeService.deleteEmployee(this.id).subscribe(
          () => {
            this.toastr.success('Votre employé a été supprimé');
            this.dialogRef.close('delete'); // Fermer la boîte de dialogue en indiquant la mise à jour réussie
          },
          () => {
            this.toastr.error("La suppression de l'employé a échoué");
          }
        );
        break;
      }
      case 'manager': {
        this.managerService.deleteManager(this.id).subscribe(
          (data: any) => {
            if (data.success) {
              this.toastr.success('Votre manager a été supprimé');
              this.dialogRef.close('delete'); // Fermer la boîte de dialogue en indiquant la mise à jour réussie
            }
          },
          () => {
            this.toastr.error('La suppression du manager a échoué');
          }
        );
        break;
      }
      case 'accountant': {
        this.accountantService.deleteAccountant(this.id).subscribe(
          (data: any) => {
            if (data.success) {
              this.toastr.success('Votre comptable a été supprimé');
              this.dialogRef.close('delete'); // Fermer la boîte de dialogue en indiquant la mise à jour réussie
            }
          },
          () => {
            this.toastr.error('La suppression du comptable a échoué');
          }
        );
        break;
      }
    }
  }
}
