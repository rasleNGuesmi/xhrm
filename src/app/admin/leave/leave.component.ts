import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';
import { LeaveService } from '../../shared/services/leave/leave.service';
import { EmployeeService } from '../../shared/services/employee/employee.service';
import * as moment from 'moment';

@Component({
  selector: 'app-leave-admin',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss'],
})
export class LeaveComponent implements OnInit {
  name: string;
  enterprise_id: number;
  constructor(
    private toastr: ToastrService,
    private leaveService: LeaveService
  ) {}

  public rows: any[];
  displayedColumns = [
    'first_name',
    'initial_date',
    'days_number',
    'type',
    'reason',
    ' ',
  ];
  columns = [
    { name: 'first_name', label: 'Nom' },
    { name: 'initial_date', label: 'Date de début' },
    { name: 'days_number', label: 'Nombre des jours' },
    { name: 'type', label: 'Type de congé' },
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
  retrieveAllLeave(): void {
    this.leaveService
      .GetListLeave(this.enterprise_id)
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
      .GetListLeave(this.enterprise_id)
      .subscribe((data: any) => {
        const filteredData = data.results.filter(
          (employee: any) => employee.state === 'PENDING'
        );

        this.dataSource.data = filteredData.map((employee: any) => {
          return {
            ...employee,
            first_name:
              employee.user.first_name + ' ' + employee.user.last_name,
            avatar:
              employee.user.avatar === null || ' '
                ? 'assets/avatar.png'
                : employee.user.avatar,
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
