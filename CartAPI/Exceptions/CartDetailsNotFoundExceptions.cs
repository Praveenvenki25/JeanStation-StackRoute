using System;

namespace CartAPI.Exceptions
{
    public class CartDetailsNotFoundExceptions : Exception
    { 
        public CartDetailsNotFoundExceptions() { }
        public CartDetailsNotFoundExceptions(string message) : base(message) { }
    }
}
