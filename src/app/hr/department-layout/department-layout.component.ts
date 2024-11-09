import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EmployeeService} from "../../shared/services/employee/employee.service";
import {MatTableDataSource} from "@angular/material/table";
import * as moment from "moment/moment";
const currentDate: string = moment().format('YYYY-MM-DD');

@Component({
  selector: 'app-department-layout',
  templateUrl: './department-layout.component.html',
  styleUrls: ['./department-layout.component.scss']
})
export class DepartmentLayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) { }
  department_id: number;
  professionItems = ['Développeur', 'Designeur', 'Testeur'];

  ngOnInit(): void {
    let id: any = localStorage.getItem('department_id');
    this.department_id = parseInt(id);
    this.retrieveAllDepartments();
  }
  public rows: any[];
  displayedColumns = [
    'first_name',
    'position',
    'team',
    'email',
    'contact',
    'Travail',
    ' ',
  ];
  columns = [
    { name: 'first_name', label: 'Nom' },
    { name: 'position', label: 'Profession' },
    { name: 'team', label: 'Equipe' },
    { name: 'email', label: 'E-mail' },
    { name: 'Téléphone', label: 'Téléphone' },
    { name: 'contact', label: 'Téléphone' },
    { name: 'Travail', label: 'Travail' },
    {
      name: ' ',
      label: ' ',
      actions: [
        {
          name: 'Envoyer Email',
          icon: 'email',
          actionHandler: this.sendEmail.bind(this),
        },
      ],
    },
  ];
  public onProfessionFilterValueChange(value: any) {
    if (value) {
      this.dataSource.data = this.dataSource.data.filter(
        department => department.position === value
      );
    } else {
      this.retrieveAllDepartments();
    }
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

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
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

  retrieveAllDepartments(): void {
    this.employeeService
      .getEmployeeByDepartment(this.department_id)
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
    this.employeeService
      .getEmployeeByDepartment(this.department_id)
      .subscribe((data: any) => {
        console.log('dep:', data.results);
        this.dataSource.data = data.results.map((employee: any) => {
          const clockingsArray: any[] = employee.clockings;
          let t: any;
          const matchingClocking = clockingsArray.find((clocking: any) => {
            clocking.date === currentDate;
            t = clocking.work_mode;
          });

          const isToday: boolean = moment(matchingClocking).isSame(
            currentDate,
            'day'
          );
          const travail: string = isToday ? t : null;

          return {
            ...employee,
            first_name: employee.first_name + ' ' + employee.last_name,
            team: employee.team.team_name,
            contact: employee.contact ? employee.contact : '- - -',
            position: employee.position ? employee.position.position_name : '',
            Travail:
              travail === undefined
                ? 'Hors ligne'
                : t === 'REMOTE'
                  ? 'Télétravail'
                  : 'Présentiel',
            user_id: employee.user_id,
            avatar:
              employee.avatar === null ? 'assets/avatar.png' : employee.avatar,
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
      this.retrieveAllDepartments();
    }
  }
  handleSort($event: any) {
    console.log('sorting event : ', $event);

    this.sortTable($event.active, $event.direction);
  }
}
