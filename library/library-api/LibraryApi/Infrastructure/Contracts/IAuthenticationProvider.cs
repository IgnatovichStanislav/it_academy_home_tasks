using LibraryApi.Infrastructure.Enums;
using LibraryApi.Infrastructure.Models;

namespace LibraryApi.Infrastructure.Contracts
{
    public interface IAuthenticationProvider
    {
        (SignInStatus, Account) SignIn(string userName, string password);
    }
}