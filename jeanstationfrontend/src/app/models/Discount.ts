export default class Discount{
    discountId: string;
    couponCode: string;
    expiryDate: Date;
    isActive: any;
    discountPercentage: number;

    constructor(){
        this.discountId = "";
        this.couponCode = "";
        this.expiryDate = new Date();
        this.isActive = true; 
        this.discountPercentage = 0;
    }
}