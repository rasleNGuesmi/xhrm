import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Expense } from '../../models/expense';
import { ExpenseService } from '../../services/expense/expense.service';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.scss'],
})
export class UpdateExpenseComponent implements OnInit {
  expense: any;
  enterprise_id: number;

  constructor(
    private expenseService: ExpenseService,
    private toastr: ToastrService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateExpenseComponent>
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  updateExpense: FormGroup;
  open(content: any) {
    this.modalService.open(content);
  }

  periods = ['Mensuelle', 'Trimestrielle', 'Semestrielle'];
  ngOnInit(): void {
    let id: any = localStorage.getItem('entreprise_id');
    this.enterprise_id = parseInt(id);
    this.expense = this.data.expense;
    this.updateExpense = this._formBuilder.group({
      name: ['', Validators.required],
      periodTime: ['', Validators.required],
      amount: ['', Validators.required],
      note: ['', Validators.required],
    });
    this.updateExpense.patchValue({
      name: this.expense.expense_name,
      periodTime: this.expense.period,
      amount: this.expense.amount,
      note: this.expense.note,
    });
  }
  get name(): any {
    return this.updateExpense.get('name');
  }
  get periodTime(): any {
    return this.updateExpense.get('periodTime');
  }
  get amount(): any {
    return this.updateExpense.get('amount');
  }
  get note(): any {
    return this.updateExpense.get('note');
  }

  update() {
    if (this.updateExpense.invalid) {
      this.updateExpense.markAllAsTouched();
      this.toastr.error('Veuillez vérifier les champs obligatoires');
      return;
    }
    let expense: Expense = {
      note: this.updateExpense.value.note,
      expense_name: this.updateExpense.value.name,
      period: this.updateExpense.value.periodTime,
      amount: this.updateExpense.value.amount,
      enterprise: this.enterprise_id,
    };
    console.log('new sup:', expense);
    return this.expenseService
      .updateExpense(expense, this.expense.expense_id)
      .subscribe(
        (data: any) => {
          console.log('update expense:', data.results);
          this.toastr.success('Dépense mise à jour avec succès!');
          this.dialogRef.close('update'); // Fermer la boîte de dialogue en indiquant la mise à jour réussie
        },
        (error: any) => {
          this.toastr.error('Veuillez vérifier vos champs');
          console.error(error);
        }
      );
  }
}
