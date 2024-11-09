import {Component, Inject, OnInit} from '@angular/core';
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-enterprise',
  templateUrl: './delete-enterprise.component.html',
  styleUrls: ['./delete-enterprise.component.scss']
})
export class DeleteEnterpriseComponent implements OnInit {
  id: any;

  constructor(
    private enterpriseService: EnterpriseService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteEnterpriseComponent>
  ) { }

  ngOnInit(): void {
    this.id = this.data.id;
  }

  onSubmit() {
    this.enterpriseService.deleteEnterprise(this.id).subscribe(
      () => {
        this.toastr.success('Entreprise supprimée avec sucès');
        this.dialogRef.close('delete');
      },
      () => {
        this.toastr.error("La suppression de l'entreprise a échoué");
      }
    );
  }
}
