export default class Address{
    addressId: string;
    userId: string;
    streetName: string;
    apartmentNumber: string;
    city: string;
    province: string;
    postalcode: string;

    constructor(){
        this.addressId = "";
        this.userId = "";
        this.apartmentNumber = "";
        this.streetName = "";
        this.city = "";
        this.province = "";
        this.postalcode = "";
    }
}