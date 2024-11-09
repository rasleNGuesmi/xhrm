import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UpdateLeaveRequestComponent } from '../../shared/modals/update-leave-request/update-leave-request.component';
import { LeaveService } from '../../shared/services/leave/leave.service';
import { DeleteLeaveComponent } from '../../shared/modals/delete-leave/delete-leave.component';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss'],
})
export class LeaveComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private leaveService: LeaveService
  ) {}
  user_id: number;
  public rows: any[];
  displayedColumns = [
    'initial_date',
    'days_number',
    'type',
    'reason',
    'state',
    ' ',
  ];
  columns = [
    { name: 'initial_date', label: 'Date de début' },
    { name: 'days_number', label: 'Nombre des jours' },
    { name: 'type', label: 'Type de congé' },
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

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  paginatorData = {
    pageIndex: 0,
    pageSize: 10,
    length: 50,
    totalItems: 50,
  };

  async actionDelete(row: any) {
    try {
      await this.openDialogDelete(row);
      this.retrieveAllLeave();
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  }

  openDialogDelete(row: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const dialogRef = this.dialog.open(DeleteLeaveComponent, {
        data: { id: row.leave_request_id },
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

  openDialogUpdate(row: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const dialogRef = this.dialog.open(UpdateLeaveRequestComponent, {
        data: {
          leave: row,
          days_left: this.days_left,
          enterprise_leave_days: this.enterprise_leave_days,
        },
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
      this.retrieveAllLeave();
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  }
  ngOnInit(): void {
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    this.retrieveAllLeave();
    this.getLeaveDaysLeft();
  }

  retrieveAllLeave(): void {
    this.leaveService
      .getLeavesByEmployee(this.user_id)
      .subscribe((deps: any) => {
        this.dataSource.data = this.takeNelmentsFromTable(
          this.paginatorData.pageSize
        );
        this.paginatorData.length = deps.length;
      });
  }

  onPaginateChange($event: any) {
    this.paginatorData = $event;
    this.paginatorData.pageSize = $event.pageSize;
    this.paginatorData.pageIndex = $event.pageIndex;
    this.dataSource.data = this.takeNelmentsFromTable($event.pageSize);
  }

  public takeNelmentsFromTable(elements: number) {
    this.leaveService
      .getLeavesByEmployee(this.user_id)
      .subscribe((data: any) => {
        this.dataSource.data = data.results.map((employee: any) => {
          let status: any = employee.state;
          return {
            ...employee,

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
      this.retrieveAllLeave();
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
  days_left: number;
  enterprise_leave_days: number;
  getLeaveDaysLeft() {
    return this.leaveService
      .getLeaveDaysLeft(this.user_id)
      .subscribe((data: any) => {
        this.days_left = data.results.days_left;
        this.enterprise_leave_days = data.results.enterprise_leave_days;
      });
  }
}
