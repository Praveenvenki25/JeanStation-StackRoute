using CartAPI.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CartAPI.Filters
{
    public class CartExceptionsAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var exceptionType = context.Exception.GetType();
            var message = context.Exception.Message;

            if (exceptionType == typeof(CartDetailsNotFoundExceptions))
            {
                context.Result = new NotFoundObjectResult(message);
            }
            else if (exceptionType == typeof(CartDetailsAlreadyExistsExceptions))
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
