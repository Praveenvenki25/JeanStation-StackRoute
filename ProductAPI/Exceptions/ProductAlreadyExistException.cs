using System;

namespace ProductAPI.Exceptions
{
    public class ProductAlreadyExistException:ApplicationException
    {
        public ProductAlreadyExistException() { }
        public ProductAlreadyExistException(string message) : base(message) { }
    }
}
