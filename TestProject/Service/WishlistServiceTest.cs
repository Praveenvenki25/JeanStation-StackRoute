using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WishlistAPI.Models;
using WishlistAPI.Repository;
using WishlistAPI.Services;

namespace TestProject.Service
{
    public class WishlistServiceTest
    {
        private readonly IWishlistRepository repo;
        public WishlistServiceTest()
        {
            DatabaseFixture fixture = new DatabaseFixture();
            repo = new WishlistRepository(fixture.db);
        }


        [Test, Order(1)]
        public void GetWishlistByIdShouldSuccess()
        {
            var res = repo.GetWishlistById("W008");
            Assert.AreEqual("U008", res.UserId);
        }

        //[Test, Order(2)]
        //public void GetWishlistsShouldSuccess()
        //{
        //    var res = repo.GetWishlists();
        //    Assert.IsAssignableFrom<List<Wishlist>>(res);
        //    Assert.AreEqual(0, res.Count);
        //}
        //[Test, Order(3)]
        //public void AddProductToWishlistShouldSuccess()
        //{
        //    int res = repo.AddProductToWishlist(new Wishlist() { WishlistId = "W008", UserId = "U008", ProductId = "P008" });
        //    Assert.AreEqual(1, res);
        //}
    }
}
