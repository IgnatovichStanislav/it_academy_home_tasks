using LibraryApi.Infrastructure.Contracts;
using LibraryApi.Infrastructure.Models;

namespace LibraryApi.Infrastructure.Services;

public class AccountService : IAccountService
{
    private List<Account> _accounts =
        [new Account {Role=RoleEnum.Admin, Id = 1, UserName = "admin", Password = "admin", FirstName = "Admin", LastName = "User" }];

    public Account? Get(string userName) => _accounts.FirstOrDefault(a => a.UserName == userName);
    public void Create(Account newAccount)
    {
        newAccount.Id = _accounts.Any() ? _accounts.Max(a => a.Id) + 1 : 1;
        _accounts.Add(newAccount);
    }
}