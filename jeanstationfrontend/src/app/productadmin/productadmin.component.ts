import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable, of } from 'rxjs';
import { ProductadminService } from '../services/productadmin.service';
import Product from '../models/Product';
import { Image } from 'aws-sdk/clients/iotanalytics';
import { ElasticInference } from 'aws-sdk';
import ProductImage from '../models/ProductImage';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { CartService } from '../services/cart.service';
import Cart from '../models/Cart';

class FileUpload {
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
  result: any[]=[];
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface IProduct{
  productId: string;
  productName: string;
  productType: string;
  productByGender: string;
  productDescription: string;
  productStock: number;
  productBrand: string;
  productSize: string;
  productColor: string;
  productImageId: string;
  productPrice: number;
}

@Component({
  selector: 'app-productadmin',
  templateUrl: './productadmin.component.html',
  styleUrls: ['./productadmin.component.css']
})

export class ProductadminComponent implements OnInit {

  displayedColumns: string[] = ['productId', 'productName', 'productType', 'productByGender', 'productDescription', 'productStock', 'productBrand', 'productSize', 'productColor', 'productPrice', 'editProductIcon', 'deleteProductIcon'];
  products: Product[] = [];

  dataSource = new MatTableDataSource<IProduct>(this.products);
  product: Product = new Product();
  editedProduct: Product = new Product();
  productImage: ProductImage = new ProductImage();
  productImageData: any;
  onUpdateSubmit: Boolean = false;
  onAddSubmit: Boolean = false;
  isEditedProductValid: Boolean = false;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  

  @ViewChild('editProductCloseButton') editProductCloseButton!: ElementRef<HTMLElement>;

  triggerEditProductCloseClick() {
    let el: HTMLElement = this.editProductCloseButton.nativeElement;
    el.click();
  }

  @ViewChild('addProductCloseButton') addProductCloseButton!: ElementRef<HTMLElement>;

  triggerAddProductCloseClick() {
    let el: HTMLElement = this.addProductCloseButton.nativeElement;
    el.click();
  }

  constructor(private userService: UserService, private cartService: CartService, private formBuilder: FormBuilder, private productAdminService: ProductadminService, private snackbar:MatSnackBar) { }

  title = 'POC_S3';
  FOLDER = 'product_images'; // For example, 'my_folder'.
  BUCKET = 'jeanstation'; // For example, 'my_bucket'.

  openSnackBar(message: string) {
    this.snackbar.open(message, "Close", {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  public productForm = this.formBuilder.group({
    productName: ['', Validators.required],
    productType: ['', Validators.required],
    productByGender: ['', Validators.required],
    productDescription: ['', Validators.required],
    productBrand: ['', Validators.required],
    productSize: ['', Validators.required],
    productColor: ['', Validators.required],
    productPrice: ['', Validators.required],
    productStock: ['', Validators.required]
  })

  public editProductForm = this.formBuilder.group({
    productId: [''],
    productName: ['', Validators.required],
    productType: ['', Validators.required],
    productByGender: ['', Validators.required],
    productDescription: ['', Validators.required],
    productBrand: ['', Validators.required],
    productSize: ['', Validators.required],
    productColor: ['', Validators.required],
    productPrice: ['', Validators.required],
    productStock: ['', Validators.required]
  })

  fileToUpload: File | null = null;
  filesToUpload: Array<File> = [];

  ngOnInit(): void {
     // On refresh, reload the user session
    this.userService.isLogin = localStorage.getItem("isLoggedIn") == 'true' ? true : false;
    this.userService.LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    this.cartService.GetCart(this.userService.LoggedInUser?.userId).subscribe((cartData: Cart) => {
      if(cartData != null)
        this.cartService.cartDetails = cartData;
    }, error => {
      console.log(error);
    });
      this.GetProducts();
      this.getFiles();
  }

  handleFileInput(event: any) {
    this.filesToUpload = event.target.files;
    console.log(this.filesToUpload);
  }

  FilterProducts(value: string) {
    console.log(value);
  
    this.productAdminService.GetProducts().subscribe((data: any) => {
      this.products = data.filter(f => f.productName.toLowerCase().includes(value.toLowerCase()) ||
                                       f.productType.toLowerCase().includes(value.toLowerCase()) ||
                                       f.productByGender.toLowerCase().includes(value.toLowerCase()) ||
                                       f.productDescription.toLowerCase().includes(value.toLowerCase()) ||
                                       f.productBrand.toLowerCase().includes(value.toLowerCase()) ||
                                       f.productSize.toLowerCase().includes(value.toLowerCase()) ||
                                       f.productColor.toLowerCase().includes(value.toLowerCase()) ||
                                       f.productPrice.toString().includes(value) ||
                                       f.productStock.toString().includes(value)
                                 );
    this.dataSource = new MatTableDataSource<IProduct>(this.products);
    this.dataSource.paginator = this.paginator;
      console.log(this.products);
    })
    
  }

  uploadFiles(data: any) {
    console.log(data);
    Array.from(this.filesToUpload).forEach((element: File) => {
      console.log(element);
      //this.fileToUpload = element;
      this.productImageData = this.uploadFile(element);
      delete this.productImage.productImageId;
      this.productImage.productId = this.product.productId;
      this.productImage.productImageName =  this.productImageData.body.name;
      this.productImage.productImageUrl = "https://jeanstation.s3.ca-central-1.amazonaws.com/product_images/" + this.productImage.productImageName;
      console.log(this.productImageData);
      this.productAdminService.AddProductImage(this.productImage).subscribe(data => {
        console.log(data);
      })
    });
  }

  addProduct() {
    this.onAddSubmit = true;
    console.log("add product");

    // if the form is valid
    if (this.productForm.valid) {
        this.onAddSubmit = false;
        // copy forms data to product variable
        this.product = this.productForm.value;

        this.productAdminService.AddProduct(this.product).subscribe((data: any) => {
          
          this.productAdminService.GetProductByName(this.product.productName).subscribe((productData: any) => {
            this.product.productId = productData.productId;
            console.log(this.product.productId);
            console.log(productData);
            
            // call uploadFiles() if the user attached any files
            this.uploadFiles(data);
            this.triggerAddProductCloseClick();
            this.openSnackBar("Product added!");
            this.GetProducts();
          }, error => {
            console.log(error);
          });
        }, error => {
          console.log(error);
        })
    }
  }

  GetProducts() {
    this.productAdminService.GetProducts().subscribe((data: any) => {
      this.products = data;
      console.log(this.products);
      this.dataSource = new MatTableDataSource<IProduct>(this.products);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    })
  }

  editProduct(productId: string) {
    var temp: any;
    temp = this.products.find((p: any) => p.productId == productId);
    console.log(temp);
    this.editedProduct = temp;
    console.log(this.editedProduct);
    console.log(this.editProductForm);
  }

  updateProduct() {
    this.onUpdateSubmit = true; 
    console.log(this.editProductForm);
    console.log(this.editProductForm.valid);
    
    this.isEditedProductValid = this.editedProduct.productName != '' &&
                                this.editedProduct.productType != '' && 
                                this.editedProduct.productByGender != '' &&
                                this.editedProduct.productPrice != null &&
                                this.editedProduct.productBrand != '' &&
                                this.editedProduct.productSize != '' &&
                                this.editedProduct.productColor != '' &&
                                this.editedProduct.productPrice != null &&
                                this.editedProduct.productDescription != ''
    console.log(this.isEditedProductValid);
    if(this.isEditedProductValid) {
      this.onUpdateSubmit = false;
      this.productAdminService.UpdateProduct(this.editedProduct).subscribe(data => {
        console.log(data);
        console.log("Product is updated successfully.");
        this.triggerEditProductCloseClick();
        this.openSnackBar("Product updated!");
        this.GetProducts();
      }, error => {
        console.log(error);
      });
    } 
  }

  deleteProduct(productId: string) {
    this.productAdminService.DeleteProductImage(productId).subscribe(() => {
      this.productAdminService.DeleteProduct(productId).subscribe((data: any) => {
        this.openSnackBar("Product deleted!");
        this.GetProducts();
      })
    }) 
  }

  private static getS3Bucket(): any {
    return new S3(
      {
        accessKeyId: 'AKIA3GGI3DQFVB2RROMV', // For example, 'AKIXXXXXXXXXXXGKUY'.
        secretAccessKey: 'C4cCAo3o/BKlEMYcvWiis1DJHpettCtpJo6/Q/y+', // For example, 'm+XXXXXXXXXXXXXXXXXXXXXXDDIajovY+R0AGR'.
        region: 'ca-central-1' // For example, 'us-east-1'.
      }
    );
  }
  
  public uploadFile(file:any) {
  
    const bucket = new S3(
      {
        accessKeyId: 'AKIA3GGI3DQFVB2RROMV', // For example, 'AKIXXXXXXXXXXXGKUY'.
        secretAccessKey: 'C4cCAo3o/BKlEMYcvWiis1DJHpettCtpJo6/Q/y+', // For example, 'm+XXXXXXXXXXXXXXXXXXXXXXDDIajovY+R0AGR'.
        region: 'ca-central-1' // For example, 'us-east-1'.
      }
    );

    const params = {
      Bucket: this.BUCKET,
      Key: this.FOLDER + "/" + file.name,
      Body: file,
      ContentType: "image/png"
    };

    return bucket.upload(params, function (err:any, data:any) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      
      return true;
    });
  }

  public getFiles(): Observable<Array<FileUpload>> {
    console.log("In Get files");
    const fileUploads:any = [];

    const params = {
      Bucket: this.BUCKET,
      Prefix: this.FOLDER
    };

    ProductadminComponent.getS3Bucket().listObjects(params, function (err:any, data:any) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        return;
      }
      console.log('Successfully get files.', data);

      const fileDetails = data.Contents;

      fileDetails.forEach((file:any) => {
        fileUploads.push(new FileUpload(
          file.Key,
          'https://s3.amazonaws.com/' + params.Bucket + '/' + file.Key
        ));
      });
    });
    
    return of(fileUploads);
  }

  public deleteFile(file: FileUpload) {
    const params = {
      Bucket: this.BUCKET,
      Key: file.name
    };

    ProductadminComponent.getS3Bucket().deleteObject(params,  (err:any, data:any) => {
      if (err) {
        console.log('There was an error deleting your file: ', err.message);
        return;
      }
      console.log('Successfully deleted file.');
    });
  }
}

function uploadFile(element: any): any {
  throw new Error('Function not implemented.');
}

