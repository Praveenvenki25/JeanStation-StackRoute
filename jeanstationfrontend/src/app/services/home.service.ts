import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Cart from '../models/Cart';
import Product from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpService: HttpClient) { }

  GetProducts(){
    return this.httpService.get(environment.gethomeproductapi);
  }

  DeleteProduct(productId: string){
    return this.httpService.delete(`${environment.gethomeproductapi}/${productId}`)
  }

  GetProductImages(productId: string){
    return this.httpService.get(`${environment.getproductimageapi}/${productId}`)
  }

  PostProductToCartItems(cartItems:Cart)
  {
    return this.httpService.post(`${environment.addToCartUrl}`,cartItems);
  }
}
