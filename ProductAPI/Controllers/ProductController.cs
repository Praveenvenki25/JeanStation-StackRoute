using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductAPI.Exceptions;
using ProductAPI.Filters;
using ProductAPI.Models;
using ProductAPI.Services;
using System;
using System.Collections.Generic;
using System.IO;

namespace ProductAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ProductExceptions]
    public class ProductController : ControllerBase
    {
        private readonly IProductService productService;

        public ProductController(IProductService productService)
        {
            this.productService = productService;
        }

        [HttpPost]
        [Route("")]
        public IActionResult POST(Product product)
        {
            productService.AddProductDetails(product);
            return Ok("Product Details Created Successfully");
        }

        [HttpDelete("{productId}")]
        public int DELETE(string productId)
        {

            return productService.DeleteProductDetailsById(productId);
            //return Ok("Product Details Deleted Successfully");
        }

        [HttpPut]
        [Route("{productId}")]
        public int PUT(string productId, Product product)
        {
            return productService.UpdateProductDetails(product);
            //return Ok("Product Details Updated Successfully");
        }

        [HttpGet]
        [Route("{productId}")]  //get product details by Id
        public Product GET(string productId)
        {
            return productService.GetProductDetailsById(productId);
            //return Ok(productService.GetProductDetailsById(productId));
        }

        [HttpGet]
        [Route("name/{productName}")]  //get product details by Id
        public Product GetByName(string productName)
        {
            return productService.GetProductDetailsByName(productName);
            //return Ok(productService.GetProductDetailsById(productId));
        }

        [HttpGet]
        [Route("")]  //get all products
        public List<Product> GET()
        {
            return productService.GetAllProducts();
            //return Ok(productService.GetAllProducts());
        }

        [HttpGet]
        [Route("category/{category}")]  //get product details by Id
        public List<Product> GetProductsByCategory(string category)
        {
            return productService.GetProductsByCategory(category);
            //return Ok(productService.GetProductDetailsById(productId));
        }

        [HttpGet]
        [Route("count/{itemCount}")]  //get first n product records
        public List<Product> GetProductsByCount(int itemCount)
        {
            return productService.GetFirstNProductsByCount(itemCount);
            //return Ok(productService.GetProductDetailsById(productId));
        }


    }
}
