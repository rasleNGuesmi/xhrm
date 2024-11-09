import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationService } from '../../shared/services/authorization/authorization.service';
import { UpdateAuthorizationRequestComponent } from '../../shared/modals/update-authorization-request/update-authorization-request.component';
import { DeleteAuthorizationComponent } from '../../shared/modals/delete-authorization/delete-authorization.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private authorizationService: AuthorizationService
  ) {}
  user_id: number;
  public rows: any[];
  displayedColumns = [
    'date',
    'time_out',
    'arrival_time',
    'reason',
    'state',
    ' ',
  ];
  columns = [
    { name: 'date', label: 'Date de début' },
    { name: 'time_out', label: 'De' },
    { name: 'arrival_time', label: 'A' },
    { name: 'reason', label: 'Raison' },
    { name: 'state', label: 'État' },

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
      const dialogRef = this.dialog.open(UpdateAuthorizationRequestComponent, {
        data: { authorization: row },
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
      this.retrieveAllAuthorization();
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
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
        data: { id: row.authorization_id },
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
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    this.retrieveAllAuthorization();
  }

  retrieveAllAuthorization(): void {
    this.authorizationService
      .getAuthorizationsByEmployee(this.user_id)
      .subscribe((deps: any) => {
        console.log('winhom?', deps.results);
        this.dataSource.data = this.takeNelmentsFromTable(
          this.paginatorData.pageSize
        );
        this.paginatorData.length = deps.results.length;
      });
  }

  onPaginateChange($event: any) {
    this.paginatorData = $event;
    this.paginatorData.pageSize = $event.pageSize;
    this.paginatorData.pageIndex = $event.pageIndex;
    this.dataSource.data = this.takeNelmentsFromTable($event.pageSize);
  }

  public takeNelmentsFromTable(elements: number) {
    this.authorizationService
      .getAuthorizationsByEmployee(this.user_id)
      .subscribe((data: any) => {
        this.dataSource.data = data.results.map((employee: any) => {
          let status: any = employee.state;
          let timeOut: string = employee.time_out;
          let arrival_time: string = employee.arrival_time;

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
            state:
              status === 'PENDING'
                ? 'EN attente'
                : status === 'ACCEPTED'
                ? 'Accepté'
                : 'Réfusé',
            reason: employee.reason,
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
}
