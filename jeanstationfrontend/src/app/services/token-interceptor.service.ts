import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('INTERCEPTOR');
    // We retrieve the token, if any
    const token =localStorage.getItem('token');
    //console.log(token);
   
      //console.log(token);
      let A1 = req.clone({
        
          setHeaders: {
              Authorization: `Bearer ${token}`  
          }
      });
      return next.handle(A1);   

  
  // else {
  //     req = req.clone({
  //         setHeaders: {
  //             'Content-Type': 'application/json; charset=utf-8',
  //             Accept: 'application/json'
  //         }
  //     });
  // }
    
 
  }
}
