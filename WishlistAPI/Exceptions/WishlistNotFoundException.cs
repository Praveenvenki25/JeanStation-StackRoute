using System;

namespace WishlistAPI.Exceptions
{
    public class WishlistNotFoundException : Exception
    {
        public WishlistNotFoundException() { }
        public WishlistNotFoundException(string message) : base(message) { }
    }
}
