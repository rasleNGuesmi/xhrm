import {Component, Inject, OnInit} from '@angular/core';
import {ExpenseService} from "../../services/expense/expense.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Expense} from "../../models/expense";
import {EnterpriseService} from "../../services/enterprise/enterprise.service";

@Component({
  selector: 'app-tech-update-expense',
  templateUrl: './tech-update-expense.component.html',
  styleUrls: ['./tech-update-expense.component.scss']
})
export class TechUpdateExpenseComponent implements OnInit {
  expense: any;

  constructor(
    private expenseService: ExpenseService,
    private enterpriseService: EnterpriseService,
    private toastr: ToastrService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TechUpdateExpenseComponent>
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  updateExpense: FormGroup;
  enterpriseItems: any[] = [];
  open(content: any) {
    this.modalService.open(content);
  }

  periods = ['Mensuelle', 'Trimestrielle', 'Semestrielle'];
  ngOnInit(): void {
    this.loadEnterprises();
    this.expense = this.data.expense;
    this.updateExpense = this._formBuilder.group({
      enterprise: ['', Validators.required],
      name: ['', Validators.required],
      periodTime: ['', Validators.required],
      amount: ['', Validators.required],
      note: ['', Validators.required],
    });
    this.updateExpense.patchValue({
      enterprise: this.expense.enterprise,
      name: this.expense.expense_name,
      periodTime: this.expense.period,
      amount: this.expense.amount,
      note: this.expense.note,
    });
  }
  get enterprise(): any {
    return this.updateExpense.get('enterprise');
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
      enterprise: this.updateExpense.value.enterprise,
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

  loadEnterprises() {
    this.enterpriseService
      .getAllEnterprises().subscribe((data: any) => {
      this.enterpriseItems = data.results;
    });
  }
}
