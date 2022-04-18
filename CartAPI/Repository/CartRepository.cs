using CartAPI.Context;
using CartAPI.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace CartAPI.Repository
{
    public class CartRepository : ICartRepository
    {
        private readonly DataContext context;

        public CartRepository(DataContext context)
        {
            this.context = context;
        }
       
        public Cart GetCartDetailsByUserId(string userId)
        {
            return context.Carts.Find(x => x.UserId == userId && x.IsActive).FirstOrDefault();
        }
        public void CreateCart(Cart cart)
        {
            var car = context.Carts.Find(x => true).SortByDescending(x => x.CartId).FirstOrDefault();
            if (car == null)
            {
                cart.CartId = "5000001";
            }
            else
            {
                cart.Id = car.Id + 1;
                cart.CartId = Convert.ToString(Convert.ToInt32(car.CartId) + 1);
            }
            context.Carts.InsertOne(cart);
        }
        public void UpdateCart(Cart cart)
        {
            var filter = Builders<Cart>.Filter.Where(x => x.CartId == cart.CartId);
            var update = Builders<Cart>.Update.Set(x => x.UserId, cart.UserId)
                .Set(x => x.TotalAmount, cart.TotalAmount)
                .Set("Products", cart.Products)
                .Set(x => x.IsActive, cart.IsActive)
                .Set(x => x.GST, cart.GST)
                .Set(x => x.AmountToBePaid, cart.AmountToBePaid)
                .Set(x => x.DiscountedAmount, cart.DiscountedAmount)
                .Set(x => x.CouponCode, cart.CouponCode);
            context.Carts.UpdateOne(filter, update);
        }
        public void DeleteCart(string cartId)
        {
            context.Carts.DeleteOne(x => x.CartId == cartId);
        }
        
        
    }
}
