import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NgbModal, NgbModalConfig, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../services/order/order.service";
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {EmployeeService} from "../../services/employee/employee.service";
import {Order} from "../../models/order";
import {SupplierService} from "../../services/supplier/supplier.service";

@Component({
  selector: 'app-tech-purchase-request',
  templateUrl: './tech-purchase-request.component.html',
  styleUrls: ['./tech-purchase-request.component.scss']
})
export class TechPurchaseRequestComponent implements OnInit {
  @Output() orderRequestCreated: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private toastr: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private orderService: OrderService,
    private enterpriseService: EnterpriseService,
    private employeeService: EmployeeService,
    private supplierService: SupplierService
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
  enterprise_id = 0;
  enterpriseItems: any[] = [];
  suppliers: any[] = [];
  employees: any[] = [];
  ngOnInit(): void {
    this.loadEnterprises();
    this.purchaseRequest = this._formBuilder.group({
      enterprise: ['', Validators.required],
      employee: ['', Validators.required],
      product: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      link: ['', Validators.required],
      supplier: ['', Validators.required],
      comment: [],
    });
  }
  get enterprise(): any {
    return this.purchaseRequest.get('enterprise');
  }
  get employee(): any {
    return this.purchaseRequest.get('employee');
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
      user: parseInt(this.purchaseRequest.value.employee),
    };
    console.log('add order succes!', order);

    this.orderService.createOrder(order).subscribe(
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
  loadEnterprises() {
    this.enterpriseService.getAllEnterprises().subscribe((data: any) => {
      this.enterpriseItems = data.results;
    });
  }
  loadEmployeesSuppliers(event: any): void {
    this.enterprise_id = parseInt(event.target.value);
    this.supplierService.getSupplier(this.enterprise_id)
      .subscribe((data:any) => {
        if (data.success) {
          this.suppliers = data.results;
        }
      });
    this.employeeService.getEmployees(this.enterprise_id)
      .subscribe((data:any) => {
        if (data.success) {
          this.employees = data.results;
        }
      });
  }
}
