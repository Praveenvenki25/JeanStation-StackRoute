import { Component, OnInit } from '@angular/core';
import Cart from '../models/Cart';
import Order from '../models/Order';
import { OrdersserviceService } from '../ordersservice.service';
import { CartService } from '../services/cart.service';
import { HomeService } from '../services/home.service';
import { ProductDetailsService } from '../services/product-details.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private userService: UserService, private cartService: CartService, private orderService: OrdersserviceService, private homeservice: HomeService, private productservice: ProductDetailsService) { }
  public productImage: any;
  public orderproducts: any;
  public userId: string = this.userService.LoggedInUser?.userId;


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
    this.GetOrdersByUserId(this.userId);
  }

  GetOrdersByUserId(userId: string)
  {
    this.orderService.GetOrdersByUserId(userId).subscribe((data: any) => {
      this.orderproducts = data;
      console.log(data);
      this.orderproducts.forEach(element => {
        element.products.forEach(prod => {
          this.productservice.GetProductDetailsById(prod.productId).subscribe(productData => {
            //console.log(productData);
            prod.product = productData;
            //console.log(element);
          this.productservice.GetProductImagesById(prod.productId).subscribe(prodimageData =>
            {
              console.log(prodimageData);
              prod.prodImage = prodimageData;
          }, error => {
            console.log(error);
          });
          }, error => {
            console.log(error);
          })
        })
      })
    }, error => {
      console.log(error);
    });
  }


}
