using LibraryApi.Infrastructure.Contracts;
using LibraryApi.Infrastructure.Enums;
using LibraryApi.Infrastructure.Models;
using LibraryApi.Infrastructure.Models.Token;
using LibraryApi.Infrastructure.Providers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    public class AuthController(IAuthenticationProvider authenticationProvider,
        TokenProvider tokenProvider, IAccountService accountService
         ) : ControllerBase
    {
        [HttpPost("signup")]
        public IActionResult Signup([FromBody] SignupRequest signupRequest)
        {
            var account = accountService.Get(signupRequest.Username);

            if (account != null)
                return Conflict("Username already exists");

            var newAccount = new Account
            {
                UserName = signupRequest.Username,
                Password = signupRequest.Password,
                FirstName = signupRequest.FirstName,
                LastName = signupRequest.LastName,
                Role = RoleEnum.User
            };

            accountService.Create(newAccount);

            return Ok(new
            {
                Username = newAccount.UserName,
                newAccount.FirstName,
                newAccount.LastName,
                newAccount.Role,
            });
        }

        [HttpPost("token")]
        public IActionResult Token([FromBody] TokenRequest tokenRequest)
        {
            var userName = tokenRequest.Username;
            var password = tokenRequest.Password;

            var (signInResult, account) =
                 authenticationProvider.SignIn(userName, password);

            if (signInResult == SignInStatus.Fail)
                return Conflict("Invalid username or password");

            var token = tokenProvider.GetToken(account);

            var value = new TokenResponse
            {
                AuthToken = token,
                User = new User
                {
                    UserName = account.UserName,
                    FirstName = account.FirstName,
                    LastName = account.LastName,
                    Role = (int)account.Role,
                    Id = account.Id
                }
            };

            return Ok(value);
        }
    }
}