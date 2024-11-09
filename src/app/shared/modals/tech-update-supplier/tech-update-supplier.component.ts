import {Component, Inject, OnInit} from '@angular/core';
import {SupplierService} from "../../services/supplier/supplier.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Supplier} from "../../models/supplier";
import {EnterpriseService} from "../../services/enterprise/enterprise.service";

@Component({
  selector: 'app-tech-update-supplier',
  templateUrl: './tech-update-supplier.component.html',
  styleUrls: ['./tech-update-supplier.component.scss']
})
export class TechUpdateSupplierComponent implements OnInit {
  supplier: any;
  enterprisesItems: any[] = [];

  constructor(
    private supplierService: SupplierService,
    private enterpriseService: EnterpriseService,
    private toastr: ToastrService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TechUpdateSupplierComponent>
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  updateSupplier: FormGroup;
  open(content: any) {
    this.modalService.open(content);
  }
  idE: number;

  ngOnInit(): void {
    this.getEnterprises();
    this.supplier = this.data.supplier;
    this.idE = this.data.supplier.enterprise_id;
    console.log('Supplier: ');
    this.updateSupplier = this._formBuilder.group({
      enterprise: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      website: ['', Validators.required],
    });
    this.updateSupplier.patchValue({
      // TODO check enterprise
      // enterprise: this.supplier.enterprise_id,
      name: this.supplier.name,
      email: this.supplier.email,
      address: this.supplier.address,
      phone: this.supplier.phone,
      website: this.supplier.website,
    });
  }

  get enterprise(): any {
    return this.updateSupplier.get('enterprise');
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
      enterprise: this.updateSupplier.value.enterprise,
    };
    console.log('New Supplier: ', supplier);
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

  getEnterprises() {
    this.enterpriseService.getAllEnterprises().subscribe(
      (data: any) => {
        this.enterprisesItems = data.results;
      }
    );
  }

  getIdEnterprise(event: any) {
    this.idE = parseInt(event.target.value);
  }
}
