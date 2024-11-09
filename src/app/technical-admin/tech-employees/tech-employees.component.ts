import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeService} from "../../shared/services/employee/employee.service";
import {MatTableDataSource} from "@angular/material/table";
import {DeleteEmployeeComponent} from "../../shared/modals/delete-employee/delete-employee.component";

@Component({
  selector: 'app-tech-employees',
  templateUrl: './tech-employees.component.html',
  styleUrls: ['./tech-employees.component.scss']
})
export class TechEmployeesComponent implements OnInit {

  constructor(
    private router: Router,
    public  dialog: MatDialog,
    private employeeService: EmployeeService

  ) { }
  public rows: any[];
  displayedColumns = [
    'full_name',
    'role',
    'enterprise',
    'email',
    'phone',
    ' ',
  ];
  columns = [
    { name: 'full_name', label: 'Nom d\'employé'},
    { name: 'role', label: 'Poste'},
    { name: 'enterprise', label: 'Entreprise'},
    { name: 'email', label: 'Email'},
    { name: 'phone', label: 'Téléphone'},
    {
      name: ' ',
      label: ' ',
      actions: [
        {
          name: 'Voir Profil',
          icon: 'person',
          // actionHandler: this.redirectAction.bind(this),
        },
        {
          name: 'Supprimer',
          icon: 'person',
          actionHandler: this.deleteAction.bind(this),
        }
      ]
    }
  ];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  paginatorData = {
    pageIndex: 0,
    pageSize: 10,
    length: 50,
    totalItems: 50,
  };

  // TODO COPLETE ACTIONS

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
      /*
      case 'Team Leader': {
        this.router.navigate(['/admin/profile-employee'], {
          queryParams: { role: 'team_leader', id: row.user_id },
        });
        break;
      }
      case 'Hr': {
        this.router.navigate(['/admin/profile-employee'], {
          queryParams: { role: 'hr', id: row.user_id },
        });
        break;
      }
      case 'Secretary': {
        this.router.navigate(['/admin/profile-employee'], {
          queryParams: { role: 'secretary', id: row.user_id },
        });
        break;
      }
       */
    }
  }

  async deleteAction(row: any) {
    try {
      await this.openDialogDelete(row);
      // TODO CHECK
      this.retrieveAllEmployees();
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  }

  openDialogDelete(row: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let dialogRef: any;
      /* TODO OTHER ROLES */
      switch (row.role) {
        case 'Employé(e)': {
          dialogRef = this.dialog.open(DeleteEmployeeComponent, {
            data: {
              id: row.user_id,
              role: 'employee',
            },
          });
          break;
        }
        case 'Manager': {
          dialogRef = this.dialog.open(DeleteEmployeeComponent, {
            data: {
              id: row.user_id,
              role: 'manager',
            },
          });
          break;
        }
        case 'Comptable': {
          dialogRef = this.dialog.open(DeleteEmployeeComponent, {
            data: {
              id: row.user_id,
              role: 'accountant',
            },
          });
          break;
        }
      }

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === 'delete') {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  ngOnInit(): void {
    this.retrieveAllEmployees();
  }

  retrieveAllEmployees(): void {
    this.employeeService.retrieveAllEmployees().subscribe(
      (employees: any) => {
        this.dataSource.data = this.takeNelmentsFromTable(
          this.paginatorData.pageSize
        );
        this.paginatorData.length = employees.results.length;
        console.log('employees:', employees.results);
      }
    )
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
    this.employeeService.retrieveAllEmployees().subscribe(
    //this.EmployeeService.getEmployees(this.enterprise_id).subscribe(
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
            full_name: employee.first_name + ' ' + employee.last_name,
            team: employee.team,
            department: employee.department,
            contact: employee.contact,
            position: employee.position,
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

  // TODO FILTERS

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
      this.retrieveAllEmployees();
    }
  }

  handleSort($event: any) {
    this.sortTable($event.active, $event.direction);
  }
}
