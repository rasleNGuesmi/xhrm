import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeamService } from '../../services/team/team.service';
import { PositionService } from '../../services/position/position.service';

@Component({
  selector: 'app-filter-team',
  templateUrl: './filter-team.component.html',
  styleUrls: ['./filter-team.component.scss'],
})
export class FilterTeamComponent implements OnInit {
  id: any;
  constructor(
    private teamService: TeamService,
    private positionService: PositionService
  ) {}

  @Input() placeholder: string;
  @Input() selectedValue: string;
  @Input() items: string[];
  @Input() isAdmin: boolean = true;
  disableProfession: boolean = false;

  @Output() OnValueChangeTeam = new EventEmitter<string>();
  @Output() OnValueChangeProfession = new EventEmitter<string>();

  professionItems: any[] = [];
  teamItems: any[] = [];
  enterprise_id: number;
  department_id: number;
  user_id: number;
  ngOnInit() {
    let id: any = localStorage.getItem('entreprise_id');
    this.enterprise_id = parseInt(id);
    let dep: any = localStorage.getItem('department_id');
    this.department_id = parseInt(dep);
    let user: any = localStorage.getItem('user_id');
    this.user_id = parseInt(user);
    let role: any = localStorage.getItem('role');
    this.getTeams(this.department_id);
    //this.getPositions();
    switch (role) {
      case 'manager':
        this.getPositions();
        break;
      case 'hr':
        this.getPositionsHr();
        break;
      default:
        this.getPositions();
    }
  }

  getTeams(department_id: number) {
    return this.teamService
      .GetListTeam(department_id)
      .subscribe((data: any) => {
        this.teamItems = data.results;
      });
  }
  /* TODO FIX FOR NON-MANAGER USERS */
  getPositionsHr() {
    return this.positionService
      .getPositionsHr(this.user_id)
      .subscribe((data:any) => {
        this.professionItems = data.results;
      });
  }
  getPositions() {
    return this.positionService
      .getPositionsManager(this.user_id)
      .subscribe((data: any) => {
        this.professionItems = data.results;
      });
  }
  onChangeTeam(event: any) {
    /* TODO REMOVE */
    console.log('hedhy team:', event.target.value);

    this.OnValueChangeTeam.emit(event.target.value);
    if (event.target.value !== '') {
      this.disableProfession = true;
    } else this.disableProfession = false;
    /* TODO REMOVE */
    console.log('teamamam:', event.target.value);
  }

  onChangeProfession(event: any) {
    this.OnValueChangeProfession.emit(event.target.value);
    /* TODO REMOVE */
    console.log('pospos:', event.target.value);
  }
}
