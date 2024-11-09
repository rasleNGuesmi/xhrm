import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {SupplierService} from "../../shared/services/supplier/supplier.service";
import {DeleteSupplierComponent} from "../../shared/modals/delete-supplier/delete-supplier.component";
import {UpdateSupplierComponent} from "../../shared/modals/update-supplier/update-supplier.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-suppliers-secretary',
  templateUrl: './suppliers-secretary.component.html',
  styleUrls: ['./suppliers-secretary.component.scss']
})
export class SuppliersSecretaryComponent implements OnInit {
  enterprise_id: number;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private supplierService: SupplierService
  ) { }
  displayedColumns = ['name', 'email', 'address', 'phone', 'website', ' '];
  public rows: any[];
  columns = [
    { name: 'name', label: 'Nom du fournisseur' },
    { name: 'email', label: 'E-mail' },
    { name: 'address', label: 'Adresse' },
    { name: 'phone', label: 'Téléphone' },
    { name: 'website', label: 'Site Web' },

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

  async actionDelete(row: any) {
    try {
      await this.openDialogDelete(row);
      this.retrieveAllSuppliers();
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  }

  openDialogDelete(row: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const dialogRef = this.dialog.open(DeleteSupplierComponent, {
        data: { id: row.supplier_id },
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
      const dialogRef = this.dialog.open(UpdateSupplierComponent, {
        data: { supplier: row },
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

  async updateAction(row: any) {
    try {
      await this.openDialogUpdate(row);
      this.retrieveAllSuppliers();
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
    let id: any = localStorage.getItem('entreprise_id');
    this.enterprise_id = parseInt(id);
    this.retrieveAllSuppliers();
  }

  retrieveAllSuppliers(): void {
    this.supplierService
      .getSupplier(this.enterprise_id)
      .subscribe((data: any) => {
        console.log('supplier:', data.results);
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
    this.supplierService
      .getSupplier(this.enterprise_id)
      .subscribe((data: any) => (this.dataSource.data = data.results));
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
      this.retrieveAllSuppliers();
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
