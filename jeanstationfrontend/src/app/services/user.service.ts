import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isLogin:boolean =false;
  public user:any;
  public LoggedInUser:any;
  public username:any;
  constructor(private http:HttpClient) { }
  fetchUser(){
    return this.http.get(environment.userUrl);
  }

  loginUser(EmailAddress:string,Password:string){
    this.user=new User();
    this.username=EmailAddress;
    this.user.EmailAddress=EmailAddress;
    this.user.Password=Password;

    return this.http.post(environment.loginUrl,this.user);

  }

  RegisterUser(user:User){

    return this.http.post(environment.registerUrl,user,{responseType: 'text'});
  }

  GetUserbyEmail(Email:String){
    return this.http.get(`https://localhost:44346/api/User/getUserByEmail/${this.username}`,this.username);
  }

  GetUserbyId(id: string) {
    console.log(`${environment.getUserbyIdUrl}/${id}`);
    return this.http.get(`${environment.getUserbyIdUrl}/${id}`);
  }

  UpdateUser(user:any){
    //this.updateUser=user;
    return this.http.put(`https://localhost:44346/api/User/${user.UserId}`,user);
  }
  
  checkCaptcha(token: any) {
    return this.http.get(`https://localhost:44312/api/User/verify?token=${token}`);
  }

  isAuthenticated(){
    var token = localStorage.getItem("token").toString();
    console.log(token);
    return this.http.post(`https://localhost:44346/api/User/validate/${token}`,token);

    
  }
}
