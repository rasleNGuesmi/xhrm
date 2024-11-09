import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../services/authorization/authorization.service';

@Component({
  selector: 'app-delete-authorization',
  templateUrl: './delete-authorization.component.html',
  styleUrls: ['./delete-authorization.component.scss'],
})
export class DeleteAuthorizationComponent implements OnInit {
  id: any;

  constructor(
    private authorizationService: AuthorizationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<DeleteAuthorizationComponent>
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
  }
  onSubmit() {
    this.authorizationService.deleteAuthorization(this.id).subscribe(
      (data: any) => {
        console.log('delete authorization:', data.results);
        if (data.success) {
          this.toastr.success('Votre demande a été supprimé');
          this.dialogRef.close('delete');
        }
      },
      () => {
        this.toastr.error('La suppression de la demande a échouée');
      }
    );
  }
}
