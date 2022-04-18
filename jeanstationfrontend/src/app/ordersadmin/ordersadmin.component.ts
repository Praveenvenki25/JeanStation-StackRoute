import { Component, OnInit } from '@angular/core';
import { OrdersserviceService } from '../ordersservice.service';
import { UserService } from '../services/user.service';
import Order from '../models/Order';
import { ProductDetailsService } from '../services/product-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Cart from '../models/Cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-ordersadmin',
  templateUrl: './ordersadmin.component.html',
  styleUrls: ['./ordersadmin.component.css']
})
export class OrdersadminComponent implements OnInit {

  constructor(private cartService: CartService, private orderService: OrdersserviceService, private userService: UserService,private snackbar:MatSnackBar) { }

  public orders: Array<Order> = [];
  public orderStatuses: any;

  openSnackBar(message: string) {
    this.snackbar.open(message, "Close", {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  ngOnInit(): void {
    // On refresh, reload the user session
    this.userService.isLogin = localStorage.getItem("isLoggedIn") == 'true' ? true : false;
    this.userService.LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    this.cartService.GetCart(this.userService.LoggedInUser?.userId).subscribe((cartData: Cart) => {
      if(cartData != null)
        this.cartService.cartDetails = cartData;
    }, error => {
      console.log(error);
    });
    this.GetOrders();
    this.GetOrderStatuses();
  }
  GetOrders()
  {
    this.orderService.GetOrders().subscribe((data: any) => {
      this.orders = data;
      this.orders.forEach((element: any) => {
        this.userService.GetUserbyId(element.userId).subscribe(data => {
            element.user = data;
        });
      });
    });
  }

  GetOrderStatuses() {
    this.orderService.GetOrderStatuses().subscribe((data: any) => {
      this.orderStatuses = data;
    });
  }

  UpdateOrderStatus(order: Order) {
    this.orderService.UpdateOrder(order.orderId, order).subscribe(data => {
      this.openSnackBar("Order Status updated!");
    });
  }
}
