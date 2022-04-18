import Product from "./Product";
import ProductImage from "./ProductImage";

export default class OrderProduct{
    productId: string;
    productQuantity: number;
    productAmount: number;
    prodImage: Array<ProductImage>;

    constructor(){
        this.productId = "";
        this.productAmount = 0;
        this.productQuantity = 0;
        this.prodImage = [];
    }
}