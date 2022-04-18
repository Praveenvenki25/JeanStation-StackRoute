using ProductAPI.Context;
using ProductAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace ProductAPI.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext dbContext;

        public ProductRepository(DataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public int AddProductDetails(Product product)
        {
           dbContext.Products.Add(product);
           return dbContext.SaveChanges();
        }

        public int DeleteProductDetailsById(string productId)
        {
            var productToDelete = dbContext.Products.Where(x => x.ProductId == productId).FirstOrDefault();
            dbContext.Products.Remove(productToDelete);
            return dbContext.SaveChanges();
        }

        public List<Product> GetAllProducts()
        {
            return dbContext.Products.ToList();
        }

        public Product GetProductDetailsById(string productId)
        {
            return dbContext.Products.Where((x) => x.ProductId == productId).FirstOrDefault();
        }

        public Product GetProductDetailsByName(string productName)
        {
            return dbContext.Products.Where((x) => x.ProductName == productName).FirstOrDefault();
        }

        public int UpdateProductDetails(Product product)
        {
            var productToUpdate = dbContext.Products.Where(x => x.ProductId == product.ProductId).FirstOrDefault();
            productToUpdate.ProductId = product.ProductId;
            productToUpdate.ProductName = product.ProductName;
            productToUpdate.ProductType = product.ProductType;
            productToUpdate.ProductByGender = product.ProductByGender;
            productToUpdate.ProductDescription = product.ProductDescription;
            productToUpdate.ProductBrand = product.ProductBrand;
            productToUpdate.ProductSize = product.ProductSize;
            productToUpdate.ProductColor = product.ProductColor;
            productToUpdate.ProductPrice = product.ProductPrice;
            productToUpdate.ProductStock = product.ProductStock;
            dbContext.Entry<Product>(productToUpdate).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return dbContext.SaveChanges();
        }

        public List<Product> GetProductsByCategory(string categoryType)
        {
            return dbContext.Products.Where((x) => x.ProductByGender == categoryType).ToList();
        }

        public List<Product> GetFirstNProductsByCount(int iCount)
        {
            return dbContext.Products.OrderBy((x => x.ProductId)).Take(iCount).ToList();
        }


    }
}
