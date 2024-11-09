import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from '../../services/supplier/supplier.service';
import { Supplier } from '../../models/supplier';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.scss'],
})
export class UpdateSupplierComponent implements OnInit {
  supplier: any;
  enterprise_id: number;

  constructor(
    private supplierService: SupplierService,
    private toastr: ToastrService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateSupplierComponent>
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  updateSupplier: FormGroup;
  open(content: any) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
    let id: any = localStorage.getItem('entreprise_id');
    // TODO GET ENTERPRISE_ID FOR TECH ADMIN
    this.enterprise_id = parseInt(id);
    this.supplier = this.data.supplier;
    console.log('Supplier: ', this.supplier);
    this.updateSupplier = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      website: ['', Validators.required],
    });
    this.updateSupplier.patchValue({
      name: this.supplier.name,
      email: this.supplier.email,
      address: this.supplier.address,
      phone: this.supplier.phone,
      website: this.supplier.website,
    });
  }
  get name(): any {
    return this.updateSupplier.get('name');
  }
  get email(): any {
    return this.updateSupplier.get('email');
  }
  get address(): any {
    return this.updateSupplier.get('address');
  }
  get phone(): any {
    return this.updateSupplier.get('phone');
  }
  get website(): any {
    return this.updateSupplier.get('website');
  }

  update() {
    if (this.updateSupplier.invalid) {
      this.updateSupplier.markAllAsTouched();
      this.toastr.error('Veuillez vérifier les champs obligatoires');
      return;
    }

    let supplier: Supplier = {
      name: this.updateSupplier.value.name,
      phone: this.updateSupplier.value.phone,
      website: this.updateSupplier.value.website,
      address: this.updateSupplier.value.address,
      email: this.updateSupplier.value.email,
      enterprise: this.enterprise_id,
    };
    console.log('New Supplier:', supplier);
    return this.supplierService
      .updateSupplier(supplier, this.supplier.supplier_id)
      .subscribe(
        (data: any) => {
          if (data.success) {
            this.toastr.success('Fournisseur mis à jour avec succès!');
            this.dialogRef.close('update');
          }
        },
        (error: any) => {
          this.toastr.error('Veuillez vérifier vos champs');
          console.error(error);
        }
      );
  }
}
