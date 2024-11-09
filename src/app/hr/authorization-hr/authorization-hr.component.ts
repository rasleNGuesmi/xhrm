import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import { AuthorizationService } from "../../shared/services/authorization/authorization.service";
import {EmployeeService} from "../../shared/services/employee/employee.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-authorization-hr',
  templateUrl: './authorization-hr.component.html',
  styleUrls: ['./authorization-hr.component.scss']
})
export class AuthorizationHrComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private AuthorizationService: AuthorizationService,
    private employeeService: EmployeeService
  ) { }
  enterprise_id: number;
  department_id: number;
  public rows: any[];
  displayedColumns = [
    'first_name',
    'date',
    'time_out',
    'arrival_time',
    'reason',
    ' ',
  ];
  columns = [
    { name: 'first_name', label: 'Nom' },
    { name: 'date', label: 'Date de début' },
    { name: 'time_out', label: 'De' },
    { name: 'arrival_time', label: 'A' },
    { name: 'reason', label: 'Raison' },
    {
      name: ' ',
      label: ' ',
      actions: [
        {
          name: 'Approuver',
          icon: 'check_circle',
          actionHandler: this.actionAccept.bind(this),
        },
        {
          name: 'Réfuser',
          icon: 'remove_circle',
          actionHandler: this.actionRefuse.bind(this),
        },
      ],
    },
  ];

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  paginatorData = {
    pageIndex: 0,
    pageSize: 10,
    length: 50,
    totalItems: 50,
  };

  ngOnInit(): void {
    let idE: any = localStorage.getItem('entreprise_id');
    this.enterprise_id = parseInt(idE);
    let idD: any = localStorage.getItem('department_id');
    this.department_id = parseInt(idD);
    // TODO CHANGE BY DEPARTMENT
    // TODO DOING
    // this.getAuthorizations(this.enterprise_id);
    this.getAuthorizations(this.department_id);
    this.retrieveAllAuthorization();
  }
  actionAccept(row: any) {
    this.AuthorizationService.acceptAuthorization(
      row.authorization_id,
      row
    ).subscribe(
      (data: any) => {
        this.retrieveAllAuthorization();

        this.toastr.success('Votre authorization a été apprové');

        console.log('accept:', data);
      },
      (error: any) => {
        this.toastr.error(
          "Une erreur s'est produite lors de l'acceptation de l'autorisation"
        );
        console.error(error);
      }
    );
  }
  actionRefuse(row: any) {
    this.AuthorizationService.rejectAuthorization(
      row.authorization_id,
      row
    ).subscribe(
      (data: any) => {
        this.retrieveAllAuthorization();

        this.toastr.success('Votre authorization a été supprimé');

        console.log('reject:', data);
      },
      (error: any) => {
        this.toastr.error(
          "Une erreur s'est produite lors de la suppression de l'autorisation"
        );
        console.error(error);
      }
    );
  }
  retrieveAllAuthorization(): void {
    // TODO CHANGE BY DEPARTMENT
    // TODO DOING
    // this.AuthorizationService.GetListAuthorization(
    this.AuthorizationService.getListAuthorizationByDepartment(
      this.department_id
    ).subscribe((data: any) => {
      this.dataSource.data = this.takeNelmentsFromTable(
        this.paginatorData.pageSize
      );
      this.paginatorData.length = data.results.length;

      console.log(data.results);
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
    // TODO CHANGE BY DEPARTMENT
    // TODO DOING
    // this.AuthorizationService.GetListAuthorization(
    this.AuthorizationService.getListAuthorizationByDepartment(
      this.department_id
    ).subscribe((data: any) => {
      const filteredData = data.results.filter(
        (employee: any) => employee.state === 'PENDING'
      );

      this.dataSource.data = filteredData.map((employee: any) => {
        return {
          ...employee,
          first_name: employee.user.first_name + ' ' + employee.user.last_name,
          avatar:
            employee.user.avatar === null || ' '
              ? 'assets/avatar.png'
              : employee.user.avatar,
          reason: employee.reason ? employee.reason : '- - -',
        };
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
      this.retrieveAllAuthorization();
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
  getAuthorizations(id: number) {
    // TODO CHANGE BY DEPARTMENT
    // TODO DOING
    // return this.AuthorizationService.GetListAuthorization(id).subscribe(
    return this.AuthorizationService.getListAuthorizationByDepartment(id).subscribe(
      (data: any) => {
        console.log('authorization:', data.results);
      }
    );
  }
}
