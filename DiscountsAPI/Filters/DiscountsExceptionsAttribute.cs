using DiscountsAPI.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DiscountsAPI.Filters
{
    public class DiscountsExceptionsAttribute: ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
           var exceptionType = context.Exception.GetType();
           var message = context.Exception.Message;

            if (exceptionType == typeof(DiscountNotFoundException))
                context.Result = new NotFoundObjectResult(message);
            else if(exceptionType == typeof(DiscountAlreadyExistsException))
                context.Result = new ConflictObjectResult(message);
            else
                context.Result = new BadRequestObjectResult(message);
        }
    }
}
