using ProductAPI.Models;
using System.Collections.Generic;

namespace ProductAPI.Services
{
    public interface IProductImageService
    {
        List<ProductImage> GetProductImagesByProductId(string productId);
        int DeleteProductImagesByProductId(string productId);
        int AddProductImage(ProductImage productImage);
    }
}
