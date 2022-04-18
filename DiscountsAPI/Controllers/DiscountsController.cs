using DiscountsAPI.Filters;
using DiscountsAPI.Models;
using DiscountsAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DiscountsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [DiscountsExceptions]
    public class DiscountsController : ControllerBase
    {
        private readonly IDiscountsService discountsService;
        
        public DiscountsController(IDiscountsService discountsService)
        {
            this.discountsService = discountsService;
        }

        [HttpGet]
        public IActionResult GetDiscountDetails()
        {
            return Ok(discountsService.GetDiscountDetails());   
        }

        [HttpGet("{couponCode}")]
        public IActionResult GetDiscountDetailsByCouponCode(string couponCode)
        {
            return Ok(discountsService.GetDiscountDetailsByCouponCode(couponCode));
        }

        [HttpPost]
        public IActionResult AddDiscountDetails(Discount discount)
        {
            discountsService.AddDiscountDetails(discount);
            return Ok("Discount details added successfully.");
        }

        [HttpPut("{couponCode}")]
        public IActionResult UpdateDiscountDetailsByCouponCode(string couponCode, Discount discount)
        {
            discountsService.UpdateDiscountDetailsByCouponCode(couponCode, discount);
            return Ok("Discount details updated successfully.");
        }

        [HttpDelete("{discountId}")]
        public IActionResult DeleteDiscountDetailsById(string discountId)
        {
            discountsService.DeleteDiscountDetailsById(discountId);
            return Ok("Discount details deleted successfully.");
        }
    }
}
