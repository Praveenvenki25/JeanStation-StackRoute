import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import Cart from '../models/Cart';
import Order from '../models/Order';
import { OrdersserviceService } from '../ordersservice.service';
import { CartService } from '../services/cart.service';
import { DiscountService } from '../services/discount.service';
import { HomeService } from '../services/home.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  onSubmit: Boolean = false;
  constructor(private formBuilder: FormBuilder, public homeService: HomeService, public cartService: CartService, private route: Router, private orderService: OrdersserviceService, private userService: UserService, private discountService: DiscountService) { }

  ngOnInit(): void {
    console.log(this.cartService.cartDetails);
  }

  public paymentForm = this.formBuilder.group({
    cardNumber: ['', Validators.required],
    cardHolderName: ['', Validators.required],
    cvv: ['', Validators.required],
    expiryDate: ['', Validators.required]
  })

  GetProductImage(product: any){
    this.homeService.GetProductImages(product.productId).subscribe((data: any) => {
    product.ProductImages = data;
   });
 }

 Test(num: number) {
   console.log(num, num.toString().length);
 }

  updateAndRouteToOrderConfirmation() {
    this.onSubmit = true;
    if(this.paymentForm.valid) {
        this.onSubmit = false;  

        // create orders data and save it to DB
        this.orderService.order.orderDateTime = new Date();
        this.orderService.order.products = this.cartService.cartDetails.products;
        this.orderService.order.products.forEach(element => { 
          this.GetProductImage(element);
        });

        this.orderService.order.totalPrice = this.cartService.cartDetails.amountToBePaid;
        this.orderService.order.discountPrice = this.cartService.cartDetails.discountedAmount;
        this.orderService.order.couponCode = this.discountService.couponCode;
        this.orderService.order.user = this.userService.LoggedInUser;
        this.orderService.order.orderStatus = 'Confirmed';
        this.orderService.order.orderDateTime = new Date();

        this.discountService.isValidCoupon = false;
        console.log(this.orderService.order);

        this.orderService.AddOrder().subscribe(data => {
          console.log("Order added to DB");

          this.cartService.cartDetails.isActive = false;
          this.cartService.UpdateCart().subscribe(data => {
              console.log("Updated isActive in cart DB");
              
              this.cartService.cartDetails = new Cart();
              //this.cartService.GetCart(this.userService.LoggedInUser?.userId);

              // Get the saved order data from DB to show the order id in the order confirmation page
              this.orderService.GetOrdersByUserId(this.userService.LoggedInUser.userId).subscribe((data: Array<Order>) => {
                data = data.sort((a, b) => new Date(b.orderDateTime).getTime() - new Date(a.orderDateTime).getTime());
                console.log(data);
                // Set the order id
                this.orderService.order.orderId = data[data.length - 1].orderId;

                // Reset the cart
                this.cartService.cartDetails = new Cart();

                this.route.navigateByUrl("/orderconfirmation");
              });
          }, error => {
            console.log(error);
          })
        }, error => {
          console.log(error);
        })
    }
  }
}
