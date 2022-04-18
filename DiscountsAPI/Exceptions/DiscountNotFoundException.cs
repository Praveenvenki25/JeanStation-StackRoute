using System;

namespace DiscountsAPI.Exceptions
{
    public class DiscountNotFoundException: Exception
    {
        public DiscountNotFoundException() {  }
        public DiscountNotFoundException(string message) : base(message) { }
    }
}
