import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from '../../services/supplier/supplier.service';

@Component({
  selector: 'app-delete-supplier',
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.scss'],
})
export class DeleteSupplierComponent implements OnInit {
  id: any;

  constructor(
    private supplierService: SupplierService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<DeleteSupplierComponent>
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
  }
  onSubmit() {
    this.supplierService.deleteSupplier(this.id).subscribe(
      (data: any) => {
        console.log('delete supplier:', data.results);
        if (data.success) {
          this.toastr.success('Votre fournisseur a été supprimé');
          this.dialogRef.close('delete'); // Fermer la boîte de dialogue en indiquant la mise à jour réussie
        }
      },
      () => {
        this.toastr.error('La suppression de le fournisseur a échoué');
      }
    );
  }
}
