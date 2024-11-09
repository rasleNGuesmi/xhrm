import { Component, OnInit } from '@angular/core';
import { ClockingService } from '../../shared/services/clocking/clocking.service';
import { Clocking } from '../../shared/models/clocking';

@Component({
  selector: 'app-clocking',
  templateUrl: './clocking.component.html',
  styleUrls: ['./clocking.component.scss'],
})
export class ClockingComponent implements OnInit {
  today: number = Date.now();
  user_id: number;
  isBureauChecked: boolean = false;
  workMode: string = 'OFFICE';
  clock: boolean = false;

  constructor(private clockingService: ClockingService) {
    setInterval(() => {
      this.today = Date.now();
    }, 1);
  }

  ngOnInit(): void {
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    this.updateWorkMode();
    this.getLastClock();
  }

  updateWorkMode() {
    if (this.isBureauChecked) {
      this.workMode = 'REMOTE';
    } else {
      this.workMode = 'OFFICE';
    }
  }

  clockIn() {
    let clocking: Clocking = {
      clock: 'CLOCKIN',
      work_mode: this.workMode ? this.workMode : 'OFFICE',
      user: this.user_id,
    };

    return this.clockingService.clockIn(clocking).subscribe((data: any) => {
      this.getLastClock();
    });
  }

  clockOut() {
    let clocking: Clocking = {
      clock: 'CLOCKOUT',
      work_mode: 'OFFICE',
      user: this.user_id,
    };
    console.log('clockOUT problem:', clocking);
    return this.clockingService.clockIn(clocking).subscribe((data: any) => {
      this.getLastClock();
    });
  }

  getLastClock() {
    return this.clockingService
      .getLastClock(this.user_id)
      .subscribe((data: any) => {
        if (data.results.work_mode === 'REMOTE') {
          this.isBureauChecked = true;
        } else {
          this.isBureauChecked = false;
        }

        this.workMode = data.results.work_mode;
        this.clock = data.results.clock === 'CLOCKIN';
      });
  }
}
