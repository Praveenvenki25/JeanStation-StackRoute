using ProductAPI.Exceptions;
using ProductAPI.Models;
using ProductAPI.Repository;
using System.Collections.Generic;

namespace ProductAPI.Services
{
    public class ProductImageService: IProductImageService
    {
        private readonly IProductImageRepository productImageRepository;
        public ProductImageService(IProductImageRepository productImageRepository)
        {
            this.productImageRepository = productImageRepository;
        }

        public int DeleteProductImagesByProductId(string productId)
        {
            List<ProductImage> productImages = productImageRepository.GetProductImagesByProductId(productId);
            if(productImages.Count > 0)
                return productImageRepository.DeleteProductImagesByProductId(productId);
            else
                return 0;
        }

        public List<ProductImage> GetProductImagesByProductId(string productId)
        {
            return productImageRepository.GetProductImagesByProductId(productId);
        }

        public int AddProductImage(ProductImage productImage)
        {
            return productImageRepository.AddProductImage(productImage);
        }
    }
}
