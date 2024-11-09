import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {SupplierService} from "../../shared/services/supplier/supplier.service";
import {MatTableDataSource} from "@angular/material/table";
import {DeleteSupplierComponent} from "../../shared/modals/delete-supplier/delete-supplier.component";
import {UpdateSupplierComponent} from "../../shared/modals/update-supplier/update-supplier.component";
import {TechUpdateSupplierComponent} from "../../shared/modals/tech-update-supplier/tech-update-supplier.component";

@Component({
  selector: 'app-tech-suppliers',
  templateUrl: './tech-suppliers.component.html',
  styleUrls: ['./tech-suppliers.component.scss']
})
export class TechSuppliersComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private supplierService: SupplierService
  ) { }
  displayedColumns = ['name', 'enterprise', 'email', 'address', 'phone', 'website', ' '];
  public rows: any[];
  columns = [
    { name: 'name', label: 'Nom du fournisseur' },
    { name: 'email', label: 'E-mail' },
    { name: 'enterprise', label: 'Entreprise' },
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
      const dialogRef = this.dialog.open(TechUpdateSupplierComponent, {
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
    this.retrieveAllSuppliers();
  }

  retrieveAllSuppliers(): void {
    this.supplierService
      .listSuppliers()
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
      .listSuppliers()
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
