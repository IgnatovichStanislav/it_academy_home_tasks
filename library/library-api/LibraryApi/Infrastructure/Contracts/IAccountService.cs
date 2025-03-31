using LibraryApi.Infrastructure.Models;

namespace LibraryApi.Infrastructure.Contracts;

public interface IAccountService
{
    Account? Get(string userName);
    void Create(Account newAccount);
}