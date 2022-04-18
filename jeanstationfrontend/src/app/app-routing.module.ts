import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductComponent } from './product/product.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductadminComponent } from './productadmin/productadmin.component';
import { OrdersadminComponent } from './ordersadmin/ordersadmin.component';
import { LandingComponent } from './landing/landing.component';
import { PaymentComponent } from './payment/payment.component';
import { AddressComponent } from './address/address.component';
import { OrderconfirmationComponent } from './orderconfirmation/orderconfirmation.component';
import { ProfileComponent } from './profile/profile.component';
import { DiscountsadminComponent } from './discountsadmin/discountsadmin.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'home', component: LandingComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'products', component: HomeComponent},
  {path: 'wishlist', component: WishlistComponent,canActivate:[AuthGuard]},
  {path:'product', component: ProductComponent},
  {path:'orders', component: OrdersComponent,canActivate:[AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'address', component: AddressComponent,canActivate:[AuthGuard]},
  {path:'products/:category/productprofile/:id', component: ProductComponent},
  {path:'product-admin',component: ProductadminComponent,canActivate:[AuthGuard]},
  {path:'orders-admin', component: OrdersadminComponent,canActivate:[AuthGuard]},
  {path:'discounts-admin', component: DiscountsadminComponent,canActivate:[AuthGuard]},
  //{path:'landing', component: LandingComponent},
  {path:'payment', component: PaymentComponent,canActivate:[AuthGuard]},
  {path: 'products/:category', component: HomeComponent},
  {path: 'orderconfirmation', component: OrderconfirmationComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
