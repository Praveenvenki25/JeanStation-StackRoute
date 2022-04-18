using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ProductAPI.Exceptions;

namespace ProductAPI.Filters
{
    public class ProductExceptionsAttribute:ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var exceptionType = context.Exception.GetType();
            var message = context.Exception.Message;

            if (exceptionType == typeof(ProductNotFoundException))
            {
                context.Result = new NotFoundObjectResult(message);
            }
            else if (exceptionType == typeof(ProductAlreadyExistException))
            {
                context.Result = new ConflictObjectResult(message);
            }
            else if (exceptionType == typeof(ProductImageNotFoundException))
            {
                context.Result = new NotFoundObjectResult(message);
            }
            else
            {
                context.Result = new BadRequestObjectResult(message);
            }
        }

    }
}
