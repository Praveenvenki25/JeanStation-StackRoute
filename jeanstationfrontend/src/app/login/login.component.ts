import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Cart from '../models/Cart';
import User from '../models/User';
import { CartService } from '../services/cart.service';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service: UserService, private route: Router, private cartService: CartService) { }

  // captcha: string;
  // email: string;
  public username = new FormControl('', Validators.required);
  public password = new FormControl('', Validators.required);
  isLoginClicked: Boolean = false;
  ngOnInit(): void {
    // this.service.fetchUser().subscribe(data => {
    //   console.log(data);
    // });
    // this.captcha='';
    // this.email = 'hits12@gmail.com';
  }

  // public isButtonDisabled: boolean = true;
  // resolved(token: any) {
  //   this.captcha = token;
  //   console.log('resloved captcaha:' + this.captcha)
  //     }

  


  onSubmit() {
    console.log("Entering Submit");
    this.isLoginClicked = true;
    if (this.username.valid && this.password.valid) {
      this.service.loginUser(this.username.value, this.password.value).subscribe((data: any) => {
        this.service.isLogin=true;
        console.log(data);
        localStorage.setItem('token',data.Token);
        localStorage.setItem('isLoggedIn', 'true');
        
        this.service.GetUserbyEmail(this.username.value).subscribe((data: any) => {
          this.service.LoggedInUser = new User();
          this.service.LoggedInUser = data;
          localStorage.setItem('userData', JSON.stringify(this.service.LoggedInUser));
          
          this.cartService.GetCart(this.service.LoggedInUser?.userId).subscribe((cartData: Cart) => {
            if(cartData != null)
              this.cartService.cartDetails = cartData;
          }, error => {
            console.log(error);
          });
        }, error => {
          console.log(error);
        });
        this.route.navigateByUrl('');
        console.log(data);
      }, error => {
        console.log(this.service.isLogin, this.isLoginClicked);
        console.log(error);
      });
    }
  }
  public isButtonDisabled: boolean = true;
  resolved(token: any) {
    this.service.checkCaptcha(token).subscribe((data: any) => {
      if (data.success) {
        this.isButtonDisabled = false;
      }
    });
  }
}
