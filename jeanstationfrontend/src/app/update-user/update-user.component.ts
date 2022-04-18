import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import User from '../models/User';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
   user = new User();
   user1:any;
  
  constructor(private service:UserService) { }

  public email=new FormControl('',Validators.required);
  public password=new FormControl('',Validators.required);
  public firstname=new FormControl('',Validators.required);
  public lastname=new FormControl('',Validators.required);
  public contact=new FormControl('',Validators.required);

  
  ngOnInit(): void {
    
  }

  



  UpdateUser(){
    console.log("Updating User");
    this.user1=new User();
    this.user1.UserId=this.user.userId;
    this.user1.EmailAddress=this.email.value;
    this.user1.Password=this.password.value;
    this.user1.FirstName=this.firstname.value;
    this.user1.LastName=this.lastname.value;
    this.user1.ContactNumber=this.contact.value;
    this.user1.Role=this.user.role;

    this.service.UpdateUser(this.user1).subscribe((data:any) =>{
      console.log(data);
    });
   
  }
  getUser(){

  this.service.GetUserbyEmail(this.service.username).subscribe((data:any) => {
    // this.user.UserId=data.userId;
    // this.user.FirstName=data.firstName;
    // this.user.LastName=data.lastName;
    // this.user.ContactNumber=data.contactNumber;
    // this.user.EmailAddress=data.emailAddress;
    // this.user.Password=data.password;
    // this.user.Role=data.role;
    this.user=data;

    console.log(this.user);
   
  });
    
  }

}
