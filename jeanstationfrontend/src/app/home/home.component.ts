import { Component, OnInit } from '@angular/core';
import Cart from '../models/Cart';
import Product from '../models/Product';
import WishList from '../models/WishList';
import { CartService } from '../services/cart.service';
import { HomeService } from '../services/home.service';
import { UserService } from '../services/user.service';
import { WishlistService } from '../services/wishlist.service';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDetailsService } from '../services/product-details.service';
import { AddressService } from '../services/address.service';
import Address from '../models/Address';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  currentRoute: string;

  constructor(private homeservice: HomeService, private snackbar: MatSnackBar, private wishlistservice: WishlistService, public userservice: UserService, public cartService: CartService,private route: ActivatedRoute, private addressService: AddressService, private router: Router) { 

    this.router.events.subscribe((event: Event) => {
      //console.log(event);
      if (event instanceof NavigationEnd) {
          this.loadProductsPage();
      }
    });
  }

  public products: Array<Product>;
  public filteredProducts: Array<Product> = [];
  public productBrands: Array<string>;
  public selectedBrands: Array<string> = [];
  public wishlists: Array<WishList> = [];
  public wishlist = new WishList();
  public categoryType:string = "";
  public productinstance = new Product();
  public cart = new Cart();
  public cartProduct = new Cart();
  public flgDisabled: boolean = true;
  public addresses: Array<Address>;

  openSnackBar(message: string) {
    this.snackbar.open(message, "Close", {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  getAddresses() {
    this.addressService.GetAddressByUserId(this.userservice.LoggedInUser?.userId).subscribe((data: any) => {
      this.addresses = data;
      console.log(this.addresses);
    });
  }

  loadProductsPage() {
    this.filteredProducts = [];
    this.selectedBrands = [];
    let category = this.route.snapshot.params['category'];
      if(category == 'All')
      {
        this.GetProducts();      
      }
      else if(category == 'Kids') {
        this.categoryType= category;
        this.homeservice.GetProducts().subscribe((data: any) => {
          this.products = data.filter(f=>f.productByGender == 'Girls' || f.productByGender == 'Boys');
          this.products.forEach(element => { 
              this.GetProductImage(element);
          });
          this.productBrands = [...new Set(this.products?.map(a => a.productBrand))];
        }, error => {
          console.log(error);
        });
      }
      else
      {
        this.categoryType= category;
        this.homeservice.GetProducts().subscribe((data: any) => {
          this.products = data.filter(f=>f.productByGender == this.categoryType);
          this.products.forEach(element => { 
              this.GetProductImage(element);
          });
          this.productBrands = [...new Set(this.products?.map(a => a.productBrand))];
        }, error => {
          console.log(error);
        });
      }
  }

  ngOnInit(): void {// On refresh, reload the user session
    this.userservice.isLogin = localStorage.getItem("isLoggedIn") == 'true' ? true : false;
    this.userservice.LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    
    this.loadProductsPage();
    if(this.userservice.isLogin) {
      this.GetWishlistDetails();
      this.getAddresses();
      this.cartService.GetCart(this.userservice.LoggedInUser?.userId).subscribe((cartData: Cart) => {
        if(cartData != null)
          this.cartService.cartDetails = cartData;
      }, error => {
        console.log(error);
      });
    }
  }

  onCheckboxChange(event) {

    if(event.target.checked) {
      this.selectedBrands?.push(event.target.id);
    }

    if(event.target.checked == false) {
      this.selectedBrands?.splice(this.selectedBrands.indexOf(event.target.id), 1);
    }
    this.filteredProducts = this.products.filter((item: any) => this.selectedBrands.includes(item.productBrand));
    console.log(this.filteredProducts);
    console.log(this.products);
  }

  GetProducts(): any {
    this.homeservice.GetProducts().subscribe((data: Array<Product>) => {
      this.products = data;
      this.products.forEach(element => {
        this.GetProductImage(element);
      });
      this.productBrands = [...new Set(this.products?.map(a => a.productBrand))];
    }, error => {
      console.log(error);
    });
  }

  GetProductImage(product: any){
     this.homeservice.GetProductImages(product.productId).subscribe((data: any) => {
     product.ProductImages = data;
    }, error => {
      console.log(error);
    });
  }

  AddToWishlist(productId: string) {
    this.openSnackBar("Added to wishlist!");
    this.wishlist.userId =this.userservice.LoggedInUser?.userId;
    this.wishlist.productId = productId;
    delete this.wishlist.wishlistId;
    this.wishlistservice.AddWishList(this.wishlist).subscribe(data => {
      this.GetWishlistDetails();
    }, error => {
      console.log(error);
    });
    
  }

  IsProductNotInWishlist(productId: string) {
    return this.wishlists.filter(f => f.productId == productId).length < 1;
  }

  IsProductNotInCart(productName: string) {
    return this.cartService.cartDetails.products?.filter(f => f.productName == productName).length < 1 || this.cartService.cartDetails.products?.filter(f => f.productName == productName) == undefined;
  }

  GetWishlistDetails() {
    this.wishlistservice.GetWishlistByUserId(this.userservice.LoggedInUser?.userId).subscribe((data: any) => {
      this.wishlists = data;
    }, error => {
      console.log(error);
    })

  }
}