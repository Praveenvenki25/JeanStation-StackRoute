import ProductImage from "./ProductImage";

export default class Product{
    productId: string;
    productName: string;
    productType: string;
    productByGender: string;
    productDescription: string;
    productBrand: string;
    productSize: string;
    productColor: string;
    productImageId: string;
    productPrice: number;
    ProductImages: Array<ProductImage>;
    productStock: number;

    constructor(){
        this.productId = "";
        this.productName = "";
        this.productType = "";
        this.productByGender = "";
        this.productDescription = "";
        this.productBrand = "";
        this.productSize = "";
        this.productColor= "";
        this.productImageId = "";
        this.productPrice = 0;
        this.ProductImages = [];
        this.productStock = 0;
    }
}