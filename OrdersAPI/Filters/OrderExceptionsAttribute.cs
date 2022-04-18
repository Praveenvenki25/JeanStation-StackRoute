using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using OrdersAPI.Exceptions;

namespace OrdersAPI.Filters
{
    public class OrderExceptionsAttribute: ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var exceptionType = context.Exception.GetType();
            var message = context.Exception.Message;

            if (exceptionType == typeof(OrderNotFoundException))
            {
                context.Result = new NotFoundObjectResult(message);
            }
            else if (exceptionType == typeof(OrderAlreadyExistsException))
            {
                context.Result = new ConflictObjectResult(message);
            }
            else if(exceptionType == typeof(OrderStatusExistsException))
            {
                context.Result = new ConflictObjectResult(message);
            }
            else
            {
                context.Result = new BadRequestObjectResult(message);
            }
        }

    }
}
