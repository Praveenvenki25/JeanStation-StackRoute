using System;

namespace OrdersAPI.Exceptions
{
    public class OrderStatusExistsException: Exception
    {
        public OrderStatusExistsException() { }
        public OrderStatusExistsException(string message) : base(message) { }
    }
}
