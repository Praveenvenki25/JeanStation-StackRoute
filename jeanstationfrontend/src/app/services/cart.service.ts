import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Cart from '../models/Cart';
import CartProduct from '../models/CartProduct';
import Product from '../models/Product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './user.service';
import { DiscountService } from './discount.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpService: HttpClient,private snackbar: MatSnackBar, private userService: UserService, private discountService: DiscountService) { }

  cartDetails: Cart = new Cart();
  cartProduct: CartProduct = new CartProduct();

  openSnackBar(message: string) {
    this.snackbar.open(message, "Close", {
      duration: 1500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  GetCart(userId: string)
  {
    console.log(userId);
    return this.httpService.get(`${environment.getCartURL}/${userId}`);
  }

  AddCart()
  {
    return this.httpService.post(environment.addCartURL, this.cartDetails, {responseType: 'text'});
  }

  UpdateCart() {
    return this.httpService.put(environment.updateCartURL, this.cartDetails, {responseType: 'text'});
  }

  deleteCart() {
    return this.httpService.delete(`${environment.updateCartURL}/${this.cartDetails}`, {responseType: 'text'});
  }

  AddProductToCart(product: Product)
  {
    this.openSnackBar("Added to cart!");
    console.log(this.cartDetails);
    this.cartProduct = new CartProduct();
    this.cartProduct.productAmount = product.productPrice;
    this.cartProduct.productQuantity = 1;
    this.cartProduct.productName = product.productName;
    this.cartProduct.productId = product.productId;

    this.cartDetails.products?.push(this.cartProduct);
    this.cartDetails.userId = this.userService.LoggedInUser?.userId;

    this.ComputeTotalAmount();
    console.log(this.cartDetails);

    this.GetCart(this.userService.LoggedInUser?.userId).subscribe((data: any) => {
      console.log(data);
      if(data.length != 0)
      {
        this.UpdateCart().subscribe(data => {
          console.log("Cart updated in DB");
        }, error => {
          console.log(error);
        });
      }
    }, error => {
      console.log(error);
      this.AddCart().subscribe(data => {
        console.log("Cart added to DB");
        this.openSnackBar("Added to Cart!");
      }, error => {
        console.log(error);
      });
    });
  }

  RemoveProductFromCart(index: number)
  {
    this.cartDetails.products.splice(index, 1);
    this.ComputeTotalAmount();
    
    this.UpdateCart().subscribe(data => {
      console.log("Cart updated in DB");
    }, error => {
      console.log(error);
    });
  }

  ComputeTotalAmount() {
    this.cartDetails.totalAmount = 0;
    this.cartDetails.gst = 0;
    this.cartDetails.amountToBePaid = 0;

    this.cartDetails.products.forEach(product => {
      this.cartDetails.totalAmount += product.productAmount * product.productQuantity;
    })

    this.cartDetails.gst = 0.05 * this.cartDetails.totalAmount;
    this.cartDetails.amountToBePaid = this.cartDetails.totalAmount + this.cartDetails.gst;

    if(this.discountService.isValidCoupon) {
      console.log("Valid coupon");
      console.log(this.discountService.discountPercentage);
      console.log(this.cartDetails.amountToBePaid);
      this.cartDetails.discountedAmount = (100 - this.discountService.discountPercentage) * 0.01 * this.cartDetails.amountToBePaid;
      console.log(this.cartDetails.discountedAmount);
    }

    console.log(this.cartDetails);
  }
}
