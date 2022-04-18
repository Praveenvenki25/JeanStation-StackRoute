using ProductAPI.Models;
using System.Collections.Generic;

namespace ProductAPI.Services
{
    public interface IProductService
    {
        int AddProductDetails(Product product);
        int DeleteProductDetailsById(string productId);
        int UpdateProductDetails(Product product);
        Product GetProductDetailsById(string productId);
        Product GetProductDetailsByName(string productName);
        List<Product> GetAllProducts();
        List<Product> GetProductsByCategory(string category);
        List<Product> GetFirstNProductsByCount(int iCount);
    }
}
