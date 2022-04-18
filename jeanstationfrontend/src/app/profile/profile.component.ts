import { Component, OnInit } from '@angular/core';
import Cart from '../models/Cart';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private cartService: CartService) { }

  ngOnInit(): void {
    // On refresh, reload the user session
    this.userService.isLogin = localStorage.getItem("isLoggedIn") == 'true' ? true : false;
    this.userService.LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    this.cartService.GetCart(this.userService.LoggedInUser?.userId).subscribe((cartData: Cart) => {
      if(cartData != null)
        this.cartService.cartDetails = cartData;
    }, error => {
      console.log(error);
    });
  }

}
