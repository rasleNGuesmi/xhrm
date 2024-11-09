import { Component, Inject, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier/supplier.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-delete-purchase',
  templateUrl: './delete-purchase.component.html',
  styleUrls: ['./delete-purchase.component.scss'],
})
export class DeletePurchaseComponent implements OnInit {
  id: any;

  constructor(
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<DeletePurchaseComponent>
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
  }
  onSubmit() {
    this.orderService.deleteOrder(this.id).subscribe(
      (data: any) => {
        console.log('delete order:', data.results);
        if (data.success) {
          this.toastr.success('Votre demande a été supprimée');
          this.dialogRef.close('delete');
        }
      },
      () => {
        this.toastr.error('La suppression de la demande a échouée');
      }
    );
  }
}
