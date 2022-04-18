using System;

namespace NotificationsAPI.Exceptions
{
    public class NotificationsFormatException: Exception
    {
        public NotificationsFormatException() { }
        public NotificationsFormatException(string message): base(message) { }  
    }
}
