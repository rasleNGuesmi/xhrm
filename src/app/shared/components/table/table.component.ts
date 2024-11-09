import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() headArray: any[] = [];
  @Input() listPaginator: any;
  @Input() pageSize: number;

  @Input() paginatorData = {
    pageIndex: 0,
    pageSize: 10,
    length: 30,
    totalItems: 30,
  };
  @Output() pagechange = new EventEmitter();
  @Output() sortchange = new EventEmitter();
  @Input() dataSource: MatTableDataSource<any>;
  @Input() ExpandedColumns: any[] = [];

  page = 1;

  sortData(event: any) {
    this.sortchange.emit(event);
  }
  handleActionClick(action: any, id: number) {
    return action.actionHandler(id);
  }
  constructor(public paginatorIntl: MatPaginatorIntl) {
    this.overridePaginator();
  }

  @ViewChild(MatSort) sort: MatSort;

  onPaginateChange(event: any) {
    this.pagechange.emit(event);
  }
  overridePaginator() {
    this.paginatorIntl.itemsPerPageLabel = 'Éléments par page:';
    this.paginatorIntl.nextPageLabel = 'Page suivante';
    this.paginatorIntl.previousPageLabel = 'Page précédente';

    this.paginatorIntl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      if (length === 0 || pageSize === 0) {
        return `0 sur ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} sur ${length}`;
    };
  }
}
