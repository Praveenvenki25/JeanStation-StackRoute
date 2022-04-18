import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from 'aws-sdk';
import { environment } from 'src/environments/environment';
import Order from './models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrdersserviceService {

  order: Order = new Order();

  constructor(private http: HttpClient) { }

  GetOrders(){
    return this.http.get(environment.apiUrlUserId)
  }

  GetOrdersByUserId(userId: string){
    return this.http.get(`${environment.apiUrlUserId}/${userId}`);
  }

  GetOrderStatuses() {
    return this.http.get(environment.getOrderStatusesURL);
  }

  AddOrder() {
    return this.http.post(environment.addOrderURL, this.order, {responseType: 'text'});
  }

  UpdateOrder(orderId: string, order: Order) {
    return this.http.put(`${environment.updateOrderURL}`, order, {responseType: 'text'});
  }
}
