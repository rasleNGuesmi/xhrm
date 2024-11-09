import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../shared/services/order/order.service';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  enterprise_id: number;

  constructor(
    private toastr: ToastrService,
    private orderService: OrderService
  ) {}

  public rows: any[];
  displayedColumns = [
    'first_name',
    'product_name',
    'quantity',
    'total_price',
    'link',
    'comment',
    'supplier_name',
    ' ',
  ];
  columns = [
    { name: 'first_name', label: 'Nom' },
    { name: 'product_name', label: 'Produit' },
    { name: 'quantity', label: 'Quantité' },
    { name: 'total_price', label: 'Prix' },
    { name: 'link', label: 'Lien' },
    { name: 'comment', label: 'Commentaire' },
    { name: 'supplier_name', label: 'Fournisseur' },
    {
      name: ' ',
      label: ' ',
      actions: [
        {
          name: 'Approuver',
          icon: 'check_circle',
          actionHandler: this.actionAccept.bind(this),
        },

        {
          name: 'Réfuser',
          icon: 'remove_circle',
          actionHandler: this.actionRefuse.bind(this),
        },
      ],
    },
  ];
  actionAccept(order: any) {
    this.orderService
      .acceptOrder(order.order_id, order)
      .subscribe((data: any) => {
        if (data.success) {
          this.retrieveAllRequests();
          this.toastr.success('Votre demande a été approvée');
        }
      });
  }
  actionRefuse(order: any) {
    this.orderService
      .rejectOrder(order.order_id, order)
      .subscribe((data: any) => {
        if (data.success) {
          this.retrieveAllRequests();
          this.toastr.success('Votre demande a été supprimée');
        }
      });
  }
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  paginatorData = {
    pageIndex: 0,
    pageSize: 10,
    length: 50,
    totalItems: 50,
  };

  ngOnInit(): void {
    let id: any = localStorage.getItem('entreprise_id');
    this.enterprise_id = parseInt(id);
    this.retrieveAllRequests();
  }

  retrieveAllRequests(): void {
    this.orderService.getOrder(this.enterprise_id).subscribe((data: any) => {
      console.log('order c bn?', data.results);

      this.dataSource.data = this.takeNelmentsFromTable(
        this.paginatorData.pageSize
      );
      this.paginatorData.length = data.results.length;
    });
  }

  onPaginateChange($event: any) {
    this.paginatorData = $event;
    this.paginatorData.pageSize = $event.pageSize;
    this.paginatorData.pageIndex = $event.pageIndex;
    this.dataSource.data = this.takeNelmentsFromTable($event.pageSize);
  }
  public takeNelmentsFromTable(elements: number) {
    this.orderService.getOrder(this.enterprise_id).subscribe((data: any) => {
      const filteredData = data.results.filter(
        (employee: any) => employee.state === 'PENDING'
      );

      this.dataSource.data = filteredData.map((employee: any) => {
        return {
          ...employee,
          product_name: employee.product.product_name,
          link: employee.product.link,
          comment: employee.product.comment
            ? employee.product.comment
            : '- - -',
          supplier_name: employee.product.supplier.name,
          first_name: employee.user.first_name + ' ' + employee.user.last_name,
          avatar:
            employee.user.avatar === null
              ? 'assets/avatar.png'
              : employee.user.avatar,
          total_price: employee.total_price + 'dt',
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
      this.retrieveAllRequests();
    }
  }
  handleSort($event: any) {
    console.log('sorting event : ', $event);

    this.sortTable($event.active, $event.direction);
  }
  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
