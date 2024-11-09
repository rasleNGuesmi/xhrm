import { Component, OnInit } from '@angular/core';
import { PresenceService } from '../../shared/services/presence/presence.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  absence: number = 0;
  office: number = 0;
  remote: number = 0;
  user_id: number;
  constructor(private presenceService: PresenceService) {}
  ngOnInit(): void {
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    this.getPresence();
  }
  hidden: boolean = true;

  getPresence() {
    return this.presenceService
      .getPresence(this.user_id)
      .subscribe((data: any) => {
        console.log('aka l7esba', data.results);
        this.absence = data.results.absence_num;
        this.office = data.results.office_num;
        this.remote = data.results.remote_num;
      });
  }
}
