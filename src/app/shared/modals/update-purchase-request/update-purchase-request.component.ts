import { Component, Inject, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../services/order/order.service';
import { SupplierService } from '../../services/supplier/supplier.service';
import { Leave } from '../../models/leave';
import { Order } from '../../models/order';

@Component({
  selector: 'app-update-purchase-request',
  templateUrl: './update-purchase-request.component.html',
  styleUrls: ['./update-purchase-request.component.scss'],
})
export class UpdatePurchaseRequestComponent implements OnInit {
  order: any;
  user_id: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<UpdatePurchaseRequestComponent>,
    private orderService: OrderService,
    private supplierService: SupplierService,

    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  purchaseRequest: FormGroup;
  open(content: any) {
    this.modalService.open(content);
  }

  suppliers: any[] = [];
  ngOnInit(): void {
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    this.getSuppliers();

    this.order = this.data.order;

    this.purchaseRequest = this._formBuilder.group({
      product: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      link: ['', Validators.required],
      supplier: ['', Validators.required],
      comment: [],
    });
    this.purchaseRequest.patchValue({
      product: this.order.product.product_name,
      price: this.order.price,
      quantity: this.order.quantity,
      link: this.order.link,
      supplier: this.order.product.supplier,
      comment: this.order.comment,
    });
  }
  get product(): any {
    return this.purchaseRequest.get('product');
  }
  get price(): any {
    return this.purchaseRequest.get('price');
  }
  get quantity(): any {
    return this.purchaseRequest.get('quantity');
  }
  get link(): any {
    return this.purchaseRequest.get('link');
  }
  get comment(): any {
    return this.purchaseRequest.get('link');
  }
  get supplier(): any {
    return this.purchaseRequest.get('supplier');
  }
  getSuppliers() {
    let role: any = localStorage.getItem('role');
    if (role === 'accountant') {
      let enterprise_id: any = localStorage.getItem('entreprise_id');
      return this.supplierService
        .getSupplier(enterprise_id)
        .subscribe((data: any) => {
          this.suppliers = data.results;
          console.log('all suppliers:', this.suppliers);
        });
    } else {
      return this.supplierService
        .getAllSupplier(this.user_id)
        .subscribe((data: any) => {
          this.suppliers = data.results;
          console.log('all suppliers:', this.suppliers);
        });
    }
  }
  update() {
    if (this.purchaseRequest.invalid) {
      this.purchaseRequest.markAllAsTouched();
      this.toastr.error('Veuillez vérifier les champs obligatoires');
      return;
    }
    let order: Order = {
      product: {
        product_name: this.purchaseRequest.value.product,
        product_price: this.purchaseRequest.value.price,
        comment: this.purchaseRequest.value.comment,
        link: this.purchaseRequest.value.link,
        supplier: this.purchaseRequest.value.supplier,
      },
      quantity: this.purchaseRequest.value.quantity,
    };
    console.log('new order:', order);
    return this.orderService.updateOrder(order, this.order.order_id).subscribe(
      (data: any) => {
        console.log('update order:', data.results);
        this.toastr.success("Demande d'achat mise à jour avec succès!");
        this.dialogRef.close('update');
      },
      (error: any) => {
        this.toastr.error('Veuillez vérifier vos champs');
        console.error(error);
      }
    );
  }
}
