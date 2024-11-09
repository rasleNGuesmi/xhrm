import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Order } from '../../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  getOrder(id: number) {
    return this.http.get(
      environment.ENTERPRISE_URL + '/get-orders/' + id + '/'
    );
  }
  getOrderByDepartment(id: number) {
    return this.http.get(
      environment.DEPARTMENT_URL + '/get-orders/' + id + '/'
    );
  }
  getOrdersByEmployee(id: number) {
    return this.http.get(
      environment.EMPLOYEE_URL + '/get-pending-orders/' + id + '/'
    );
  }
  getOrdersByAccountant(id: number) {
    return this.http.get(
      environment.ACCOUNTANT_URL + '/get-orders/' + id + '/'
    );
  }
  getHistoricOrder(id: number) {
    return this.http.get(
      environment.EMPLOYEE_URL + '/get-accepted-orders/' + id + ''
    );
  }
  createOrder(order: Order) {
    return this.http.post(environment.ORDER_URL + '/add/', order);
  }
  updateOrder(order: Order, id: number) {
    return this.http.put(environment.ORDER_URL + '/update/' + id + '/', order);
  }
  deleteOrder(id: number) {
    return this.http.delete(environment.ORDER_URL + '/delete/' + id + '/');
  }
  acceptOrder(id: number, order: Order) {
    return this.http.put(environment.ORDER_URL + '/accept/' + id + '/', order);
  }
  rejectOrder(id: number, order: Order) {
    return this.http.put(environment.ORDER_URL + '/reject/' + id + '/', order);
  }
  listOrders() {
    return this.http.get(environment.ORDER_URL + '/list/');
  }
}
