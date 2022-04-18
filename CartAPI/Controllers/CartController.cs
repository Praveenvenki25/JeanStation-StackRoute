using CartAPI.Exceptions;
using CartAPI.Filters;
using CartAPI.Models;
using CartAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace CartAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [CartExceptions]
    public class CartController : ControllerBase
    {
        private readonly ICartService service;
        public CartController(ICartService service)
        {
            this.service = service;
        }
        [HttpGet("{userId}")]
        public IActionResult Get(string userId)
        {
           return Ok(service.GetCartDetailsByUserId(userId));
        }
        [HttpPost]
        public IActionResult Post(Cart cart)
        {
            service.CreateCart(cart);
            return Ok("Details added to cart successfully");  
        }
      
        [HttpPut]
        public IActionResult Put(Cart cart)
        {
            service.UpdateCart(cart);
            return Ok("Carts details Updated successfully");
        }

        [HttpDelete("{cartId}")]
        public IActionResult Delete(string cartId)
        {
            service.DeleteCart(cartId);
            return Ok("Cart details deleted successfully");
        }

    }
}
