import Product from "./Product";

export default class ProductImage{
    productImageId?: string;
    productImageName: string;
    productImageUrl: string;
    product: Array<Product>;
    productId: string;

    constructor(){
        this.productImageId = "";
        this.productImageName = "";
        this.productImageUrl = "";
        this.product = [];
        this.productId = "";
    }

}