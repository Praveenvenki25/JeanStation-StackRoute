using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace UserAPI.Service
{
    public class TokenGeneratorService : ITokenGeneratorService 
    {
        public string GenerateToken(string Email,string Role)
        {
            var Claims = new[]
            {
                new Claim("Email",Email),
                new Claim("Role",Role)
            };
            var Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This is the secret code: JeanStation200"));
            var Creds=new SigningCredentials(Key,SecurityAlgorithms.HmacSha256);

            var Token = new JwtSecurityToken(
                issuer: "userapi",
                audience:"userapi",
                claims: Claims,
                expires: System.DateTime.Now.AddMinutes(30),
                signingCredentials: Creds
                );
            var response = new
            {
                Token = new JwtSecurityTokenHandler().WriteToken(Token)
            };
            return JsonConvert.SerializeObject(response);
        }

        public bool ValidateToken(string authToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = GetValidationParameters();

            SecurityToken validatedToken;
            IPrincipal principal = tokenHandler.ValidateToken(authToken, validationParameters, out validatedToken);
            if(principal == null)
            {
                return false;
            }
            return true;
        }

        public static TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters()
            {
                ValidateLifetime = false, // Because there is no expiration in the generated token
                ValidateAudience = false, // Because there is no audiance in the generated token
                ValidateIssuer = false,   // Because there is no issuer in the generated token
                ValidIssuer = "userapi",
                ValidAudience = "userapi",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This is the secret code: JeanStation200")) // The same key as the one that generate the token
            };
        }
    }
}


    



