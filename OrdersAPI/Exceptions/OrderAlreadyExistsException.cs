using System;

namespace OrdersAPI.Exceptions
{
    public class OrderAlreadyExistsException: Exception
    {
        public OrderAlreadyExistsException() { }
        public OrderAlreadyExistsException(string message) : base(message) { }

    }
}
