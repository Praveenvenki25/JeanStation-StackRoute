import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Cart from '../models/Cart';
import Product from '../models/Product';
import WishList from '../models/WishList';
import { CartService } from '../services/cart.service';
import { HomeService } from '../services/home.service';
import { ProductDetailsService } from '../services/product-details.service';
import { UserService } from '../services/user.service';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private wishlistservice: WishlistService, private route: Router, private userservice: UserService, private homeservice: HomeService, private productservice: ProductDetailsService, public cartService: CartService) { }

  // public wishlists: any;
  public wishlists: Array<WishList>
  public wishlistinstance = new WishList();
  public products: Array<Product> = [];
  public flgDisabled: boolean = true;

  ngOnInit(): void {
    // On refresh, reload the user session
    this.userservice.isLogin = localStorage.getItem("isLoggedIn") == 'true' ? true : false;
    this.userservice.LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    this.cartService.GetCart(this.userservice.LoggedInUser?.userId).subscribe((cartData: Cart) => {
      if(cartData != null)
        this.cartService.cartDetails = cartData;
    }, error => {
      console.log(error);
    });
    this.GetWishlistDetails();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Close", {
      duration: 1500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  IsProductNotInCart(productName: string) {
    return this.cartService.cartDetails.products.filter(f => f.productName == productName).length < 1;
  }

  GetWishlistDetails(){
    this.products = new Array<Product>();
    this.wishlistservice.GetWishlistByUserId(this.userservice.LoggedInUser?.userId).subscribe((data : any) => {
      this.wishlists = data;
      data.forEach(element => {
          this.productservice.GetProductDetailsById(element.productId).subscribe((data: any) => {
            this.GetProductImage(data);
          })
      })
      
      console.log(this.products);
    });
  }

  GetProductImage(product: any){
    this.homeservice.GetProductImages(product.productId).subscribe((data: any) => {
    product.ProductImages = data;
    this.products.push(product);
    console.log(this.products);
   });
 }

 RemoveProductFromWishList(productId: string) { 
   console.log(productId);
   console.log(this.wishlists.filter(wl => wl.productId == productId && 
    wl.userId == this.userservice.LoggedInUser?.userId).pop());
  this.wishlistservice.DeleteWishlist(this.wishlists.filter(wl => wl.productId == productId && 
                                                                   wl.userId == this.userservice.LoggedInUser?.userId)
                                                      .pop().wishlistId).subscribe(data => {
                                                        this.openSnackBar("Removed from Wishlist!");
                                                        this.GetWishlistDetails();
   })
 }
}


