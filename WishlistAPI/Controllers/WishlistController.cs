using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using WishlistAPI.Exceptions;
using WishlistAPI.Filters;
using WishlistAPI.Models;
using WishlistAPI.Services;

namespace WishlistAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [WishlistExceptions]
    public class WishlistController : ControllerBase
    {
        private readonly IWishlistService service;

        public WishlistController(IWishlistService service)
        {
            this.service = service;
        }
       
        [HttpGet]
        [Route("")]  
        public List<Wishlist> GET()
        {
            return service.GetWishlists();            
        }
        [HttpGet("{userId}")]
        public IActionResult Get(string userId)
        {
            return Ok(service.GetWishlistByUserId(userId));
        }
        [HttpPost]
        public int Post(Wishlist wishlist)
        {
            return service.AddProductToWishlist(wishlist);
            //return Ok("Product added to wishlist successfully");
        }

        [HttpDelete("{wishListId}")]
        public int Delete(string wishListId)
        {
            return service.RemoveProductFromWishlist(wishListId);
            //return Ok("Wishlist details deleted successfully from wishlist");   
        }

    }
}

    

