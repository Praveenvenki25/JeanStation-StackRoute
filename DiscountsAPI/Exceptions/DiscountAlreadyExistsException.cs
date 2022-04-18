using System;

namespace DiscountsAPI.Exceptions
{
    public class DiscountAlreadyExistsException: Exception
    {
        public DiscountAlreadyExistsException() { }
        public DiscountAlreadyExistsException(string message) : base(message) { }
    }
}
