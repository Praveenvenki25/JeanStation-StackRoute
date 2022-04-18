using OrdersAPI.Models;
using System.Collections.Generic;

namespace OrdersAPI.Repository
{
    public interface IOrderRepository
    {
        public List<OrderProduct> GetProducts();
        public List<Order> GetOrders();
        public List<Order> GetOrderDetailsByUserId(string userId);
        public void UpdateOrder(Order order);
        public void AddOrderDetails(Order order);
        public List<OrderStatus> GetOrderStatuses();
        public void AddOrderStatus(OrderStatus orderStatus);
    }
}
