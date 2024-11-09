import { Component, OnInit } from '@angular/core';
import {LeaveService} from "../../shared/services/leave/leave.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-tech-overview',
  templateUrl: './tech-overview.component.html',
  styleUrls: ['./tech-overview.component.scss']
})
export class TechOverviewComponent implements OnInit {
  constructor(private leaveService: LeaveService) { }

  public rows: any[];
  displayedColumns = [
    'first_name',
    'enterprise', // TODO RETRIEVE
    'poste', // TODO RETRIEVE
    'total_leaves',
    'latest_leave',
    'total_authorizations',
    'latest_authorization',
  ];
  columns = [
    { name: 'first_name', label: 'Nom' },
    { name: 'enterprise', label: 'Entreprise' },
    { name: 'poste', label: 'Poste' },
    { name: 'total_leaves', label: 'Total de congés atteint' },
    { name: 'latest_leave', label: 'Derniér congé' },
    {
      name: 'total_authorizations',
      label: 'Total de sorties atteint',
    },
    { name: 'latest_authorization', label: 'Derniére sorties' },
  ];

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  paginatorData = {
    pageIndex: 0,
    pageSize: 10,
    length: 50,
    totalItems: 50,
  };

  ngOnInit(): void {
    this.retrieveAllList();
  }

  retrieveAllList(): void {
    this.leaveService.getTechOverview().subscribe((data: any) => {
      console.log('Overview:', data.results);
      this.dataSource.data = this.takeNelmentsFromTable(
        this.paginatorData.pageSize
      );
      this.paginatorData.length = data.results.length;
    });
  }

  onPaginateChange($event: any) {
    this.paginatorData = $event;
    this.paginatorData.pageSize = $event.pageSize;
    this.paginatorData.pageIndex = $event.pageIndex;
    this.dataSource.data = this.takeNelmentsFromTable($event.pageSize);
  }

  public takeNelmentsFromTable(elements: number) {
    this.leaveService.getTechOverview().subscribe((data: any) => {
      this.dataSource.data = data.results.map((employee: any) => {
        return {
          ...employee,
          first_name: employee.first_name + ' ' + employee.last_name,
          poste: employee.poste ?? '---',
          total_leaves: employee.total_leaves.days_number__sum
            ? employee.total_leaves.days_number__sum + ' jours'
            : '- - -',
          latest_leave: employee.latest_leave
            ? this.reformatDate(employee.latest_leave)
            : '- - -',
          total_authorizations: employee.total_authorizations.summ
            ? this.convertSecondsToHours(employee.total_authorizations.summ)
            : '- - -',
          latest_authorization: employee.latest_authorization
            ? this.reformatDate(employee.latest_authorization)
            : '- - -',
          avatar:
            employee.avatar === null ? 'assets/avatar.png' : employee.avatar,
        };
        console.log('mmm', employee);
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
      this.retrieveAllList();
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
  getOverView(enterprise_id: number) {
    return this.leaveService
      .getOverView(enterprise_id)
      .subscribe((data: any) => {
        console.log('overview:', data.results);
      });
  }
  public reformatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('fr-FR', options);
    return formattedDate;
  }
  public convertSecondsToHours(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedTime = `${hours}h ${minutes}min`;
    return formattedTime;
  }
}
