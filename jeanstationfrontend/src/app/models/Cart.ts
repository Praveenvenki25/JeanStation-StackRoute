import CartProduct from "./CartProduct";

export default class Cart{
    id: number;
    cartId: string;
    userId: string;
    totalAmount: number;
    gst: number;
    amountToBePaid: number;
    products: Array<CartProduct>;
    isActive: boolean;
    discountedAmount: number;
    couponCode: string;

    constructor(){
        this.id = 0;
        this.cartId = "";
        this.userId = "";
        this.totalAmount = 0;
        this.products = [];
        this.gst = 0;
        this.amountToBePaid = 0;
        this.isActive = true;
        this.discountedAmount = 0;
        this.couponCode = "";
    }
}