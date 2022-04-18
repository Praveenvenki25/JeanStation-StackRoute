using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrdersAPI.Filters;
using OrdersAPI.Models;
using OrdersAPI.Services;

namespace OrdersAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [OrderExceptions]
    public class OrderStatusController : ControllerBase
    {
        private readonly IOrderServices services;
        public OrderStatusController(IOrderServices services)
        {
            this.services = services;
        }

        [HttpGet]
        public IActionResult GetOrderStatuses()
        {
            return Ok(services.GetOrderStatuses());
        }

        [HttpPost]
        public IActionResult AddOrderstatus(OrderStatus orderStatus)
        {
            services.AddOrderStatus(orderStatus);
            return Ok("Order status added successfully.");
        }
    }
}
