import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Expense } from '../../models/expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}
  // TODO BY DEPARTMENT
  getExpense(id: number) {
    return this.http.get(
      environment.ENTERPRISE_URL + '/get-expenses/' + id + '/'
    );
  }
  // TODO DOING
  getExpenseByDepartment(id: number) {
    return this.http.get(
      environment.DEPARTMENT_URL + '/get-expenses/' + id + '/'
    );
  }
  createExpense(expense: Expense) {
    return this.http.post(environment.EXPENSE_URL + '/add/', expense);
  }
  updateExpense(expense: Expense, id: number) {
    return this.http.put(
      environment.EXPENSE_URL + '/update/' + id + '/',
      expense
    );
  }
  deleteExpense(id: number) {
    return this.http.delete(environment.EXPENSE_URL + '/delete/' + id + '/');
  }
  listExpenses() {
    return this.http.get(environment.EXPENSE_URL + '/list/');
  }
}
