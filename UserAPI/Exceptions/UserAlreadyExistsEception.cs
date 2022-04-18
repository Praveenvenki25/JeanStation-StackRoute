using System;

namespace UserAPI.Exceptions
{
    public class UserAlreadyExistsEception:Exception
    {
        public UserAlreadyExistsEception() { }
        public UserAlreadyExistsEception(string message) : base(message) { }
    }
}
