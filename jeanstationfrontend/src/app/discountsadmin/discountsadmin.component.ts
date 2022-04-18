import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Discount from '../models/Discount';
import { FormBuilder, Validators } from '@angular/forms';
import { DiscountService } from '../services/discount.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../services/user.service';
import { CartService } from '../services/cart.service';
import Cart from '../models/Cart';

interface BooleanOptions {
  value: string;
  viewValue: string;
}

export interface IDiscount{
  discountId: string;
  couponCode: string;
  expiryDate: Date;
  isActive: Boolean;
  discountPercentage: number;
}

@Component({
  selector: 'app-discountsadmin',
  templateUrl: './discountsadmin.component.html',
  styleUrls: ['./discountsadmin.component.css']
})

export class DiscountsadminComponent implements OnInit {

  displayedColumns: string[] = ['discountId', 'couponCode', 'expiryDate', 'isActive', 'discountPercentage', 'editDiscountIcon', 'deleteDiscountIcon'];
  discounts: Discount[] = [];

  discount: Discount = new Discount();
  editedDiscount: Discount = new Discount();
  selected = 'true';
  onUpdateSubmit: Boolean = false;
  onAddSubmit: Boolean = false;
  isEditedDiscountValid: Boolean = false;

  dataSource = new MatTableDataSource<IDiscount>(this.discounts);

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  booleanOptions: BooleanOptions[] = [
    {value: 'true', viewValue: 'True'},
    {value: 'false', viewValue: 'False'}
  ];

  constructor(private userService: UserService, private cartService: CartService, private formBuilder: FormBuilder, private discountService: DiscountService, private snackbar: MatSnackBar) { }

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
    this.getDiscounts();
  }

  @ViewChild('editDiscountCloseButton') editDiscountCloseButton!: ElementRef<HTMLElement>;

  triggerEditDiscountCloseClick() {
    let el: HTMLElement = this.editDiscountCloseButton.nativeElement;
    el.click();
  }

  @ViewChild('addDiscountCloseButton') addDiscountCloseButton!: ElementRef<HTMLElement>;

  triggerAddDiscountCloseClick() {
    let el: HTMLElement = this.addDiscountCloseButton.nativeElement;
    el.click();
  }


  public discountForm = this.formBuilder.group({
    couponCode: ['', Validators.required],
    expiryDate: ['', Validators.required],
    isActive: ['', Validators.required],
    discountPercentage: ['', Validators.required]
  })

  public editDiscountForm = this.formBuilder.group({
    discountId: [''],
    couponCode: ['', Validators.required],
    expiryDate: ['', Validators.required],
    isActive: ['', Validators.required],
    discountPercentage: ['', Validators.required]
  })

  openSnackBar(message: string) {
    this.snackbar.open(message, "Close", {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  getDiscounts() {
    this.discountService.GetDiscountDetails().subscribe((data: any) => {
      this.discounts = data;
      console.log(this.discounts);
      
      this.dataSource = new MatTableDataSource<IDiscount>(this.discounts);
      this.dataSource.paginator = this.paginator;
    })
  }

  addDiscount() {
    this.onAddSubmit = true;
    if(this.discountForm.valid) {
      this.onAddSubmit = false;
      this.discount = this.discountForm.value;
      this.discount.isActive = this.discount.isActive == 'true';
      this.discountService.AddDiscountDetails(this.discount).subscribe((data: any) => {
        this.triggerAddDiscountCloseClick();
        this.openSnackBar("Discount added!");
        this.getDiscounts();
    });
    }
  }

  editDiscount(discountId: string) {
    var temp: any;
    temp = this.discounts.find((d: any) => d.discountId == discountId);
    this.editedDiscount = JSON.parse(JSON.stringify(temp));
    console.log(this.editedDiscount.isActive);
  }

  updateDiscount() {
    this.onUpdateSubmit = true;

    this.isEditedDiscountValid = this.editedDiscount.couponCode != '' &&
                                this.editedDiscount.expiryDate != null && 
                                this.editedDiscount.isActive != null &&
                                (this.editedDiscount.isActive.toString().toLowerCase() == 'true' ||
                                this.editedDiscount.isActive.toString().toLowerCase() == 'false') &&
                                this.editedDiscount.discountPercentage != null 
    this.editedDiscount.isActive = this.editedDiscount.isActive == 'true';
    if(this.isEditedDiscountValid) {
      this.discountService.UpdateDiscountDetails(this.editedDiscount).subscribe(data => {
        this.onUpdateSubmit = false;
        this.triggerEditDiscountCloseClick();
        this.openSnackBar("Discount updated!");
        this.getDiscounts();
      });
    }
  }

  deleteDiscount(DiscountId: string) {
    this.discountService.DeleteDiscountDetails(DiscountId).subscribe((data) => {
      this.openSnackBar("Discount deleted!");
      this.getDiscounts();
    }) 
  }

  filterDiscounts(value: string) {
    console.log(value);
  
    this.discountService.GetDiscountDetails().subscribe((data: any) => {
      this.discounts = data.filter(f => f.discountId.toLowerCase().includes(value.toLowerCase()) ||
                                       f.couponCode.toLowerCase().includes(value.toLowerCase()) ||
                                       f.expiryDate.includes(value) ||
                                       f.discountPercentage.toString().includes(value)
                                 );
      console.log(this.discounts);
      this.dataSource = new MatTableDataSource<IDiscount>(this.discounts);
      this.dataSource.paginator = this.paginator;
    });
  }
}
