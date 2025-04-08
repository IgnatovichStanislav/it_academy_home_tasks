using LibraryApi.Infrastructure.Models;
using LibraryApi.Infrastructure.Models.Author;
using LibraryApi.Infrastructure.Models.Book;
using LibraryApi.Infrastructure.Models.Category;

namespace LibraryApi.Infrastructure.Contracts;

public interface IBookService
{
    Book[] Get(BooksFilterRequest filterRequest, int? accountId);
    Book[] Get(params int[] ids);


}
public interface ICategoryService
{
    Category[] Get(params int[] ids);

    Category[] GetAll();
}
public interface IAuthorService
{
    Author[] Get(params int[] ids);
    Author[] GetAll();

}

public interface IFavoriteBookService
{
    FavoriteBook[] GetByAccountId(params int[] accountIds);

    FavoriteBook Save(FavoriteBook favoriteBook);
    void Delete(FavoriteBook favoriteBook);
}