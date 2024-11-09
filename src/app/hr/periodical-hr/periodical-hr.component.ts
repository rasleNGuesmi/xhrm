import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ExpenseService} from "../../shared/services/expense/expense.service";
import {UpdateExpenseComponent} from "../../shared/modals/update-expense/update-expense.component";
import {DeleteExpenseComponent} from "../../shared/modals/delete-expense/delete-expense.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-periodical-hr',
  templateUrl: './periodical-hr.component.html',
  styleUrls: ['./periodical-hr.component.scss']
})
export class PeriodicalHrComponent implements OnInit {
  // TODO DEPARTMENT
  enterprise_id: number;
  // TODO DOING
  department_id: number;
  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private expenseService: ExpenseService
  ) { }
  displayedColumns = ['expense_name', 'period', 'amount', 'date', ' '];

  public rows: any[];
  columns = [
    { name: 'expense_name', label: 'Titre' },
    { name: 'period', label: 'Période' },
    { name: 'amount', label: 'Montant' },
    { name: 'date', label: 'à payer avant' },

    {
      name: ' ',
      label: ' ',
      actions: [
        {
          name: 'Modifier',
          icon: 'create',
          actionHandler: this.updateAction.bind(this),
        },
        {
          name: 'Supprimer',
          icon: 'delete_forever',
          actionHandler: this.actionDelete.bind(this),
        },
      ],
    },
  ];

  openDialogUpdate(row: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const dialogRef = this.dialog.open(UpdateExpenseComponent, {
        data: { expense: row },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'update') {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  async updateAction(row: any) {
    try {
      await this.openDialogUpdate(row);
      this.retrieveAllPeriodical();
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  }

  async actionDelete(row: any) {
    try {
      await this.openDialogDelete(row);
      this.retrieveAllPeriodical();
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  }

  openDialogDelete(row: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const dialogRef = this.dialog.open(DeleteExpenseComponent, {
        data: { id: row.expense_id },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'delete') {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  paginatorData = {
    pageIndex: 0,
    pageSize: 10,
    length: 50,
    totalItems: 50,
  };

  ngOnInit(): void {
    // TODO DEPARTMENT
    let id: any = localStorage.getItem('entreprise_id');
    this.enterprise_id = parseInt(id);
    // TODO DOING
    let idD: any = localStorage.getItem('department_id');
    this.department_id = parseInt(idD);
    this.retrieveAllPeriodical();
  }

  retrieveAllPeriodical(): void {
    this.expenseService
      // TODO DEPARTMENT
      //.getExpense(this.enterprise_id)
      // TODO DOING
      .getExpenseByDepartment(this.department_id)
      .subscribe((data: any) => {
        this.dataSource.data = this.takeNelmentsFromTable(
          this.paginatorData.pageSize
        );
        this.paginatorData.length = data.results.length;
      });
  }

  onPaginateChange($event: any) {
    this.paginatorData = $event;
    this.paginatorData.pageSize = $event.pageSize;
    this.paginatorData.pageIndex = $event.pageIndex;
    this.dataSource.data = this.takeNelmentsFromTable($event.pageSize);
  }

  public takeNelmentsFromTable(elements: number) {
    this.expenseService
      // TODO BY DEPARTMENT
      // .getExpense(this.enterprise_id)
      // TODO DOING
      .getExpenseByDepartment(this.department_id)
      .subscribe((data: any) => {
        this.dataSource.data = data.results.map((employee: any) => {
          return {
            ...employee,
            note: employee.note,
            date: this.reformatDate(employee.note),
            link: employee.link,
          };
          console.log('mmm', employee);
        });
      });
    const resultArray: any[] = [];

    if (elements <= this.dataSource.data.length) {
      for (let i = 0; i < elements; i++) {
        resultArray.push(this.dataSource.data[i]);
      }
      return resultArray;
    }

    return this.dataSource.data;
  }

  public sortTable(field: string, direction: string) {
    console.log('direction : ', direction);
    if (direction == 'asc') {
      this.dataSource.data = this.dataSource.data.sort((a, b) =>
        a[field].localeCompare(b[field])
      );
    } else if (direction == 'desc') {
      this.dataSource.data = this.dataSource.data.sort((a, b) =>
        b[field].localeCompare(a[field])
      );
    } else {
      this.retrieveAllPeriodical();
    }
  }
  handleSort($event: any) {
    console.log('sorting event : ', $event);

    this.sortTable($event.active, $event.direction);
  }
  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public reformatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('fr-FR', options);
    return formattedDate;
  }
}
