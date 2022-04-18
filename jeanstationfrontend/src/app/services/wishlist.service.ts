import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import WishList from '../models/WishList';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient, private route: Router) { }
  public userId = '';
  AddWishList(wish : WishList){
    return this.http.post(environment.getwishlistapi, wish);
   }

  GetWishlistByUserId(userId: string){
     return this.http.get(`${environment.getwishlistapi}/${userId}`);
   }

  //  GetWishlist(userId: string){
  //   return this.http.get(`${environment.getwishlistapi}/${userId}`)
  // }

  DeleteWishlist(userId: string){
     return this.http.delete(`${environment.getwishlistapi}/${userId}`);
   }

  

}
