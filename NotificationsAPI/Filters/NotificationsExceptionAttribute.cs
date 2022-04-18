using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using NotificationsAPI.Exceptions;
using System;
using System.Net.Mail;

namespace NotificationsAPI.Filters
{
    public class NotificationsExceptionAttribute: ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var exceptionType = context.Exception.GetType();
            var message = context.Exception.Message;

            if (exceptionType == typeof(NotificationsFormatException))
                context.Result = new UnprocessableEntityObjectResult(message);

            else if (exceptionType == typeof(AggregateException))
                context.Result = new UnprocessableEntityObjectResult(message);

            else if (exceptionType == typeof(SmtpException))
                context.Result = new UnprocessableEntityObjectResult(message);
        }
    }
}
