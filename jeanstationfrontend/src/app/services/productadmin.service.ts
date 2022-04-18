import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Product from '../models/Product';
import ProductImage from '../models/ProductImage';

@Injectable({
  providedIn: 'root'
})
export class ProductadminService {

  constructor(private httpService: HttpClient) { }

  GetProducts() {
    return this.httpService.get(environment.getProductsURL);
  }

  GetProductByName(productName: string) {
    return this.httpService.get(`${environment.getProductByNameURL}/${productName}`);
  }

  DeleteProduct(productId: string) {
    return this.httpService.delete(`${environment.deleteProductURL}/${productId}`);
  }

  AddProduct(product: Product) {
    return this.httpService.post(environment.addProductURL, product, {responseType: 'text'});
  }

  UpdateProduct(product: Product) {
    console.log("Update product", product);
    return this.httpService.put(`${environment.updateProductURL}/${product.productId}`, product);
  }

  AddProductImage(productImage: ProductImage) {
    return this.httpService.post(environment.addProductImageURL, productImage);
  }

  DeleteProductImage(productId: string) {
    return this.httpService.delete(`${environment.deleteProductImageURL}/${productId}`);
  }
}
