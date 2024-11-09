import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator-table',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  constructor() {}
  @Input() paginatorData: {
    pageIndex: number;
    pageSize: number;
    length: number;
    totalItems: number;
  };

  @Output() paginationEvent = new EventEmitter();
  pageEvent: any;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  onPageChange() {
    this.paginationEvent.emit(this.pageEvent);
  }
}
