using System;

namespace ProductAPI.Exceptions
{
    public class ProductImageNotFoundException: Exception
    {
        public ProductImageNotFoundException() { }
        public ProductImageNotFoundException(string message) : base(message) { }
    }
}
