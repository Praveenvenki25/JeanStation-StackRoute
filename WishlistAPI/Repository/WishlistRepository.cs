using System.Collections.Generic;
using System.Linq;
using WishlistAPI.Context;
using WishlistAPI.Models;

namespace WishlistAPI.Repository
{
    public class WishlistRepository : IWishlistRepository
    {
        private readonly DataContext context;
        public WishlistRepository(DataContext context)
        {
            this.context = context;
        }
        public int AddProductToWishlist(Wishlist wishlist)
        {
            context.Wishlists.Add(wishlist);
            return context.SaveChanges();
        }

        public List<Wishlist> GetWishlists()
        {
            return context.Wishlists.ToList();
        }
        public List<Wishlist> GetWishlistByUserId(string userId)
        {
            return context.Wishlists.Where(x => x.UserId == userId).ToList();
        }
        public Wishlist GetWishlistById(string wishlistId)
        {
            return context.Wishlists.Where(x => x.WishlistId == wishlistId).FirstOrDefault();
        }

    public int RemoveProductFromWishlist(string wishlistId)
        {
            var wish = context.Wishlists.Where(x => x.WishlistId == wishlistId).FirstOrDefault();
            context.Wishlists.Remove(wish);
            return context.SaveChanges();
        }
    }

}
