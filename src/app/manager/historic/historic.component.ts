import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierService } from '../../shared/services/supplier/supplier.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss'],
})
export class HistoricComponent implements OnInit {
  user_id: number;
  suppliers: any[] = [];

  constructor(
    private orderService: OrderService,
    private supplierService: SupplierService
  ) {}
  displayedColumns = [
    'name',
    'quantity',
    'price',
    'link',
    'comment',
    'supplier',
  ];
  public rows: any[];
  columns = [
    { name: 'name', label: 'Produit' },
    { name: 'quantity', label: 'Quantité' },
    { name: 'price', label: 'Prix' },
    { name: 'link', label: 'Lien' },
    { name: 'comment', label: 'Commentaire' },
    { name: 'supplier', label: 'Fournisseur' },
  ];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  paginatorData = {
    pageIndex: 0,
    pageSize: 10,
    length: 50,
    totalItems: 50,
  };

  ngOnInit(): void {
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    this.retrieveList();
    this.getSuppliers();
  }

  retrieveList(): void {
    this.orderService.getHistoricOrder(this.user_id).subscribe((data: any) => {
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
    this.orderService.getHistoricOrder(this.user_id).subscribe((data: any) => {
      console.log('Historic Order: ', data.results);
      this.dataSource.data = data.results.map((employee: any) => {
        return {
          ...employee,

          name: employee.product.product_name,
          price: employee.product.product_price,
          link: employee.product.link,
          comment: employee.product.comment,
          supplier: employee.product.supplier.name,
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
      this.retrieveList();
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
  getSuppliers() {
    return this.supplierService
      .getAllSupplierManager(this.user_id)
      .subscribe((data: any) => {
        console.log('All suppliers:', data.results);
        this.suppliers = data.results;
      });
  }
}
