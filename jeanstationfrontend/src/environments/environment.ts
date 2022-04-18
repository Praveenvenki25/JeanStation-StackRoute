// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrlUserId: 'https://localhost:44346/api/Order',
  getUserbyIdUrl: 'https://localhost:44346/api/User/getUserbyId',
  gethomeproductapi: "https://localhost:44346/api/Product",
  getproductimageapi: "https://localhost:44346/api/ProductImages",
  getwishlistapi:"https://localhost:44346/api/Wishlist",
  getProductsURL: "https://localhost:44346/api/Product",
  getProductByNameURL: "https://localhost:44346/api/Product/Name",
  addProductURL: "https://localhost:44346/api/Product",  
  updateProductURL: "https://localhost:44346/api/Product",
  deleteProductURL: "https://localhost:44346/api/Product",
  getDiscounts: "https://localhost:44346/api/Discounts", 
  getDiscountsByCouponCodeURL: "https://localhost:44346/api/Discounts", 
  addDiscountURL: "https://localhost:44346/api/Discounts",
  updateDiscountURL: "https://localhost:44346/api/Discounts", 
  deleteDiscountURL: "https://localhost:44346/api/Discounts",
  getCartURL: "https://localhost:44346/api/Cart",
  addCartURL: "https://localhost:44346/api/Cart",
  updateCartURL: "https://localhost:44346/api/Cart",
  getAddressByUserIdURL: "https://localhost:44346/api/Address/user",
  addAddressURL: "https://localhost:44346/api/Address",
  updateAddressURL: "https://localhost:44346/api/Address",
  deleteAddressURL: "https://localhost:44346/api/Address",
  addProductImageURL: "https://localhost:44346/api/ProductImages",
  deleteProductImageURL: "https://localhost:44346/api/ProductImages",
  addOrderURL: "https://localhost:44346/api/Order",
  updateOrderURL: "https://localhost:44346/api/Order",
  getOrderStatusesURL: "https://localhost:44346/api/OrderStatus",
  apiUrl: 'https://localhost:44346/api/Product',
  apiImageUrl: 'https://localhost:44346/api/ProductImages',
  apiUrlWishlist: 'https://localhost:44346/api/Wishlist',
  userUrl:'https://localhost:44346/api/User',
  loginUrl:'https://localhost:44346/api/User/login',
  registerUrl:'https://localhost:44346/api/User/register',
  updateUserUrl:`https://localhost:44346/api/User/getUserByEmail/{Email}`,
  addToCartUrl:`https://localhost:44346/api/Cart`,
  getLatestProductsURL:"https://localhost:44346/api/Product/count",
  getProductsByCategoryURL:"https://localhost:44346/api/Product/category",
  tokenValidationUrl:"https://localhost:44346/api/User/validate/{token}"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
