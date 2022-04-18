import { Component, OnInit } from '@angular/core';
import Address from '../models/Address';
import Order from '../models/Order';
import { OrdersserviceService } from '../ordersservice.service';
import { AddressService } from '../services/address.service';
import { DiscountService } from '../services/discount.service';
import { UserService } from '../services/user.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-orderconfirmation',
  templateUrl: './orderconfirmation.component.html',
  styleUrls: ['./orderconfirmation.component.css']
})
export class OrderconfirmationComponent implements OnInit {

  order: Order;
  address: Address;
  constructor(public orderService: OrdersserviceService, public addressService: AddressService, private userService: UserService, public discountService: DiscountService) { }

  ngOnInit(): void {
    this.order = this.orderService.order;
    console.log(this.orderService.order);

    this.addressService.GetAddressByUserId(this.userService.LoggedInUser?.userId).subscribe((data: any) => {
      data.forEach(element => {
        if(element.addressId == this.order.addressId) {
          this.address = element;
          console.log(this.address);
        }
      });
    });

  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    console.log(DATA);
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }

}
