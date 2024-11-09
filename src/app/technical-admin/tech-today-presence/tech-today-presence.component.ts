import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EmployeeService} from "../../shared/services/employee/employee.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-tech-today-presence',
  templateUrl: './tech-today-presence.component.html',
  styleUrls: ['./tech-today-presence.component.scss']
})
export class TechTodayPresenceComponent implements OnInit {

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  public rows: any[];
  displayedColumns = [
    'first_name',
    'enterprise',
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
    { name: 'enterprise', label: 'Entreprise' },
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
    this.retrieveAllPresence();
  }
  retrieveAllPresence(): void {
    this.employeeService.listEmployeesPresence().subscribe(
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
    this.employeeService.listEmployeesPresence().subscribe(
      (data: any) => {
        this.dataSource.data = data.results.map((employee: any) => {
          let workMode = employee.presence;
          let roleE = employee.role;
          return {
            ...employee,
            role:
              roleE == 'employee'
                ? 'Employé(e)'
                : roleE == 'manager'
                  ? 'Manager'
                  : roleE == 'accountant'
                    ? 'Comptable'
                    : roleE == 'hr'
                      ? 'HR'
                      : roleE == 'manager'
                        ? 'Manager'
                        : roleE == 'team-leader'
                          ? 'Team Leader'
                          : roleE == 'secretary'
                            ? 'Secretary' : '---',
            first_name: employee.first_name + ' ' + employee.last_name,
            team: employee.team,
            department: employee.department,
            'clock-in': employee.clockings.clocks.clockin? new Date(
              employee.clockings.clocks.clockin
            ).toLocaleTimeString() : '---',
            'clock-out': employee.clockings.clocks.clockout ? new Date(
              employee.clockings.clocks.clockout
            ).toLocaleTimeString() : '---',
            Travail:
              workMode === 'REMOTE'
                ? 'Télétravail'
                : workMode === 'OFFICE'
                  ? 'Présentiel'
                  : 'Hors ligne',
            user_id: employee.user_id,
            position: employee.position,
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
      this.retrieveAllPresence();
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
      this.retrieveAllPresence();
    }
  }

  public onDepartmentFilterValueChange(value: any) {
    if (value) {
      this.dataSource.data = this.dataSource.data.filter(
        department => department.Département === value
      );
    } else {
      this.retrieveAllPresence();
    }
  }

  public onProfessionFilterValueChange(value: any) {
    if (value) {
      this.dataSource.data = this.dataSource.data.filter(
        department => department.Profession === value
      );
    } else {
      this.retrieveAllPresence();
    }
  }
  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  redirectAction(row: any) {
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
