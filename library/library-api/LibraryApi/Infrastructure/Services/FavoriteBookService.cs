using LibraryApi.Infrastructure.Contracts;
using LibraryApi.Infrastructure.Models;

namespace LibraryApi.Infrastructure.Services;

public class FavoriteBookService: IFavoriteBookService
{
    private List<FavoriteBook> _favoriteBook =
    [

    ];

    public FavoriteBook[] GetByAccountId(params int[] accountIds)
    {
        return _favoriteBook.Where(f => accountIds.Contains(f.AccountId)).ToArray();
    }

    public FavoriteBook Save(FavoriteBook favoriteBook)
    {
        _favoriteBook.Add(favoriteBook);
        return favoriteBook;
    }

    public void Delete(FavoriteBook favoriteBook)
    {
        _favoriteBook = _favoriteBook
            .Where(x => x.BookId != favoriteBook.BookId && x.AccountId != favoriteBook.AccountId).ToList();
        _favoriteBook.Remove(favoriteBook);
    }
}