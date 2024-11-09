import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePurchaseRequestComponent } from '../../shared/modals/update-purchase-request/update-purchase-request.component';
import { OrderService } from '../../shared/services/order/order.service';
import { DeletePurchaseComponent } from '../../shared/modals/delete-purchase/delete-purchase.component';
import { SupplierService } from '../../shared/services/supplier/supplier.service';
@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.scss'],
})
export class InProgressComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private supplierService: SupplierService
  ) {}
  user_id: number;
  suppliers: any[] = [];
  public rows: any[];
  displayedColumns = [
    'name',
    'quantity',
    'price',
    'link',
    'comment',
    'supplier',
    ' ',
  ];
  columns = [
    { name: 'name', label: 'Produit' },
    { name: 'quantity', label: 'Quantité' },
    { name: 'price', label: 'Prix' },
    { name: 'link', label: 'Lien' },
    { name: 'comment', label: 'Commentaire' },
    { name: 'supplier', label: 'Fournisseur' },

    {
      name: ' ',
      label: ' ',
      actions: [
        {
          name: 'Modifier',
          icon: 'create',
          actionHandler: this.updateAction.bind(this),
        },
        {
          name: 'Supprimer',
          icon: 'delete_forever',
          actionHandler: this.actionDelete.bind(this),
        },
      ],
    },
  ];
  openDialogDelete(row: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const dialogRef = this.dialog.open(DeletePurchaseComponent, {
        data: { id: row.order_id },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'delete') {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  openDialogUpdate(row: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log('ahaaaya:', row);
      const dialogRef = this.dialog.open(UpdatePurchaseRequestComponent, {
        data: { order: row },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'update') {
          resolve();
        } else {
          reject();
        }
      });
    });
  }
  async actionDelete(row: any) {
    try {
      await this.openDialogDelete(row);
      this.retrieveList();
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  }
  async updateAction(row: any) {
    try {
      await this.openDialogUpdate(row);
      this.retrieveList();
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  }
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
    this.orderService
      .getOrdersByEmployee(this.user_id)
      .subscribe((data: any) => {
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
    this.orderService
      .getOrdersByEmployee(this.user_id)
      .subscribe((data: any) => {
        console.log('trah', data.results);
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
      .getAllSupplier(this.user_id)
      .subscribe((data: any) => {
        console.log('all suppliers:', data.results);
        this.suppliers = data.results;
      });
  }
}