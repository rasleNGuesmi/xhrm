import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from '../../services/supplier/supplier.service';
import { Expense } from '../../models/expense';
import { Supplier } from '../../models/supplier';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss'],
})
export class CreateSupplierComponent implements OnInit {
  enterprise_id: number;
  modalRef: NgbModalRef;
  @Output() supplierCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private supplierService: SupplierService,
    private toastr: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  addSupplier: FormGroup;
  open(content: any) {
    this.modalRef = this.modalService.open(content);
  }

  ngOnInit(): void {
    let id: any = localStorage.getItem('entreprise_id');
    this.enterprise_id = parseInt(id);
    this.addSupplier = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      website: ['', Validators.required],
    });
  }
  get name(): any {
    return this.addSupplier.get('name');
  }
  get email(): any {
    return this.addSupplier.get('email');
  }
  get address(): any {
    return this.addSupplier.get('address');
  }
  get phone(): any {
    return this.addSupplier.get('phone');
  }
  get website(): any {
    return this.addSupplier.get('website');
  }
  createSupplier() {
    if (this.addSupplier.invalid) {
      this.addSupplier.markAllAsTouched();
      this.toastr.error('Veuillez vérifier les champs obligatoires');
      return;
    }
    let supplier: Supplier = {
      name: this.addSupplier.value.name,
      email: this.addSupplier.value.email,
      address: this.addSupplier.value.address,
      phone: this.addSupplier.value.phone,
      website: this.addSupplier.value.website,
      enterprise: this.enterprise_id,
    };
    console.log('add supplier;', supplier);
    this.supplierService.createSupplier(supplier).subscribe(
      (data: any) => {
        console.log('data:', data);
        this.toastr.success('Votre fournisseur a été ajouté');
        this.supplierCreated.emit();
        this.modalRef.close();
      },
      (error: any) => {
        this.toastr.error('Veuillez vérifier vos champs');
        console.error(error);
      }
    );
  }
}
