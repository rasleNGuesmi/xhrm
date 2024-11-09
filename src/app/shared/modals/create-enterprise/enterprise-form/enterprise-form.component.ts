import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbModal, NgbModalConfig, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EnterpriseService} from "../../../services/enterprise/enterprise.service";

@Component({
  selector: 'app-enterprise-form',
  templateUrl: './enterprise-form.component.html',
  styleUrls: ['./enterprise-form.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class EnterpriseFormComponent implements OnInit {
  @Output() enterpriseCreated: EventEmitter<void> = new EventEmitter<void>();
  @Output() reload: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private toastr: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  modalRef: NgbModalRef;
  open(content: any) {
    this.modalRef = this.modalService.open(content);
  }
  ngOnInit(): void {
  }

}
