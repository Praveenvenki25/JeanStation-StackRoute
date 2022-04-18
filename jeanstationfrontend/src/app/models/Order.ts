import OrderProduct from "./OrderProduct";
import User from "../models/User"
import CartProduct from "./CartProduct";

export default class Order{
    id: number;
    orderId: string;
    userId: string;
    products: Array<CartProduct>;
    orderDateTime: Date;
    addressId: string;
    totalPrice: number;
    discountPrice: number;
    couponCode: string;
    orderStatus: string;
    user: User;

    constructor(){
        this.id = 0;
        this.orderId = "";
        this.userId = "";
        this.products = [];
        this.orderDateTime = new Date();
        this.addressId = "";
        this.totalPrice = 0;
        this.discountPrice = 0;
        this.couponCode = "";
        this.orderStatus = "";
        this.user = new User();
    }

}