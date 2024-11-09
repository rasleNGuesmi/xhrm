import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExpenseService} from "../../services/expense/expense.service";
import {ToastrService} from "ngx-toastr";
import {NgbModal, NgbModalConfig, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Expense} from "../../models/expense";
import {EnterpriseService} from "../../services/enterprise/enterprise.service";

@Component({
  selector: 'app-tech-create-expense',
  templateUrl: './tech-create-expense.component.html',
  styleUrls: ['./tech-create-expense.component.scss']
})
export class TechCreateExpenseComponent implements OnInit {
  @Output() expenseCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private expenseService: ExpenseService,
    private enterpriseService: EnterpriseService,
    private toastr: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) {
    // TODO ENTERPRISE
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  modalRef: NgbModalRef;
  addExpense: FormGroup;
  enterpriseItems: any[] = [];
  open(content: any) {
    this.modalRef = this.modalService.open(content);
  }
  periods = ['Mensuelle', 'Trimestrielle', 'Semestrielle'];

  ngOnInit(): void {
    this.loadEnterprises();
    this.addExpense = this._formBuilder.group({
      enterprise: ['', Validators.required],
      name: ['', Validators.required],
      periodTime: ['', Validators.required],
      amount: ['', Validators.required],
      note: ['', Validators.required],
    });
  }
  get enterprise(): any {
    return this.addExpense.get('enterprie');
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
      enterprise: this.addExpense.value.enterprise
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
  loadEnterprises() {
    this.enterpriseService.getAllEnterprises().subscribe((data:any) => {
      this.enterpriseItems = data.results
    });
  }
}
