import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import {SupplierService} from "../../services/supplier/supplier.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Supplier} from "../../models/supplier";
import {EnterpriseService} from "../../services/enterprise/enterprise.service";

@Component({
  selector: 'app-tech-create-supplier',
  templateUrl: './tech-create-supplier.component.html',
  styleUrls: ['./tech-create-supplier.component.scss']
})
export class TechCreateSupplierComponent implements OnInit {
  modalRef: NgbModalRef;
  @Output() supplierCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private supplierService: SupplierService,
    private enterpriseService: EnterpriseService,
    private toastr: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  addSupplier: FormGroup;
  enterprisesItems: any[] = [];

  open(content: any) {
    this.modalRef = this.modalService.open(content);
  }

  ngOnInit(): void {
    this.getEnterprises();
    this.addSupplier = this._formBuilder.group({
      enterprise: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      website: ['', Validators.required],
    });
  }
  get enterprise(): any {
    return this.addSupplier.get('enterprise');
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

  getEnterprises() {
    this.enterpriseService.getAllEnterprises().subscribe(
      (data: any) => {
        this.enterprisesItems = data.results;
      }
    );
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
      enterprise: this.addSupplier.value.enterprise,
    };
    console.log('New Supplier: ', supplier);
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
