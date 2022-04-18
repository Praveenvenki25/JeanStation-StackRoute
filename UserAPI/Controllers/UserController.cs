using Confluent.Kafka;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;
using UserAPI.Exceptions;
using UserAPI.Filters;
using UserAPI.Models;
using UserAPI.Service;

namespace UserAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [UserException]
    public class UserController : ControllerBase
    {
        private IConfiguration config;
        private readonly IUserService service;
        private readonly ITokenGeneratorService tokenservice;

        public UserController(IUserService userserv,ITokenGeneratorService tokenserv, IConfiguration config)
        {
            this.service = userserv;
            this.tokenservice = tokenserv;
            this.config = config;
            
        }

        [HttpPost("validate/{token}")]
        public IActionResult Validatetoken(string token)
        {
            var res=tokenservice.ValidateToken(token);
            return Ok(res);
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(User user)
        {
           var res= service.Login(user.EmailAddress,user.Password);
            if (res != null)
            {
                return Ok(tokenservice.GenerateToken(res.EmailAddress,res.Role));
            }
            else
            {
                return BadRequest("Error retrieving token");
            }
           
           
        }
        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser(User user)
        {        
            service.RegisterUser(user);
            string message = JsonConvert.SerializeObject(user);
            ProducerConfig producerConfig = new ProducerConfig
            {
                BootstrapServers = config["Kafka:Server"]
            };
            using (var producer = new ProducerBuilder<Null, string>(producerConfig).Build())
            {
                var result = await producer.ProduceAsync("notificationTopic", new Message<Null, string>
                {
                    Value = message
                });
                return await Task.FromResult(Ok("Registration successful and message sent"));
            }
        }

        [HttpGet]
        //[Authorize(Roles ="admin")]
        
        public IActionResult GetUsers()
        {
                return Ok(service.GetUsers());
                
  
        }
        [HttpGet("getUserbyId/{userId}")]
        public IActionResult GetUserById(string userId)
        {
         
                return Ok(service.GetUserById(userId));
          
        }

        [HttpPut("{UserId}")]
        public IActionResult UpdateUser(string UserId,User user)
        {
           
                return Ok(service.UpdateUser(UserId,user));
                
        
        }

        [HttpDelete("{userId}")]
        
        public IActionResult DeleteUser(string userId)
        {
          
                service.DeleteUserById(userId);
                return Ok("User Deleted Successfully");
         
        }

        [HttpGet("getUserByEmail/{Email}")]
        public IActionResult GetUserByEmail(string Email)
        {
            return Ok(service.GetUserbyEmail(Email));
        }

        [HttpGet("verify")]
        public async Task<IActionResult> Post(string token)
        {
            var secret = config["captchaSecret"].ToString();
            var tokenresponse = token;
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync($"https://www.google.com/recaptcha/api/siteverify?secret={secret}&response={tokenresponse}"))
                {
                    string apiResponse = response.Content.ReadAsStringAsync().Result;
                    return Ok(apiResponse);
                }
            }
        }



    }
}
