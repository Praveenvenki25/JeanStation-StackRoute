using System.Collections.Generic;
using WishlistAPI.Models;

namespace WishlistAPI.Services
{
    public interface IWishlistService
    {
        public List<Wishlist> GetWishlists();
        public List<Wishlist> GetWishlistByUserId(string userId);
        public Wishlist GetWishlistById(string wishlistId);
        public int AddProductToWishlist(Wishlist wishlist);
        public int RemoveProductFromWishlist(string wishlistId);
    }
}
