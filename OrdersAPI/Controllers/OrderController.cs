using Confluent.Kafka;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using OrdersAPI.Exceptions;
using OrdersAPI.Filters;
using OrdersAPI.Models;
using OrdersAPI.Services;
using System;
using System.Threading.Tasks;

namespace OrdersAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [OrderExceptions]
    public class OrderController : ControllerBase
    {
        private readonly IOrderServices services;
        private readonly IConfiguration configuration;
        public OrderController(IOrderServices services, IConfiguration config)
        {
            this.services = services;
            this.configuration = config;
        }

        [HttpGet]
        public IActionResult GetOrders()
        {
            return Ok(services.GetOrders());
        }

        [HttpGet("{userId}")]
        public IActionResult Get(string userId)
        { 
            return Ok(services.GetOrderDetailsByUserId(userId));
        }

        [HttpPost]
        public async Task<IActionResult> Post(Order order)
        {
            services.AddOrderDetails(order);
            //return Ok("Order details added successfully");
            string message = JsonConvert.SerializeObject(order);
            ProducerConfig config = new ProducerConfig
            {
                BootstrapServers = configuration["Kafka:Server"]
            };
            using (var producer = new ProducerBuilder<Null, string>(config).Build())
            {
                var result = await producer.ProduceAsync("notificationTopic", new Message<Null, string>
                {
                    Value = message
                });
                return await Task.FromResult(Ok("Order added successfully and message sent"));
            }
        }


        [HttpPut]
        public IActionResult Put(Order order)
        {
                services.UpdateOrder(order);
                return Ok("Order Updated successfully");
        }


    }
}
