import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Discount from '../models/Discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  isValidCoupon: boolean = false;
  discountPercentage: number = -1;
  couponCode: string = '';

  constructor(private httpService: HttpClient) { }

  GetDiscountDetails() {
    return this.httpService.get(environment.getDiscounts);
  }

  GetDiscountDetailsByCouponCode(couponCode: string) {
    return this.httpService.get(`${environment.getDiscountsByCouponCodeURL}/${couponCode}`);
  }

  AddDiscountDetails(discount: Discount) {
    return this.httpService.post(`${environment.addDiscountURL}`, discount, {responseType: 'text'});
  }

  UpdateDiscountDetails(discount: Discount) {
    return this.httpService.put(`${environment.updateDiscountURL}/${discount.couponCode}`, discount, {responseType: 'text'});
  }

  DeleteDiscountDetails(discountId: string) {
    return this.httpService.delete(`${environment.deleteDiscountURL}/${discountId}`, {responseType: 'text'});
  }
}
