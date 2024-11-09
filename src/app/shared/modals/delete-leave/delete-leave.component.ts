import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LeaveService } from '../../services/leave/leave.service';

@Component({
  selector: 'app-delete-leave',
  templateUrl: './delete-leave.component.html',
  styleUrls: ['./delete-leave.component.scss'],
})
export class DeleteLeaveComponent implements OnInit {
  id: any;

  constructor(
    private leaveService: LeaveService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<DeleteLeaveComponent>
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
  }
  onSubmit() {
    this.leaveService.deleteLeave(this.id).subscribe(
      (data: any) => {
        console.log('delete leave:', data.results);
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
