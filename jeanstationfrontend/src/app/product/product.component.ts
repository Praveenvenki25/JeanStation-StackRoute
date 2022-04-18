import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Cart from '../models/Cart';
import CartProduct from '../models/CartProduct';
import Product from '../models/Product';
import ProductImage from '../models/ProductImage';
import WishList from '../models/WishList';
import { CartService } from '../services/cart.service';
import { ProductDetailsService } from '../services/product-details.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private service: ProductDetailsService, private route: ActivatedRoute, public userservice: UserService, public cartService: CartService,private snackbar: MatSnackBar,private wishlistservice: WishlistService) { }

  public product: any;
  public products = Array<Product>();

  public productImage: any;
  public imageArray:string[]=[];

  public wishlists: Array<WishList> = [];
  public wishlist = new WishList();
  

  public ProductId:string = "P001";
  public isMultipleImages:boolean = false;
  public defaultImageUrl:string;
  public currentImageUrl:string="";
  public flgDisabled: boolean = true;
  public category:string;

  public cart = new Cart();
  public cartProduct = new CartProduct();

  openSnackBar(message: string) {
    this.snackbar.open(message, "Close", {
      duration: 1500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  ngOnInit(): void {

    let id=this.route.snapshot.params['id'];
    this.category = this.route.snapshot.params['category'];
    //console.log("Hi"+this.category);
    this.GetProductDetailsById(id);
    this.GetProductImagesById(id);

    this.GetWishlistDetails();
  }

  GetProductDetailsById(productId:string)
  {
    this.service.GetProductDetailsById(productId).subscribe((data:any) =>{
      this.product = data;
      console.log(this.product);
    });
  }

  GetProductImagesById(productId:string)
  {
    this.service.GetProductImagesById(productId).subscribe((data:any) =>{
      this.productImage = data;
      for(let i =0;i<this.productImage.length;i++)
        {
          this.imageArray[i] = this.productImage[i].productImageUrl;
        }

        this.defaultImageUrl = this.imageArray[0];
      
        if(this.imageArray.length>1)
        {
          this.isMultipleImages = true;
        }
    });
  }

  changeImage(imageUrl:string,isHovered:boolean)
  {
    if(isHovered)
    {
      this.defaultImageUrl = imageUrl;
    }
    else
    {   
      if(this.currentImageUrl == "")
      {
        this.defaultImageUrl = this.imageArray[0]; 
      }
      else
      {
        this.defaultImageUrl = this.currentImageUrl; 
      }
    }
  }

  changeImageOnClick(imageUrl:string)
  {
    this.defaultImageUrl = imageUrl;
    this.currentImageUrl = imageUrl;
  }

  // AddToWishlist(productId:string)
  // {
  //   this.wishlist.productId = productId;
  //   this.wishlist.userId = this.userservice.LoggedInUser.userId;
  //   this.service.PostToWishlist(this.wishlist).subscribe(data => console.log(data));
  // }

  AddToWishlist(productId: string) {
    this.openSnackBar("Added to wishlist!");
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
