import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../shared/services/order/order.service';
import { SupplierService } from '../../shared/services/supplier/supplier.service';
import { DeletePurchaseComponent } from '../../shared/modals/delete-purchase/delete-purchase.component';
import { UpdatePurchaseRequestComponent } from '../../shared/modals/update-purchase-request/update-purchase-request.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-requests-accountant',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private supplierService: SupplierService
  ) {}
  user_id: number;
  entreprise_id: number;
  suppliers: any[] = [];
  public rows: any[];
  displayedColumns = [
    'name',
    'quantity',
    'price',
    'link',
    'comment',
    'supplier',
    'state',
    ' ',
  ];
  columns = [
    { name: 'name', label: 'Produit' },
    { name: 'quantity', label: 'Quantité' },
    { name: 'price', label: 'Prix' },
    { name: 'link', label: 'Lien' },
    { name: 'comment', label: 'Commentaire' },
    { name: 'supplier', label: 'Fournisseur' },
    { name: 'state', label: 'État' },

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
    let idU: any = localStorage.getItem('user_id');
    this.user_id = parseInt(idU);
    let idE: any = localStorage.getItem('entreprise_id');
    this.entreprise_id = parseInt(idE);
    this.retrieveList();
    this.getSuppliers();
  }

  retrieveList(): void {
    this.orderService
      .getOrdersByAccountant(this.user_id)
      .subscribe((data: any) => {
        console.log('enfin', data.results);
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
      .getOrdersByAccountant(this.user_id)
      .subscribe((data: any) => {
        console.log('trah', data.results);
        this.dataSource.data = data.results.map((employee: any) => {
          let status = employee.state;
          return {
            ...employee,

            name: employee.product.product_name,
            price: employee.product.product_price + 'dt',
            link: employee.product.link,
            comment: employee.product.comment,
            supplier: employee.product.supplier.name,
            state:
              status === 'PENDING'
                ? 'EN attente'
                : status === 'ACCEPTED'
                ? 'Accepté'
                : 'Réfusé',
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
      .getSupplier(this.entreprise_id)
      .subscribe((data: any) => {
        console.log('all suppliers:', data.results);
        this.suppliers = data.results;
      });
  }
}
