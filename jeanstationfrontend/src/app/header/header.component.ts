import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import Address from '../models/Address';
import Discount from '../models/Discount';
import { AddressService } from '../services/address.service';
import { CartService } from '../services/cart.service';
import { DiscountService } from '../services/discount.service';
import { UserService } from '../services/user.service';
import { OrdersserviceService } from '../ordersservice.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userservice: UserService, private route: Router, public cartService: CartService, private addressService: AddressService, public discountService: DiscountService, public orderService: OrdersserviceService) { }
  isInValidCoupon: boolean = false;
  isInvalidAddress: boolean = false;
  public addresses: Array<Address> = [];

  Logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    this.route.navigateByUrl('/login');
    this.userservice.isLogin=false;
  }

  ngOnInit(): void {
  }

  @ViewChild('proceedPaymentCloseButton') proceedPaymentCloseButton!: ElementRef<HTMLElement>;

  triggerproceedPaymentCloseClick() {
    let el: HTMLElement = this.proceedPaymentCloseButton.nativeElement;
    el.click();
  }

  GetAddresses() {
    console.log(this.userservice.LoggedInUser?.userId);
    this.addressService.GetAddressByUserId(this.userservice.LoggedInUser?.userId).subscribe((data: any) => {
      this.addresses = data;
      console.log(this.addresses);
    });
  }

  updateAddressId(index: number) {
    console.log(index);
    this.orderService.order.addressId = this.addresses[index].addressId;
  }

  // Updates the quantity of the products in the cart
  UpdateQuantity(index: number, value: string) {
    if(value == '-' && this.cartService.cartDetails.products[index].productQuantity != 1) {
      this.cartService.cartDetails.products[index].productQuantity -= 1;
    }
    else if(value == '+' && this.cartService.cartDetails.products[index].productQuantity != 10) {
      this.cartService.cartDetails.products[index].productQuantity += 1;
    }
    this.cartService.ComputeTotalAmount();
    this.cartService.UpdateCart();
  }

  ApplyCouponCode(couponCode: string) {
    this.discountService.GetDiscountDetailsByCouponCode(couponCode).subscribe((data: any) => {
      console.log(data);
      console.log(typeof data.expiryDate);
      console.log(new Date().getTime());
      console.log(new Date(data.expiryDate).getTime());
      if(new Date().getTime() < new Date(data.expiryDate).getTime() && data.isActive) {

          this.discountService.isValidCoupon = true;
          this.isInValidCoupon = false;
          this.discountService.discountPercentage = data.discountPercentage;
          this.discountService.couponCode = data.couponCode;

          this.cartService.ComputeTotalAmount();
          
          this.cartService.UpdateCart().subscribe(data => {
            console.log("Cart updated in DB");
          }, error => {
            console.log(error);
          });
      }
      else {
        // Used to show the invalid coupon message
        this.isInValidCoupon = true;
      }
    }, error => { 
      console.log(error);
      this.isInValidCoupon = true;
    })
  }

  CloseModalandRouteToPayment() {
    if(this.orderService.order.addressId != '') {
      if(!this.discountService.isValidCoupon) {
        this.cartService.cartDetails.discountedAmount = this.cartService.cartDetails.amountToBePaid;
      }
      this.orderService.order.userId = this.userservice.LoggedInUser?.userId;
      this.triggerproceedPaymentCloseClick();
      this.route.navigateByUrl('/payment');
    }
    else {
      // Used to show 'Choose an address' message
      this.isInvalidAddress = true;
    }
  }

}
