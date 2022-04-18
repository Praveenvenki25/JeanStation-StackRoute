using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserAPI.Filters;
using UserAPI.Models;
using UserAPI.Service;

namespace UserAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AddressException]
    public class AddressController : ControllerBase
    {
        private readonly IUserService service;
        public AddressController(IUserService service)
        {
            this.service = service;

        }

        [HttpGet("user/{userId}")]
        public IActionResult GetAddressByUserId(string userId)
        {
            return Ok(service.GetAddressbyUserId(userId));
        }

        [HttpGet("{addressId}")]
        public IActionResult GetAddressByAddressId(string addressId)
        {
            return Ok(service.GetAddressByAddressId(addressId));
        }

        [HttpPost]
        public IActionResult AddAddress(Address Address)
        {
            return Ok(service.AddAddress(Address));
        }

        [HttpPut("{addressId}")]
        public IActionResult UpdateAddress(string AddressId, Address Address)
        {
            return Ok(service.UpdateAddress(AddressId, Address));
        }

        [HttpDelete("{addressId}")]
        public IActionResult DeleteAddress(string addressId)
        {
            service.DeleteAddress(addressId);
            return Ok("Address Deleted Successfully");
        }
    }
}
