import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order/order.service';
import { SupplierService } from '../../services/supplier/supplier.service';

@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.component.html',
  styleUrls: ['./purchase-request.component.scss'],
})
export class PurchaseRequestComponent implements OnInit {
  @Output() orderRequestCreated: EventEmitter<void> = new EventEmitter<void>();
  user_id: number;
  constructor(
    private toastr: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private orderservice: OrderService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  purchaseRequest: FormGroup;
  modalRef: NgbModalRef;
  open(content: any) {
    this.modalRef = this.modalService.open(content);
  }

  @Input() suppliers: any[] = [];
  ngOnInit(): void {
    let id: any = localStorage.getItem('user_id');
    this.user_id = parseInt(id);
    this.purchaseRequest = this._formBuilder.group({
      product: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      link: ['', Validators.required],
      supplier: ['', Validators.required],
      comment: [],
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
  get supplier(): any {
    return this.purchaseRequest.get('supplier');
  }
  get comment(): any {
    return this.purchaseRequest.get('comment');
  }
  createOrder() {
    if (this.purchaseRequest.invalid) {
      this.purchaseRequest.markAllAsTouched();
      this.toastr.error('Veuillez vérifier les champs obligatoires');
      return;
    }
    let order: Order = {
      product: {
        product_name: this.purchaseRequest.value.product,
        product_price: this.purchaseRequest.value.price,
        link: this.purchaseRequest.value.link,
        supplier: this.purchaseRequest.value.supplier,
        comment: this.purchaseRequest.value.comment,
      },
      quantity: this.purchaseRequest.value.quantity,
    };
    console.log('add order succes!', order);

    this.orderservice.createOrder(order).subscribe(
      (data: any) => {
        if (data.success) {
          console.log('add order succes!', data);
          this.toastr.success("Votre demande d'achat a été ajoutée");
          this.orderRequestCreated.emit();
          this.modalRef.close();
        }
      },
      (error: any) => {
        this.toastr.error('Veuillez vérifier vos champs');
        console.error(error);
      }
    );
  }
}
