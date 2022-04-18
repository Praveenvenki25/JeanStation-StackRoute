using System;

namespace NotificationsAPI.Exceptions
{
    public class NotificationsException: Exception
    {
        public NotificationsException() { }
        public NotificationsException(string message) : base(message) { }
    }
}
