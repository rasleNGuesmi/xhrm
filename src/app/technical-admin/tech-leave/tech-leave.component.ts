import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {LeaveService} from "../../shared/services/leave/leave.service";
import {MatTableDataSource} from "@angular/material/table";
import {DeleteLeaveComponent} from "../../shared/modals/delete-leave/delete-leave.component";
import {MatDialog} from "@angular/material/dialog";
import {UpdateLeaveRequestComponent} from "../../shared/modals/update-leave-request/update-leave-request.component";

@Component({
  selector: 'app-tech-leave',
  templateUrl: './tech-leave.component.html',
  styleUrls: ['./tech-leave.component.scss']
})
export class TechLeaveComponent implements OnInit {
  // name: string; // TODO CHECK

  constructor(
    private toastr: ToastrService,
    private leaveService: LeaveService,
    public dialog: MatDialog
  ) { }

  public rows: any[];
  displayedColumns = [
    'first_name',
    'enterprise',
    'initial_date',
    'days_number',
    'type',
    'reason',
    'state',
    ' ',
  ];
  columns = [
    { name: 'first_name', label: 'Nom' },
    { name: 'enterprise', label: 'Entreprise' },
    { name: 'initial_date', label: 'Date de début' },
    { name: 'days_number', label: 'Nombre des jours' },
    { name: 'type', label: 'Type de congé' },
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
    this.retrieveAllLeave();
  }

  actionAccept(row: any) {
    this.leaveService.acceptLeave(row.leave_request_id, row).subscribe(
      (data: any) => {
        if (data.success) {
          this.retrieveAllLeave();

          this.toastr.success('Votre congé a été apprové');
        }
        console.log('accept:', data);
      },
      (error: any) => {
        this.toastr.error(
          "Une erreur s'est produite lors de l'acceptation de congé"
        );
        console.error(error);
      }
    );
  }
  actionRefuse(row: any) {
    this.leaveService.rejectLeave(row.leave_request_id, row).subscribe(
      (data: any) => {
        if (data.success) {
          this.retrieveAllLeave();

          this.toastr.success('Votre congé a été supprimé');
        }
        console.log('reject:', data);
      },
      (error: any) => {
        this.toastr.error(
          "Une erreur s'est produite lors de la suppression de congé"
        );
        console.error(error);
      }
    );
  }
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

  async updateAction(row: any) {
    try {
      await this.openDialogUpdate(row);
      this.retrieveAllLeave();
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  }
  // TODO UPDATE ENTERPRISE AND USER
  openDialogUpdate(row: any): Promise<void> {
    return new Promise<void> ((resolve, reject) => {
      const dialogRef = this.dialog.open(UpdateLeaveRequestComponent, {
        data: {leave: row},
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

  retrieveAllLeave(): void {
    this.leaveService
      .listAllLeaveRequests()
      .subscribe((data: any) => {
        this.dataSource.data = this.takeNelmentsFromTable(
          this.paginatorData.pageSize
        );
        this.paginatorData.length = data.results.length;

        console.log(data.results);
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
      .listAllLeaveRequests()
      .subscribe((data: any) => {
        // TODO REMOVE FILTER
        /*const filteredData = data.results.filter(
          // TODO CHANGE employee -> leave_request
          (employee: any) => employee.state === 'PENDING'
        );*/

        this.dataSource.data = data.results.map((employee: any) => {
          let status: any = employee.state;
          return {
            ...employee,
            first_name:
              employee.user ?
                employee.user.first_name + ' ' + employee.user.last_name : '---',
            // TODO ENTERPRISE
            enterprise: employee.user?.enterprise ?? '---',
            avatar:
              employee.user === null || employee.user.avatar === null || ' '
                ? 'assets/avatar.png'
                : employee.user.avatar,
            reason: employee.reason,
            state: status === 'PENDING'
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
}
