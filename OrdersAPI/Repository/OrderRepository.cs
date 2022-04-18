using MongoDB.Driver;
using OrdersAPI.Context;
using OrdersAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OrdersAPI.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext context;
        public OrderRepository(DataContext context)
        {
            this.context = context;
        }
        public void AddOrderDetails(Order order)
        {
            var Record = context.Orders.Find(x => true).SortByDescending(x => x.OrderId).FirstOrDefault();
            
            if (Record == null)
            {
                order.OrderId = "5000001";

            }
            else
            {
                order.Id = Record.Id + 1;
                order.OrderId = Convert.ToString(Convert.ToInt32(Record.OrderId) + 1);
                
            }
            context.Orders.InsertOne(order);
        }
        public void AddOrderStatus(OrderStatus orderStatus)
        {
            var order = context.Statuses.Find(x => true).SortByDescending(x => x.Id).FirstOrDefault();

            if(order != null)
            {
                orderStatus.Id = order.Id + 1;
            }

            context.Statuses.InsertOne(orderStatus);
        }

        public List<Order> GetOrderDetailsByUserId(string userId)
        {
            return context.Orders.Find(x => x.UserId == userId).ToList();
        }

        public List<Order> GetOrders()
        {
            return context.Orders.Find(x => true).ToList();
        }

        public List<OrderStatus> GetOrderStatuses()
        {
            return this.context.Statuses.Find(x => true).ToList();
        }

        public List<OrderProduct> GetProducts()
        {
            return context.Products.Find(x => true).ToList();
        }

        public void UpdateOrder(Order order)
        {
            var filter = Builders<Order>.Filter.Where(x => x.OrderId == order.OrderId);
            var update = Builders<Order>.Update.Set(x => x.AddressId, order.AddressId)
                .Set(x => x.UserId, order.UserId)
                .Set(x => x.TotalPrice, order.TotalPrice)
                .Set(x => x.Products, order.Products)
                .Set(x => x.OrderDatetime, order.OrderDatetime)
                .Set(x => x.CouponCode, order.CouponCode)
                .Set(x => x.DiscountPrice, order.DiscountPrice)
                .Set(x => x.OrderStatus, order.OrderStatus); 
            context.Orders.UpdateOne(filter, update);
        }
    }
}
