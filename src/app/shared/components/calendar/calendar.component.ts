import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
} from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, parseISO } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { PresenceService } from '../../services/presence/presence.service';
import { ClockingService } from '../../services/clocking/clocking.service';

const { orange }: Record<string, EventColor> = {
  orange: {
    primary: '#f58a07',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  constructor(
    private clockingService: ClockingService,
    private modal: NgbModal,
    private presenceService: PresenceService
  ) {}

  @Input() absence: number = 0;
  @Input() office: number = 0;
  @Input() remote: number = 0;
  user_id: number;

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @Input() hidden: boolean;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  updateCalendarEvents(report: any[]) {
    this.events = report.map(item => ({
      start: parseISO(item.date),
      title: '',
      color: this.getEventColor(item.work_mode),
    }));
  }

  getEventColor(work_mode: string): EventColor {
    switch (work_mode) {
      case 'OFFICE':
        return { primary: '#CB48B7', secondary: '#CB48B7' };
      case 'REMOTE':
        return { primary: '#F58A07', secondary: '#F58A07' };
      default:
        return { primary: '#D21A1A', secondary: '#D21A1A' };
    }
  }

  ngOnInit(): void {
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    this.getClocking();
  }

  getClocking() {
    const currentYear = new Date().getFullYear();
    return this.clockingService
      .getAllClockIn(this.user_id, currentYear)
      .subscribe((data: any) => {
        console.log('report:', data.results);
        this.updateCalendarEvents(data.results);
      });
  }
}
