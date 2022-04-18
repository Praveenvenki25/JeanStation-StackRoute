import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from '../services/product-details.service';
import Product from '../models/Product';
import WishList from '../models/WishList';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WishlistService } from '../services/wishlist.service';
import { UserService } from '../services/user.service';
import { CartService } from '../services/cart.service';
import Cart from '../models/Cart';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private service: ProductDetailsService,private snackbar: MatSnackBar,private wishlistservice: WishlistService, public userservice: UserService,public cartService: CartService) { }

  public categoryOptions:string[]=['All','Kids','Men','Women'];
  public latestProductsCount = 10;
  public products: any;
  public productImages: any;
  public imageArray:any;

  public wishlists: Array<WishList> = [];
  public wishlist = new WishList();
  public flgDisabled: boolean = true;

  openSnackBar(message: string) {
    this.snackbar.open(message, "Close", {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
  
  ngOnInit(): void {
    // On refresh, reload the user session
    this.userservice.isLogin = localStorage.getItem("isLoggedIn") == 'true' ? true : false;
    this.userservice.LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    if(this.userservice.isLogin) {
      this.cartService.GetCart(this.userservice.LoggedInUser?.userId).subscribe((cartData: Cart) => {
        if(cartData != null)
          this.cartService.cartDetails = cartData;
      }, error => {
        console.log(error);
      });
    }
    
    this.GetLatestProducts(10);
  }

  GetLatestProducts(iCount:number)
  {
    this.service.GetLatestProducts(iCount).subscribe((data:Product) =>{
        this.products = data;
        this.products.forEach(element => { 
        this.GetProductImage(element);
        });
    }, error => {
      console.log(error);
    });
  }

  GetProductImage(product: any){
    this.service.GetProductImagesById(product.productId).subscribe((data: any) => {
      product.ProductImages = data;
   });
 }

 AddToWishlist(productId: string) {
  this.openSnackBar("Product added to wishlist Successfully");
  this.wishlist.userId =this.userservice.LoggedInUser?.userId;
  this.wishlist.productId = productId;
  delete this.wishlist.wishlistId;
  console.log(this.wishlist);
  this.wishlistservice.AddWishList(this.wishlist).subscribe(data => {
    this.GetWishlistDetails();
  });
  
}

GetWishlistDetails() {
  this.wishlistservice.GetWishlistByUserId(this.userservice.LoggedInUser?.userId).subscribe((data: any) => {
    this.wishlists = data;
  });

}

IsProductNotInCart(productName: string) {
  return this.cartService.cartDetails.products.filter(f => f.productName == productName).length < 1;
}

IsProductNotInWishlist(productId: string) {
  return this.wishlists.filter(f => f.productId == productId).length < 1;
}

}
