import { stringList } from "aws-sdk/clients/datapipeline";
import ProductImage from "./ProductImage";

export default class CartProduct{
    productId: string;
    productQuantity: number;
    productAmount: number;
    productName: string;
    ProductImages: Array<ProductImage>;

    constructor(){
        this.productId = "";
        this.productAmount = 0;
        this.productQuantity = 0;
        this.productName = "";
        this.ProductImages = [];
    }
}