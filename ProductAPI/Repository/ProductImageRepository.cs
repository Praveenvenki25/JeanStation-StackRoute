using ProductAPI.Context;
using ProductAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace ProductAPI.Repository
{
    public class ProductImageRepository: IProductImageRepository
    {
        private readonly DataContext dbContext;
        public ProductImageRepository(DataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public int DeleteProductImagesByProductId(string productId)
        {
            List<ProductImage> productImages = dbContext.ProductImages.Where(product => product.ProductId == productId).ToList();
            foreach(ProductImage productImage in productImages)
                dbContext.ProductImages.Remove(productImage);
            return dbContext.SaveChanges();

        }

        public List<ProductImage> GetProductImagesByProductId(string productId)
        {
            return dbContext.ProductImages.Where(product => product.ProductId == productId).ToList();
        }
        public int AddProductImage(ProductImage productImage)
        {
            dbContext.ProductImages.Add(productImage);
            return dbContext.SaveChanges();
        }
    }
}
