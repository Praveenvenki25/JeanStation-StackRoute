import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import WishList from '../models/WishList';
import Cart from '../models/Cart';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private http:HttpClient) { }

  GetProductDetailsById(productId:string){
    return this.http.get(`${environment.apiUrl}/${productId}`);
  }

  GetProductImagesById(productId:string){
    return this.http.get(`${environment.apiImageUrl}/${productId}`);
  }

  PostToWishlist(wish: WishList) {
    console.log(wish);
    return this.http.post(`${environment.apiUrlWishlist}`,wish);
  }

  PostProductToCartItems(cartItems:Cart)
  {
    //console.log(cartItems);
    //return null;
    return this.http.post(`${environment.addToCartUrl}`,cartItems);
  }

  GetLatestProducts(productCount:number)
  {
    return this.http.get(`${environment.getLatestProductsURL}/${productCount}`);
  }

  GetProductsByCategory(category:string)
  {
    return this.http.get(`${environment.getProductsByCategoryURL}/${category}`);
  }
}
