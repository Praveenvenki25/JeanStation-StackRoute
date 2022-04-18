using System;

namespace WishlistAPI.Exceptions
{
    public class WishlistAlreadyExistsException : Exception
    {
        public WishlistAlreadyExistsException() { }
        public WishlistAlreadyExistsException(string message) : base(message) { }
    }
}
