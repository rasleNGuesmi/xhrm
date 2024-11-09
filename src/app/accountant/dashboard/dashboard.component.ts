import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../shared/services/admin/admin.service';
import { ExpenseService } from '../../shared/services/expense/expense.service';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../shared/services/employee/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private adminService: AdminService,
    private employeeService: EmployeeService,
    private expenseService: ExpenseService
  ) {}
  pending_authorization_number: number;
  pending_leave_number: number;
  list: any[] = [];
  listConnected: any[] = [];
  totalLeave: any;
  totalAuthorization: any;
  enterprise_id: number;
  user_id: number;
  admin_name: any = localStorage.getItem('username');
  remote: number;
  office: number;
  absent: number;
  total: number;
  public rows: any[];
  displayedColumns = ['expense_name', 'period', 'amount', 'note'];
  columns = [
    { name: 'expense_name', label: 'Titre' },
    { name: 'period', label: 'Période' },
    { name: 'amount', label: 'Montant' },
    { name: 'note', label: 'à payer avant' },
  ];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  paginatorData = {
    pageIndex: 0,
    pageSize: 1,
    length: 5,
    totalItems: 50,
  };
  retrieveAllList(): void {
    this.expenseService
      .getExpense(this.enterprise_id)
      .subscribe((data: any) => {
        this.dataSource.data = this.takeNelmentsFromTable(
          this.paginatorData.pageSize
        );
        this.paginatorData.length = data.results.length;
      });
  }

  onPaginateChange($event: any) {
    console.log($event);
    this.paginatorData = $event;
    this.paginatorData.pageSize = $event.pageSize;
    this.paginatorData.pageIndex = $event.pageIndex;
    this.dataSource.data = this.takeNelmentsFromTable($event.pageSize);
  }

  public takeNelmentsFromTable(elements: number) {
    this.expenseService
      .getExpense(this.enterprise_id)
      .subscribe((data: any) => {
        this.dataSource.data = data.results.map((employee: any) => {
          return {
            ...employee,
            note: this.reformatDate(employee.note),
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
      this.retrieveAllList();
    }
  }
  handleSort($event: any) {
    console.log('sorting event : ', $event);

    this.sortTable($event.active, $event.direction);
  }
  onClick() {
    this.router.navigate(['/accountant/authorisation']);
  }
  ngOnInit(): void {
    let idE: any = localStorage.getItem('entreprise_id');
    this.enterprise_id = parseInt(idE);
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    this.getTotalPendings();
    this.getTodayPresence();
    this.retrieveAllList();
    this.getTodayBirthday();
    this.getConnectedEmployees();
    this.getPandingRequests();
  }
  getTotalPendings() {
    return this.adminService
      .getTotalPendings(this.enterprise_id)
      .subscribe((data: any) => {
        this.totalAuthorization = data.results.total_authorization_requests;
        this.totalLeave = data.results.total_leave_requests;
        console.log('total:', data.results);
      });
  }
  getTodayPresence() {
    return this.adminService
      .getTodayPresence(this.enterprise_id)
      .subscribe((data: any) => {
        this.remote = data.results.remote * 100;
        this.office = data.results.office * 100;
        this.absent = data.results.absent * 100;
        this.total = Math.floor(
          (data.results.remote + data.results.office) * 100
        );
        console.log('today:', data.results);
      });
  }
  public reformatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('fr-FR', options);
    return formattedDate;
  }
  getTodayBirthday() {
    return this.adminService
      .getTodayBirthday(this.enterprise_id)
      .subscribe((data: any) => {
        this.list = data.results;
      });
  }
  getConnectedEmployees() {
    return this.adminService
      .getConnectedEmployees(this.enterprise_id)
      .subscribe((data: any) => {
        this.listConnected = data.results;
        console.log('getConnectedEmployees', data.results);
      });
  }
  getPandingRequests() {
    return this.employeeService
      .getPandingRequests(this.user_id)
      .subscribe((data: any) => {
        this.pending_leave_number = data.results.pending_leave_number;
        this.pending_authorization_number =
          data.results.pending_authorization_number;
      });
  }
}
