import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Supplier } from '../../models/supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}
  getSupplier(id: number) {
    return this.http.get(
      environment.ENTERPRISE_URL + '/get-suppliers/' + id + '/'
    );
  }
  getAllSupplier(id: number) {
    return this.http.get(
      environment.EMPLOYEE_URL + '/get-suppliers/' + id + '/'
    );
  }
  getAllSupplierManager(id: number) {
    return this.http.get(
      environment.MANAGER_URL + '/get-suppliers/' + id + '/'
    );
  }

  getAllSupplierTeamLeader(id: number) {
    return this.http.get(
      environment.TEAM_LEADER_URL + '/get-suppliers/' + id + '/'
    );
  }
  createSupplier(supplier: Supplier) {
    return this.http.post(environment.SUPPLIER_URL + '/add/', supplier);
  }
  updateSupplier(supplier: Supplier, id: number) {
    return this.http.put(
      environment.SUPPLIER_URL + '/update/' + id + '/',
      supplier
    );
  }
  deleteSupplier(id: number) {
    return this.http.delete(environment.SUPPLIER_URL + '/delete/' + id + '/');
  }

  listSuppliers() {
    return this.http.get(environment.SUPPLIER_URL + '/list/');
  }
}
