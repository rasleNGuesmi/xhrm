import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EmployeeService} from "../../shared/services/employee/employee.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-historic-presence-hr',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {
  department_id: number;

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  public rows: any[];
  displayedColumns = [
    'first_name',
    'role',
    'department',
    'team',
    'position',
    'clock-in',
    'clock-out',
    'Travail',
    ' ',
  ];

  columns = [
    { name: 'first_name', label: 'Nom' },
    { name: 'role', label: 'Rôle' },
    { name: 'department', label: 'Département' },
    { name: 'team', label: 'Equipe' },
    { name: 'position', label: 'Profession' },
    { name: 'clock-in', label: 'Clock-in' },
    { name: 'clock-out', label: 'Clock-out' },
    { name: 'Travail', label: 'Travail' },
    {
      name: ' ',
      label: ' ',
      actions: [
        {
          name: 'Voir Profil',
          icon: 'person',
          actionHandler: this.redirectAction.bind(this),
        },
        {
          name: 'Envoyer Email',
          icon: 'email',
          actionHandler: this.sendEmail.bind(this),
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
    let id_department:any = localStorage.getItem('department_id');
    this.department_id = parseInt(id_department);
    console.log("DEPARTMENT_ID One: "+this.department_id);
    this.retrieveAllHistoric();
  }
  retrieveAllHistoric(): void {
    console.log("DEPARTMENT_ID Two: "+this.department_id);
    this.employeeService.getEmployeesPresenceByDepartment(this.department_id).subscribe(
      (deps: any) => {
        this.dataSource.data = this.takeNelmentsFromTable(
          this.paginatorData.pageSize
        );
        this.paginatorData.length = deps.length;
        console.log('employees:', deps.results);
      }
    );
  }

  onPaginateChange($event: any) {
    this.paginatorData = $event;
    this.paginatorData.pageSize = $event.pageSize;
    this.paginatorData.pageIndex = $event.pageIndex;
    this.dataSource.data = this.takeNelmentsFromTable($event.pageSize);
  }

  public takeNelmentsFromTable(elements: number) {
    this.employeeService.getEmployeesPresenceByDepartment(this.department_id).subscribe(
      (data: any) => {
        this.dataSource.data = data.results.map((employee: any) => {
          let workMode = employee.presence;
          let roleE = employee.role;
          return {
            ...employee,
            role: /* TODO FINISH OTHER ROLES */
              roleE == 'employee'
                ? 'Employé(e)'
                : roleE == 'manager'
                  ? 'Manager'
                  : 'Comptable',
            first_name: employee.first_name + ' ' + employee.last_name,
            team: employee.team ? employee.team : '- - -',
            department: employee.department ? employee.department : '- - -',
            'clock-in': employee.clockings.clocks.clockin
              ? new Date(employee.clockings.clocks.clockin).toLocaleTimeString()
              : '- - -',
            'clock-out': employee.clockings.clocks.clockout
              ? new Date(
                employee.clockings.clocks.clockout
              ).toLocaleTimeString()
              : '- - -',
            Travail:
              workMode === 'REMOTE'
                ? 'Télétravail'
                : workMode === 'OFFICE'
                  ? 'Présentiel'
                  : 'Hors ligne',
            user_id: employee.user_id,
            position: employee.position ? employee.position : '- - -',
            avatar:
              employee.avatar === null ? 'assets/avatar.png' : employee.avatar,
          };
        });
      }
    );

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
      this.retrieveAllHistoric();
    }
  }
  handleSort($event: any) {
    console.log('sorting event : ', $event);

    this.sortTable($event.active, $event.direction);
  }
  public onTeamFilterValueChange(value: any) {
    if (value) {
      this.dataSource.data = this.dataSource.data.filter(
        department => department.Equipe === value
      );
    } else {
      this.retrieveAllHistoric();
    }
  }
  public onDepartmentFilterValueChange(value: any) {
    if (value) {
      this.dataSource.data = this.dataSource.data.filter(
        department => department.Département === value
      );
    } else {
      this.retrieveAllHistoric();
    }
  }

  public onProfessionFilterValueChange(value: any) {
    if (value) {
      this.dataSource.data = this.dataSource.data.filter(
        department => department.Profession === value
      );
    } else {
      this.retrieveAllHistoric();
    }
  }
  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /* TODO CHANGE BY HR */
  redirectAction(row: any) {
    /* TODO ADD OTHER ROLES */
    switch (row.role) {
      case 'Employé(e)': {
        this.router.navigate(['/admin/profile-employee'], {
          queryParams: { role: 'employee', id: row.user_id },
        });
        break;
      }
      case 'Manager': {
        this.router.navigate(['/admin/profile-employee'], {
          queryParams: { role: 'manager', id: row.user_id },
        });
        break;
      }
      case 'Comptable': {
        this.router.navigate(['/admin/profile-employee'], {
          queryParams: { role: 'accountant', id: row.user_id },
        });
        break;
      }
    }
  }

  sendEmail(row: any) {
    window.open('mailto:' + row.email);
  }
}