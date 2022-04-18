using System.Collections.Generic;
using System.Linq;
using WishlistAPI.Exceptions;
using WishlistAPI.Models;
using WishlistAPI.Repository;

namespace WishlistAPI.Services
{
    public class WishlistService : IWishlistService
    {
        private readonly IWishlistRepository wishlistRepository;
        public WishlistService(IWishlistRepository wishlistRepository)
        {
            this.wishlistRepository = wishlistRepository;
        }
        public int AddProductToWishlist(Wishlist wishlist)
        {
            var wish = wishlistRepository.GetWishlistByUserId(wishlist.UserId).Where(x => x.ProductId == wishlist.ProductId && x.UserId == wishlist.UserId).FirstOrDefault();
            if (wish == null)
            {
                return wishlistRepository.AddProductToWishlist(wishlist);
            }
            else
            {
                throw new WishlistAlreadyExistsException($"Product with product id: {wishlist.ProductId} already exists in wishlist");
            }
        }

        public List<Wishlist> GetWishlists()
        {
            return wishlistRepository.GetWishlists();
        }

        public List<Wishlist> GetWishlistByUserId(string userId)
        {
            var wish = wishlistRepository.GetWishlistByUserId(userId);
            if (wish == null)
            {
                throw new WishlistNotFoundException($"User with user id: {userId} does not exists in wishlist");
            }
            else
            {
                return wishlistRepository.GetWishlistByUserId(userId);
            }
        }

        public Wishlist GetWishlistById(string wishlistId)
        {
            return wishlistRepository.GetWishlistById(wishlistId);
        }

        public int RemoveProductFromWishlist(string wishlistId)
        {

            var wish = wishlistRepository.GetWishlistById(wishlistId);
            if (wish != null)
            {
                return wishlistRepository.RemoveProductFromWishlist(wishlistId);
            }
            else
            {
                throw new WishlistNotFoundException($"Wishlist with wishlistid: {wishlistId} does not exists");
            }
        }
    }
}
