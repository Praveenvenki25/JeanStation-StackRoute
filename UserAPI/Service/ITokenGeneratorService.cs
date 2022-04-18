using Microsoft.IdentityModel.Tokens;

namespace UserAPI.Service
{
    public interface ITokenGeneratorService
    {
        string GenerateToken(string Email,string Role);

        bool ValidateToken(string authToken);




    }
}
