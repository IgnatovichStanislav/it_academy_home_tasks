using LibraryApi.Infrastructure.Contracts;
using LibraryApi.Infrastructure.Enums;
using LibraryApi.Infrastructure.Models;
using Microsoft.AspNetCore.Identity;

namespace LibraryApi.Infrastructure.Providers;

public class AuthenticationProvider(IAccountService accountService) : IAuthenticationProvider
{
    public (SignInStatus, Account) SignIn(string userName, string password)
    {
        var signInResult = SignInStatus.Success;

        var account = accountService.Get(userName);

        if (password != account?.Password)
        {
            signInResult = SignInStatus.Fail;
        }
        return (signInResult, account);
    }
}