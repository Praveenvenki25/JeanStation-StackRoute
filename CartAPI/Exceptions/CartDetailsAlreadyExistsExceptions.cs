using System;

namespace CartAPI.Exceptions
{
    public class CartDetailsAlreadyExistsExceptions : Exception
    {
        public CartDetailsAlreadyExistsExceptions() { }
        public CartDetailsAlreadyExistsExceptions(string message) : base(message) { }
    }
}

