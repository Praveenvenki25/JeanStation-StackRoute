using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using UserAPI.Exceptions;

namespace UserAPI.Filters
{
    public class AddressExceptionAttribute:ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var exceptionType = context.Exception.GetType();
            var message = context.Exception.Message;

            if (exceptionType == typeof(AddressNotFoundException))
            {
                context.Result = new NotFoundObjectResult(message);
            }
            else if (exceptionType == typeof(UserAlreadyExistsEception))
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
