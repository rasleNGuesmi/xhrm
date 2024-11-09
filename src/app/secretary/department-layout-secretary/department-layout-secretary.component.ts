import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ManagerService} from "../../shared/services/manager/manager.service";
import { EmployeeService } from "../../shared/services/employee/employee.service";
import * as moment from "moment/moment";
import {MatTableDataSource} from "@angular/material/table";
import {DeleteEmployeeComponent} from "../../shared/modals/delete-employee/delete-employee.component";

const currentDate: string = moment().format('YYYY-MM-DD');

@Component({
  selector: 'app-department-layout-secretary',
  templateUrl: './department-layout-secretary.component.html',
  styleUrls: ['./department-layout-secretary.component.scss']
})
export class DepartmentLayoutSecretaryComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private EmployeeService: EmployeeService,
    private managerService: ManagerService
  ) { }
  public rows: any[];
  enterprise_id: number;
  displayedColumns = [
    'first_name',
    'role',
    'department',
    'team',
    'position',
    'email',
    'contact',
    'Travail',
    ' ',
  ];
  columns = [
    { name: 'first_name', label: 'Nom' },
    { name: 'user_id', label: 'user_id' },
    { name: 'department', label: 'Département' },
    { name: 'role', label: 'Rôle' },
    { name: 'team', label: 'Equipe' },
    { name: 'position', label: 'Profession' },
    { name: 'email', label: 'E-mail' },
    { name: 'contact', label: 'Téléphone' },
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
        {
          name: 'Supprimer',
          icon: 'delete_forever',
          actionHandler: this.deleteAction.bind(this),
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

  sendEmail(row: any) {
    window.open('mailto:' + row.email);
  }

  openDialogDelete(row: any) {
    switch (row.role) {
      case 'Employé(e)': {
        this.dialog.open(DeleteEmployeeComponent, {
          data: { id: row.user_id, role: 'employee' },
        });
        break;
      }
      case 'Manager': {
        this.dialog.open(DeleteEmployeeComponent, {
          data: { id: row.user_id, role: 'manager' },
        });
        break;
      }
      case 'Compatble': {
        this.dialog.open(DeleteEmployeeComponent, {
          data: { id: row.user_id, role: 'accountant' },
        });
        break;
      }
      // TODO FINISH
      /*case 'Hr': {
        this.dialog.open(DeleteEmployeeComponent, {
          data: { id: row.user_id, role: 'accountant' },
        });
        break;
      }*/
    }
  }

  deleteAction(row: any) {
    this.openDialogDelete(row);
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
      // TODO FINISH
      /* TODO UNDERSTAND UNCOMMENT
      case 'Hr': {
        this.router.navigate(['/admin/profile-employee'], {
          queryParams: { role: 'Hr', id: row.user_id },
        });
        break;
      }
      */
    }
  }

  ngOnInit(): void {
    let id: any = localStorage.getItem('entreprise_id');
    this.enterprise_id = parseInt(id);
    this.retrieveAllDepartments();
  }

  retrieveAllDepartments(): void {
    this.EmployeeService.getEmployees(this.enterprise_id).subscribe(
      (deps: any) => {
        this.dataSource.data = this.takeNelmentsFromTable(
          this.paginatorData.pageSize
        );
        this.paginatorData.length = deps.results.length;
        console.log('employees:', deps.results);
      }
    );
  }

  onPaginateChange($event: any) {
    this.paginatorData = $event;
    this.paginatorData.pageSize = $event.pageSize;
    this.paginatorData.pageIndex = $event.pageIndex;
    this.dataSource.data = this.takeNelmentsFromTable($event.pageSize);
    //this.retrieveAllDepartmentsPaginated($event.pageSize, $event.pageIndex);
    // retrieveAllDepartmentsPaginated(pageSize:number,pageIndex:number)
    /*departments.subscribe((data: any) => {
      //this.dataSource.data = data['results'];
      this.paginatorData.length = data['count'];
      console.log(data);
    });*/
  }

  public takeNelmentsFromTable(elements: number) {
    this.EmployeeService.getEmployees(this.enterprise_id).subscribe(
      (data: any) => {
        this.dataSource.data = data.results.map((employee: any) => {
          let presence = employee.presence;
          let roleE = employee.role;
          return {
            ...employee,
            role:
              roleE == 'employee'
                ? 'Employé(e)'
                : roleE == 'manager'
                  ? 'Manager'
                  : roleE == 'hr'
                    ? 'Hr'
                    : roleE == 'team-leader'
                      ? 'Team Leader'
                      : roleE == 'accountant'
                        ? 'Comptable'
                        : roleE == 'secretary'
                          ? 'Secretary'
                          : 'N.D'
            ,
            first_name: employee.first_name + ' ' + employee.last_name,
            team: employee.team ? employee.team : '- - -',
            department: employee.department ? employee.department : '- - -',
            contact: employee.contact ? employee.contact : '- - -',
            position: employee.position ? employee.position : '- - -',
            Travail:
              presence === 'REMOTE'
                ? 'Télétravail'
                : presence === 'OFFICE'
                  ? 'Présentiel'
                  : 'Hors ligne',
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

  public onTeamFilterValueChange(value: any) {
    if (value) {
      this.dataSource.data = this.dataSource.data.filter(
        department => department.team === value
      );
    } else {
      this.retrieveAllDepartments();
    }
  }

  public onDepartmentFilterValueChange(value: any) {
    if (value) {
      this.dataSource.data = this.dataSource.data.filter(
        department => department.department === value
      );
    } else {
      this.retrieveAllDepartments();
    }
  }

  public onProfessionFilterValueChange(value: any) {
    if (value) {
      this.dataSource.data = this.dataSource.data.filter(
        department => department.position === value
      );
    } else {
      this.retrieveAllDepartments();
    }
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public sortTable(field: string, direction: string) {
    if (direction == 'asc') {
      this.dataSource.data = this.dataSource.data.sort((a, b) =>
        a[field].localeCompare(b[field])
      );
    } else if (direction == 'desc') {
      this.dataSource.data = this.dataSource.data.sort((a, b) =>
        b[field].localeCompare(a[field])
      );
    } else {
      this.retrieveAllDepartments();
    }
  }

  handleSort($event: any) {
    this.sortTable($event.active, $event.direction);
  }
}
