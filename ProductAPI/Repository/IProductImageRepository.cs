using ProductAPI.Models;
using System.Collections.Generic;

namespace ProductAPI.Repository
{
    public interface IProductImageRepository
    {
        List<ProductImage> GetProductImagesByProductId(string productId);   
        int DeleteProductImagesByProductId(string productId);
        int AddProductImage(ProductImage productImage); 
    }
}
