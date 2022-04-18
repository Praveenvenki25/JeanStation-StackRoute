using OrdersAPI.Models;
using System.Collections.Generic;

namespace OrdersAPI.Services
{
    public interface IOrderServices
    {
        List<OrderProduct> GetProducts();
        List<Order> GetOrders();
        List<Order> GetOrderDetailsByUserId(string userId);
        void UpdateOrder(Order order);
        void AddOrderDetails(Order order);
        List<OrderStatus> GetOrderStatuses();
        void AddOrderStatus(OrderStatus orderStatus); 
    }
}
