using CartAPI.Exceptions;
using CartAPI.Models;
using CartAPI.Repository;
using System.Collections.Generic;

namespace CartAPI.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository cartRepository;

        public CartService(ICartRepository cartRespository)
        {
            this.cartRepository = cartRespository;
        }
       

        public void CreateCart(Cart cart)
        {
            var car = cartRepository.GetCartDetailsByUserId(cart.CartId);
            if (car == null)
            {
                cartRepository.CreateCart(cart);
            }
            else
            {
                throw new CartDetailsAlreadyExistsExceptions($"Cart with cart id: {cart.CartId} already exists");
            }
        }

        public void DeleteCart(string cartId)
        {
            var car = cartRepository.GetCartDetailsByUserId(cartId);
            if (car != null)
            {
                cartRepository.DeleteCart(cartId);
            }
            else
            {
                throw new CartDetailsNotFoundExceptions($"Cart with cart id: {cartId} does not exists");
            }
        }

        public Cart GetCartDetailsByUserId(string userId)
        {
            var car = cartRepository.GetCartDetailsByUserId(userId);
            if (car != null)
            {
                return car;
            }
            throw new CartDetailsNotFoundExceptions($"Cart with user id: {userId} does not exists");
        }

        
        public void UpdateCart(Cart cart)
        {
            var car = cartRepository.GetCartDetailsByUserId(cart.UserId);
            if (car != null)
            {
                cartRepository.UpdateCart(cart);
            }
            else
            {
                throw new CartDetailsNotFoundExceptions($"Cart with cart id: {cart.CartId} does not exists");
            }
        }
    }
}
