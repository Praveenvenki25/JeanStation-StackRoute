using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductAPI.Filters;
using ProductAPI.Models;
using ProductAPI.Services;
using System.Collections.Generic;

namespace ProductAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ProductExceptions]
    public class ProductImagesController : ControllerBase
    {
        private readonly IProductImageService productImageService;
        public ProductImagesController(IProductImageService productImageService)
        {
            this.productImageService = productImageService;
        }

        [HttpGet("{productId}")]
        public List<ProductImage> Get(string productId)
        {
            return productImageService.GetProductImagesByProductId(productId);
            //return Ok(productImageService.GetProductImagesByProductId(productId));
        }

        [HttpDelete("{productId}")]
        public int Delete(string productId)
        {
            return productImageService.DeleteProductImagesByProductId(productId);
            //return Ok("Product Images deleted successfully.");
        }

        [HttpPost()]
        public int Post(ProductImage productImage)
        {
            return productImageService.AddProductImage(productImage);
            //return Ok("Product Image added successfully.");
        }
    }
}
