using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LibraryApi.Infrastructure.Models;
using Microsoft.IdentityModel.Tokens;

namespace LibraryApi.Infrastructure.Providers;

public class TokenProvider(IConfiguration configuration)
{
    public string GetToken(Account account)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, account.Username),
            new(ClaimTypes.NameIdentifier, account.Id.ToString()),
            new("Firstname", account.FirstName),
            new("Lastname", account.LastName),
        };

        var claimsIdentity = new ClaimsIdentity(claims, "JwtBearer");
        var jwtSettings = configuration.GetSection("JwtSettings");
        var secret = Encoding.ASCII.GetBytes(jwtSettings["Secret"]);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = claimsIdentity,
            Expires = DateTime.UtcNow.AddDays(90),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secret), SecurityAlgorithms.HmacSha256Signature)
        };

        var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
        var securityToken = jwtSecurityTokenHandler.CreateToken(tokenDescriptor);
        var token = jwtSecurityTokenHandler.WriteToken(securityToken);

        return token;
    }
}