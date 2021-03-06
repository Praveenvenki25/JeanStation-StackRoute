using CartAPI.Models;
using System.Collections.Generic;

namespace CartAPI.Repository
{
    public interface ICartRepository
    {
        public Cart GetCartDetailsByUserId(string userId);
        public void CreateCart(Cart cart);
        public void UpdateCart(Cart cart);
        public void DeleteCart(string cartId);

    }
}
