import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Address from '../models/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpService: HttpClient) { }

  GetAddressByUserId(userId: string) {
    return this.httpService.get(`${environment.getAddressByUserIdURL}/${userId}`);
  }

  DeleteAddress(addressId: string) {
    return this.httpService.delete(`${environment.deleteAddressURL}/${addressId}`, {responseType: 'text'});
  }

  AddAddress(address: Address) {
    return this.httpService.post(environment.addAddressURL, address);
  }

  UpdateAddress(address: Address) {
    console.log("Update address", address);
    return this.httpService.put(`${environment.updateAddressURL}/${address.addressId}`, address);
  }
}
