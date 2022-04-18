import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductadminComponent } from './productadmin/productadmin.component';
import { OrdersadminComponent } from './ordersadmin/ordersadmin.component';
import { HttpClient} from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UpdateUserComponent } from './update-user/update-user.component';
import { MatSelectModule } from '@angular/material/select';
import { LandingComponent } from './landing/landing.component';
import { PaymentComponent } from './payment/payment.component';
import { AddressComponent } from './address/address.component';
import { OrderconfirmationComponent } from './orderconfirmation/orderconfirmation.component';
import { ProfileComponent } from './profile/profile.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { DiscountsadminComponent } from './discountsadmin/discountsadmin.component';
import { TokenInterceptorService } from './services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    WishlistComponent,
    OrdersComponent,
    ProductadminComponent,
    OrdersadminComponent,
    UpdateUserComponent,
    LandingComponent,
    PaymentComponent,
    AddressComponent,
    OrderconfirmationComponent,
    ProfileComponent,
    DiscountsadminComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule ,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule,
    RecaptchaModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

// {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}