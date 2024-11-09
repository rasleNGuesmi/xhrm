import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {EnterpriseService} from "../../shared/services/enterprise/enterprise.service";
import {DeleteEnterpriseComponent} from "../../shared/modals/delete-enterprise/delete-enterprise.component";

@Component({
  selector: 'app-tech-enterprises',
  templateUrl: './tech-enterprises.component.html',
  styleUrls: ['./tech-enterprises.component.scss']
})
export class TechEnterprisesComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private enterpriseService: EnterpriseService
  ) { }
  public rows: any[];
  displayedColumns = [
    'enterprise_name',
    'admin',
    'activity',
    'employees_number',
    'email',
    'phone',
    ' ',
  ];
  columns = [
    // TODO CHECK NAMES
    { name: 'enterprise_name', label: 'Enterprise' },
    { name: 'admin', label: 'Admin' },
    { name: 'username', label: 'Username' },
    { name: 'activity', label: 'Activité' },
    { name: 'employees_number', label: 'Nombre d\'employés' },
    { name: 'email', label: 'Adresse mail' },
    { name: 'phone', label: 'Téléphone' },
    {
      name: ' ',
      label: ' ',
      actions: [
        {
          name: 'Voir Profil',
          icon: 'person',
          actionHandler: this.redirectAction.bind(this),
        },
        {
          name: 'Envoyer Email',
          icon: 'email',
          actionHandler: this.sendEmail.bind(this),
        },
        // TODO CHECK OR REMOVE
        {
          name: 'Modifier',
          icon: 'create',
          actionHandler: "",//this.redirectAction.bind(this),
          // TODO FINISH
        },
        {
          name: 'Supprimer',
          icon: 'delete_forever',
          actionHandler: this.deleteAction.bind(this),
        }
      ]
    }
  ]
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  paginatorData = {
    pageIndex: 0,
    pageSize: 10,
    length: 50,
    totalItems: 50,
  };

  ngOnInit(): void {
    this.retrieveAllEnterprises();
    console.log("");
  }

  sendEmail(row: any) {
    window.open('mailto:' + row.email);
  }

  async deleteAction(row: any) {
    try {
      await this.openDialogDelete(row);
      this.retrieveAllEnterprises();
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  }

  openDialogDelete(row: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let dialogRef: any;
      // TODO GO ON HERE
      dialogRef = this.dialog.open(DeleteEnterpriseComponent, {
        data: {
          id: row.enterprise_id,
        },
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === 'delete') {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  retrieveAllEnterprises(): void {
    this.enterpriseService.getAllEnterprises().subscribe(
      (enterprises: any) => {
        this.dataSource.data = this.takeNelmentsFromTable(
          this.paginatorData.pageSize
        );
        this.paginatorData.length = enterprises.results.length;
        console.log('enterprises: ', enterprises.results);
      }
    )
  }

  // TODO FINISH PAGINATION
  onPaginateChange($event: any) {
    this.paginatorData = $event;
    this.paginatorData.pageSize = $event.pageSize;
    this.paginatorData.pageIndex = $event.pageIndex;
    this.dataSource.data = this.takeNelmentsFromTable($event.pageSize);
    //this.retrieveAllDepartmentsPaginated($event.pageSize, $event.pageIndex);
    // retrieveAllDepartmentsPaginated(pageSize:number,pageIndex:number)
    /*departments.subscribe((data: any) => {
      //this.dataSource.data = data['results'];
      this.paginatorData.length = data['count'];
      console.log(data);
    });*/
  }

  public takeNelmentsFromTable(elements: number) {
    this.enterpriseService.getAllEnterprises().subscribe(
      (data: any) => {
        this.dataSource.data = data.results.map((enterprise: any) => {
          return {
            ...enterprise,
            enterprise_name: enterprise.enterprise_name,
            /* TODO RETRIEVE ADMIN IN BACKEND SERIALIZER */
            // admin: enterprise.admin ? enterprise.admin.first_name + " " + enterprise.admin.last_name : "---",
            admin: enterprise.admin_fname && enterprise.admin_lname ? enterprise.admin_fname + " " + enterprise.admin_lname : "---",
            activity: enterprise.activity,
            employees_number: enterprise.employees_number,
            username: enterprise.admin_username,
            /* TODO MAKE CONSISTENT WITH BACKEND */
            email: enterprise.email,
            phone: enterprise.phone,
          };
        });
      }
    );
    const resultArray: any[] = [];

    if(elements <= this.dataSource.data.length) {
      for (let i =0; i < elements; i++) {
        resultArray.push(this.dataSource.data[i]);
      }
      return resultArray;
    }

    return this.dataSource.data;
  }

  redirectAction(row: any) {
    console.log("ROW_USERNAME",row.username);
    this.router.navigate(['/technical-admin/profile-enterprise'], {
      queryParams: { id: row.enterprise_id, username: row.username }
    });
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public sortTable(field: string, direction: string) {
    if (direction == 'asc') {
      this.dataSource.data = this.dataSource.data.sort((a, b) =>
        a[field].localeCompare(b[field])
      );
    } else if (direction == 'desc') {
      this.dataSource.data = this.dataSource.data.sort((a, b) =>
        b[field].localeCompare(a[field])
      );
    } else {
      this.retrieveAllEnterprises();
    }
  }

  handleSort($event: any) {
    this.sortTable($event.active, $event.direction);
  }
}
