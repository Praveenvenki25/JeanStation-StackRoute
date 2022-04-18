import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Address from '../models/Address';
import { AddressService } from '../services/address.service';
import { UserService } from '../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../services/cart.service';
import Cart from '../models/Cart';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  userId: string = '';
  addresses: Array<Address> = [];
  address: Address = new Address();
  editedAddress: Address = new Address();
  displayedColumns: string[] = ['streetName', 'apartmentNumber', 'city', 'province', 'postalcode', 'editAddressIcon', 'deleteAddressIcon'];
  
  public addressForm = this.formBuilder.group({
    streetName: ['', Validators.required],
    apartmentNumber: ['', Validators.required],
    city: ['', Validators.required],
    province: ['', Validators.required],
    postalcode: ['', Validators.required]
  })

  public editaddressForm = this.formBuilder.group({
    streetName: ['', Validators.required],
    apartmentNumber: ['', Validators.required],
    city: ['', Validators.required],
    province: ['', Validators.required],
    postalcode: ['', Validators.required]
  })

  @ViewChild('addAddressCloseButton') addAddressCloseButton!: ElementRef<HTMLElement>;

  triggerAddAddressCloseClick() {
    let el: HTMLElement = this.addAddressCloseButton.nativeElement;
    el.click();
  }

  @ViewChild('editAddressCloseButton') editAddressCloseButton!: ElementRef<HTMLElement>;

  triggerEditAddressCloseClick() {
    let el: HTMLElement = this.editAddressCloseButton.nativeElement;
    el.click();
  }

  constructor(private cartService: CartService, private formBuilder: FormBuilder, private userService: UserService, private addressService: AddressService, private snackbar: MatSnackBar) { }

  openSnackBar(message: string) {
    this.snackbar.open(message, "Close", {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

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
    this.getAddressByUserId();
  }

  getAddressByUserId() {
      this.userId = this.userService.LoggedInUser?.userId;
      if(this.userId)
      {
        this.addressService.GetAddressByUserId(this.userId).subscribe((data: any) => {
          this.addresses = data;
          console.log(data);
        })
      }
  }

  addAddress() {
    if (this.addressForm.valid) {
      // copy forms data to address variable
      console.log(this.addressForm.value);
      this.address = this.addressForm.value;
      this.address.userId = this.userId; 
      console.log(this.address);

      this.addressService.AddAddress(this.address).subscribe((data: any) => {
        console.log(data);
        this.address = new Address();
        this.triggerAddAddressCloseClick();
        this.openSnackBar("Address added!");       
        this.getAddressByUserId();
        
      })
    }
  } 

  editAddress(addressId: string) {
    var temp: any;
    temp = this.addresses.find((a: any) => a.addressId == addressId);
    console.log(temp);
    //this.editedProduct = temp;
    this.editedAddress = JSON.parse(JSON.stringify(temp));
    console.log(this.editedAddress);
  }

  updateAddress() {
    this.addressService.UpdateAddress(this.editedAddress).subscribe(data => {
      console.log(data);
      this.triggerEditAddressCloseClick();
      this.openSnackBar("Address updated!");
      this.getAddressByUserId();
    });
  }

  deleteAddress(addressId: string) {

      this.addressService.DeleteAddress(addressId).subscribe(data => {
        console.log("Address deleted succesfully.");
        this.openSnackBar("Address deleted!");
        this.getAddressByUserId();
      })
  }
}
