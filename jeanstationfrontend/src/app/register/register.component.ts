import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import User from '../models/User';


import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  public user:User = new User();
  constructor(private service: UserService,private fb:FormBuilder,private snackbar:MatSnackBar,public route:Router) {
    
  }
  public email = new FormControl('', Validators.required);
  public password = new FormControl('', Validators.required);
  public confirmpassword = new FormControl('', Validators.required);
  public firstname = new FormControl('', Validators.required);
  public lastname = new FormControl('', Validators.required);
  public contact = new FormControl('', Validators.required);

  openSnackBar(message: string) {
    this.snackbar.open(message, "Close", {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }


  RegisterUser(){
    if(this.password.value == this.confirmpassword.value) {
      
    console.log("Registering User");
    delete this.user.userId;
    delete this.user.role;
    this.user.emailAddress=this.email.value;
    this.user.password=this.password.value;
    this.user.firstName=this.firstname.value;
    this.user.lastName=this.lastname.value;
    this.user.contactNumber=this.contact.value;

    console.log(this.user);

    this.service.RegisterUser(this.user).subscribe((data:any) =>{
      this.openSnackBar("Registered Successfully");
      console.log(data);
      this.route.navigateByUrl('/login');
      console.log(data);
    }, ((error:any) => {
      console.log(error.message);
    }));
  }
    }

  ngOnInit(): void {
    
  }
}




