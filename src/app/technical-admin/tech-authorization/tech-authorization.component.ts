import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AuthorizationService} from "../../shared/services/authorization/authorization.service";
import {EmployeeService} from "../../shared/services/employee/employee.service";
import {MatTableDataSource} from "@angular/material/table";
import {DeleteAuthorizationComponent} from "../../shared/modals/delete-authorization/delete-authorization.component";
import {MatDialog} from "@angular/material/dialog";
import {
  UpdateAuthorizationRequestComponent
} from "../../shared/modals/update-authorization-request/update-authorization-request.component";

@Component({
  selector: 'app-tech-authorization',
  templateUrl: './tech-authorization.component.html',
  styleUrls: ['./tech-authorization.component.scss']
})
export class TechAuthorizationComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private authorizationService: AuthorizationService,
    public dialog: MatDialog,
    private employeeService: EmployeeService
  ) { }
  public rows: any[];
  displayedColumns = [
    'first_name',
    'enterprise',
    'date',
    'time_out',
    'arrival_time',
    'reason',
    'state',
    ' ',
  ];
  columns = [
    { name: 'first_name', label: 'Nom' },
    { name: 'enterprise', label: 'Entreprise' },
    { name: 'date', label: 'Date de début' },
    { name: 'time_out', label: 'De' },
    { name: 'arrival_time', label: 'A' },
    { name: 'reason', label: 'Raison' },
    { name: 'state', label: 'Etat' },
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

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  paginatorData = {
    pageIndex: 0,
    pageSize: 10,
    length: 50,
    totalItems: 50,
  };

  ngOnInit(): void {
    // TODO CHECK
    // this.getAuthorizations();
    this.retrieveAllAuthorization();
  }
  actionAccept(row: any) {
    this.authorizationService.acceptAuthorization(
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
    this.authorizationService.rejectAuthorization(
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
  async actionDelete(row: any) {
    try {
      await this.openDialogDelete(row);
      this.retrieveAllAuthorization();
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  }
  openDialogDelete(row: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const dialogRef = this.dialog.open(DeleteAuthorizationComponent, {
        data: { id: row.authorization_id }, /* TODO CHECK IF IT'S AUTH_REQU_ID */
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
  async updateAction(row: any) {
    try {
      await this.openDialogUpdate(row);
      this.retrieveAllAuthorization();
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  }
  // TODO UPDATE ENTERPRISE AND USER
  openDialogUpdate(row: any): Promise<void> {
    return new Promise<void> ((resolve, reject) => {
      const dialogRef = this.dialog.open(UpdateAuthorizationRequestComponent, {
        data: {authorization: row},
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

  retrieveAllAuthorization(): void {
    this.authorizationService.listAuthorizationRequests()
      .subscribe((data: any) => {
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
    this.authorizationService.listAuthorizationRequests()
      .subscribe((data: any) => {
      /*const filteredData = data.results.filter(
        (employee: any) => employee.state === 'PENDING'
      );*/

      this.dataSource.data = data.results.map((employee: any) => {
        let timeOut: string = employee.time_out;
        let arrival_time: string = employee.arrival_time;
        let status: any = employee.state;

        const [hours_timeOut, minutes_timeOut] = timeOut.split(':');
        const [hours_arrival_time, minutes_arrival_time] =
          arrival_time.split(':');
        const formattedHours_timeOut = parseInt(hours_timeOut, 10).toString();
        const formattedHours_arrival_time = parseInt(
          hours_arrival_time,
          10
        ).toString();
        return {
          ...employee,
          time_out: formattedHours_timeOut + ':' + minutes_timeOut + 'h',
          arrival_time:
            formattedHours_arrival_time + ':' + minutes_arrival_time + 'h',
          first_name: employee.user.first_name + ' ' + employee.user.last_name,
          enterprise: employee.user?.enterprise ?? '---',
          avatar:
            employee.user.avatar === null || ' '
              ? 'assets/avatar.png'
              : employee.user.avatar,
          reason: employee.reason,
          state:
            status === 'PENDING'
              ? 'EN attente'
              : status === 'ACCEPTED'
                ? 'Accepté'
                : 'Réfusé',
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
  // TODO CHECK
  getAuthorizations() {
    return this.authorizationService.listAuthorizationRequests().subscribe(
      (data: any) => {
        console.log('authorizations: ', data.results);
      }
    );
  }
}
