using NUnit.Framework;
using ProductAPI.Models;
using ProductAPI.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject.Repository
{
    public class ProductRepositoryTest
    {
        private readonly IProductRepository repo;
        public ProductRepositoryTest()
        {
            DatabaseFixture1 fixture = new DatabaseFixture1();
            repo = new ProductRepository(fixture.db1);
        }

        [Test, Order(1)]
        public void GetProductsShouldSuccess()
        {
            var res = repo.GetAllProducts();
            Assert.IsAssignableFrom<List<Product>>(res);
            Assert.AreEqual(0, res.Count);
        }

        [Test, Order(2)]
        public void AddProductDetailsShouldSuccess()
        {
            int res = repo.AddProductDetails(new Product() { ProductId = "P043", ProductName = "Levi's Jeans" ,ProductType = "Jeans", ProductByGender = "Mens Jeans",
            ProductDescription="Jeans Description", ProductBrand = "Levi's" ,ProductSize = "Medium", ProductColor = "Black" , ProductPrice = 34 , ProductStock = 143 });
            Assert.AreEqual(1, res);
        }

        [Test, Order(3)]
        public void GetProductDetailsByIdShouldSuccess()
        {
            var res = repo.GetProductDetailsById("P043");
            Assert.AreEqual("Levi's Jeans", res.ProductName);
        }
    }
}
