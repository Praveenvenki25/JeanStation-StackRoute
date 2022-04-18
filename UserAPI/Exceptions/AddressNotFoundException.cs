using System;

namespace UserAPI.Exceptions
{
    public class AddressNotFoundException:Exception
    {
        public AddressNotFoundException() { }
        public AddressNotFoundException(string message) : base(message) { }
    }
}
