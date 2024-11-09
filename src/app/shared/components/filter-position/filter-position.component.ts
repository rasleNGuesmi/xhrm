import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PositionService } from '../../services/position/position.service';

@Component({
  selector: 'app-filter-position',
  templateUrl: './filter-position.component.html',
  styleUrls: ['./filter-position.component.scss'],
})
export class FilterPositionComponent implements OnInit {
  @Output() OnValueChangeProfession = new EventEmitter<string>();
  professionItems: any[] = [];
  user_id: number;
  enterprise_id: number;
  constructor(private positionService: PositionService) {}

  ngOnInit(): void {
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    let ide: any = localStorage.getItem('entreprise_id');
    this.enterprise_id = parseInt(ide);
    this.getPositions();
  }

  getPositions() {
    return this.positionService
      .getPositionsEmployee(this.enterprise_id)
      .subscribe((data: any) => {
        this.professionItems = data.results;
      });
  }
  onChangeProfession(event: any) {
    this.OnValueChangeProfession.emit(event.target.value);
    console.log('pospos:', event.target.value);
  }
}
