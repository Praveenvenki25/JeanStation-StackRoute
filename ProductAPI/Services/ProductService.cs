using ProductAPI.Exceptions;
using ProductAPI.Models;
using ProductAPI.Repository;
using System.Collections.Generic;

namespace ProductAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository productRepository;
        public ProductService(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }

        public int AddProductDetails(Product product)
        {
            var productExist = productRepository.GetProductDetailsById(product.ProductId);
            if (productExist == null)
            {
                return productRepository.AddProductDetails(product);
            }
            else
            {
                throw new ProductAlreadyExistException($"Product with id: {product.ProductId} already exist");
            }
        }

        public int DeleteProductDetailsById(string productId)
        {
            var productExist = productRepository.GetProductDetailsById(productId);
            if (productExist == null)
            {

                throw new ProductNotFoundException($"Product with id: {productId} does not exist");

            }
            else
            {
                return productRepository.DeleteProductDetailsById(productId);

            }
        }

        public List<Product> GetAllProducts()
        {
            return productRepository.GetAllProducts();
        }

        public Product GetProductDetailsById(string productId)
        {
            var productToSelect = productRepository.GetProductDetailsById(productId);
            if (productToSelect == null)
            {
                throw new ProductNotFoundException($"Product with id: {productId} does not exist");
            }
            else
            {
                return productRepository.GetProductDetailsById(productId);
            }
        }

        public Product GetProductDetailsByName(string productName)
        {
            var productToSelect = productRepository.GetProductDetailsByName(productName);
            if (productToSelect == null)
            {
                throw new ProductNotFoundException($"Product with name: {productName} does not exist");
            }
            else
            {
                return productRepository.GetProductDetailsByName(productName);
            }
        }

        public int UpdateProductDetails(Product product)
        {
            var productToBeUpdated = productRepository.GetProductDetailsById(product.ProductId);
            if (productToBeUpdated == null)
            {
                throw new ProductNotFoundException($"Product with id: {product.ProductId} does not exist");
            }
            else
            {
                return productRepository.UpdateProductDetails(product);
            }
        }

        public List<Product> GetProductsByCategory(string category)
        {
            return productRepository.GetProductsByCategory(category);
        }

        public List<Product> GetFirstNProductsByCount(int iCount)
        {
            return productRepository.GetFirstNProductsByCount(iCount);
        }
    }
}
