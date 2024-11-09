import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExpenseService } from '../../services/expense/expense.service';

@Component({
  selector: 'app-delete-expense',
  templateUrl: './delete-expense.component.html',
  styleUrls: ['./delete-expense.component.scss'],
})
export class DeleteExpenseComponent implements OnInit {
  id: any;

  constructor(
    private expenseService: ExpenseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<DeleteExpenseComponent>
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
  }
  onSubmit() {
    this.expenseService.deleteExpense(this.id).subscribe(
      (data: any) => {
        console.log('delete expense:', data.results);
        if (data.success) {
          this.toastr.success('Votre dépense a été supprimé');
          this.dialogRef.close('delete');
        }
      },
      () => {
        this.toastr.error('La suppression de la dépense a échouée');
      }
    );
  }
}
