using System;

namespace UserAPI.Exceptions
{
    public class AddressAlreadyExistsException:Exception
    {
        public AddressAlreadyExistsException() { }
        public AddressAlreadyExistsException(string message) : base(message) { }
    }
}
