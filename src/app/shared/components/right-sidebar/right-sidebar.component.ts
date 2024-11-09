import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
})
export class RightSidebarComponent {
  @Input() list: any[] = [];
  @Input() listConnected: any[] = [];
  @Input() remote: number;
  @Input() office: number;
  today: number = Date.now();
  enterprise_id: number;

  constructor(private modalService: NgbModal) {
    setInterval(() => {
      this.today = Date.now();
    }, 1);
  }

  openFullscreen(content: any) {
    this.modalService.open(content, { fullscreen: true });
  }
}
