using OrdersAPI.Exceptions;
using OrdersAPI.Models;
using OrdersAPI.Repository;
using System.Collections.Generic;

namespace OrdersAPI.Services
{
    public class OrderServices : IOrderServices
    {
        private readonly IOrderRepository repository;
        public OrderServices(IOrderRepository repository)
        {
            this.repository = repository;
        }
        public void AddOrderDetails(Order order)
        {
            var addOrder = repository.GetOrderDetailsByUserId(order.UserId);
            repository.AddOrderDetails(order);

        }
        public void AddOrderStatus(OrderStatus orderStatus)
        {
            List<OrderStatus> statuses = repository.GetOrderStatuses();
            if (statuses.Find(os => os.Status == orderStatus.Status) == null)
                repository.AddOrderStatus(orderStatus);
            else
                throw new OrderStatusExistsException($"Order status: {orderStatus.Status} already exists");
        }


        public List<Order> GetOrderDetailsByUserId(string userId)
        {
            var getOrder = repository.GetOrderDetailsByUserId(userId);
            if (getOrder != null)
            {
                return getOrder;
            }
            throw new OrderNotFoundException($"Order with order id: {userId} does not exists");

        }

        public List<Order> GetOrders()
        {
            return repository.GetOrders();
        }

        public List<OrderStatus> GetOrderStatuses()
        {
            return repository.GetOrderStatuses();
        }

        public List<OrderProduct> GetProducts()
        {
            return repository.GetProducts();
        }

        public void UpdateOrder(Order order)
        {
            var ord = repository.GetOrders();
            if (ord != null)
            {
                repository.UpdateOrder(order);
            }
            else
            {
                throw new OrderNotFoundException($"Order with order id: {order} does not exists");
            }

        }
    }
}
