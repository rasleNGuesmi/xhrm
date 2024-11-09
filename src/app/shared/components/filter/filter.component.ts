import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DepartmentService } from '../../services/department/department.service';
import { TeamService } from '../../services/team/team.service';
import { PositionService } from '../../services/position/position.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  id: any;
  constructor(
    private departmentService: DepartmentService,
    private teamService: TeamService,
    private positionService: PositionService
  ) {}

  @Input() placeholder: string;
  @Input() selectedValue: string;
  @Input() items: string[];
  @Input() isAdmin: boolean = true;
  disableTeam: boolean = false;
  disableProfession: boolean = false;

  @Output() OnValueChange = new EventEmitter<string>();
  @Output() OnValueChangeDepartment = new EventEmitter<string>();
  @Output() OnValueChangeTeam = new EventEmitter<string>();
  @Output() OnValueChangeProfession = new EventEmitter<string>();

  professionItems: any[] = [];
  teamItems: any[] = [];
  departmentItems: any[] = [];
  enterprise_id: number;
  ngOnInit() {
    let id: any = localStorage.getItem('entreprise_id');
    this.enterprise_id = parseInt(id);
    this.getDepartments(this.enterprise_id);
    this.getPositions(this.enterprise_id);
  }
  getDepartments(enterprise_id: number) {
    return this.departmentService
      .GetListDepartment(enterprise_id)
      .subscribe((data: any) => {
        this.departmentItems = data.results;
      });
  }
  getTeams(department_id: number) {
    return this.teamService
      .GetListTeam(department_id)
      .subscribe((data: any) => {
        this.teamItems = data.results;
      });
  }
  getPositions(enterprise_id: number) {
    return this.positionService
      .GetListPositions(enterprise_id)
      .subscribe((data: any) => {
        this.professionItems = data.results;
      });
  }
  onChangeDepartment(event: any) {
    const selectedDepartmentId = event.target.value;
    const selectedDepartmentName =
      event.target.options[event.target.selectedIndex].text;
    this.OnValueChangeDepartment.emit(selectedDepartmentName);
    if (selectedDepartmentId !== '') {
      this.disableTeam = true;
      this.getTeams(selectedDepartmentId); // Pass the selectedDepartmentId
    } else {
      this.disableTeam = false;
      this.getTeams(0); // Pass 0 or any default value when no department is selected
    }
  }
  onChangeTeam(event: any) {
    console.log('hedhy team:', event.target.value);

    this.OnValueChangeTeam.emit(event.target.value);
    if (event.target.value !== '') {
      this.disableProfession = true;
    } else this.disableProfession = false;
    console.log('teamamam:', event.target.value);
  }

  onChangeProfession(event: any) {
    this.OnValueChangeProfession.emit(event.target.value);
    console.log('pospos:', event.target.value);
  }
}
