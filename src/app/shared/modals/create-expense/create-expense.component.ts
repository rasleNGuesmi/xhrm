import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExpenseService } from '../../services/expense/expense.service';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss'],
})
export class CreateExpenseComponent implements OnInit {
  @Output() expenseCreated: EventEmitter<void> = new EventEmitter<void>();

  enterprise_id: number;
  constructor(
    private expenseService: ExpenseService,
    private toastr: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) {
    let id: any = localStorage.getItem('entreprise_id');
    this.enterprise_id = parseInt(id);
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  modalRef: NgbModalRef;
  addExpense: FormGroup;
  open(content: any) {
    this.modalRef = this.modalService.open(content);
  }
  periods = ['Mensuelle', 'Trimestrielle', 'Semestrielle'];
  ngOnInit(): void {
    this.addExpense = this._formBuilder.group({
      name: ['', Validators.required],
      periodTime: ['', Validators.required],
      amount: ['', Validators.required],
      note: ['', Validators.required],
    });
  }
  get name(): any {
    return this.addExpense.get('name');
  }
  get periodTime(): any {
    return this.addExpense.get('periodTime');
  }
  get amount(): any {
    return this.addExpense.get('amount');
  }
  get note(): any {
    return this.addExpense.get('note');
  }
  createExpense() {
    if (this.addExpense.invalid) {
      this.addExpense.markAllAsTouched();
      this.toastr.error('Veuillez vérifier les champs obligatoires');
      return;
    }
    let expense: Expense = {
      expense_name: this.addExpense.value.name,
      amount: this.addExpense.value.amount,
      note: this.addExpense.value.note,
      period: this.addExpense.value.periodTime,
      enterprise: this.enterprise_id,
    };
    this.expenseService.createExpense(expense).subscribe(
      (data: any) => {
        if (data.success) {
          this.toastr.success('Votre dépense a été ajoutée');
          this.expenseCreated.emit();
          this.modalRef.close();
        }
      },
      (error: any) => {
        this.toastr.error('Veuillez vérifier vos champs');
        console.error(error);
      }
    );
  }
}
