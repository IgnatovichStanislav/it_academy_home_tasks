using LibraryApi.Infrastructure.Contracts;
using LibraryApi.Infrastructure.Models;

namespace LibraryApi.Infrastructure.Services;

public class AccountService : IAccountService
{
    private readonly List<Account> _accounts =
        [new Account { Id = 1, Username = "admin", Password = "admin", FirstName = "Admin", LastName = "User" }];

    public Account? Get(string userName) => _accounts.FirstOrDefault(a => a.Username == userName);
    public void Create(Account newAccount)
    {
        newAccount.Id = _accounts.Any() ? _accounts.Max(a => a.Id) + 1 : 1;
        _accounts.Add(newAccount);
    }
}