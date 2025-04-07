using LibraryApi.Infrastructure.Contracts;
using LibraryApi.Infrastructure.Models.Book;

namespace LibraryApi.Infrastructure.Services;

public class BookService(IFavoriteBookService favoriteBookService) : IBookService
{
    private  List<Book> _books =
    [
        new Book
        {
            Id = 1, Title = "The Great Gatsby", PublicationDate = new DateTime(1925, 4, 10), AuthorId = 1,
            CategoryId = 1
        },
        new Book
        {
            Id = 2, Title = "To Kill a Mockingbird", PublicationDate = new DateTime(1960, 7, 11),
            AuthorId = 2, CategoryId = 1
        },
        new Book
        {
            Id = 3, Title = "1984", PublicationDate = new DateTime(1949, 6, 8), PixUrl = "https://m.media-amazon.com/images/I/61HkdyBpKOL._AC_UF894,1000_QL80_.jpg", AuthorId = 3,
            CategoryId = 2
        },
        new Book
        {
            Id = 4, Title = "Pride and Prejudice", PublicationDate = new DateTime(1813, 1, 28),
            AuthorId = 4, CategoryId = 1
        },
        new Book
        {
            Id = 5, Title = "The Catcher in the Rye", PublicationDate = new DateTime(1951, 7, 16),
            AuthorId = 5, CategoryId = 1
        },
        new Book
        {
            Id = 6, Title = "The Hobbit", PublicationDate = new DateTime(1937, 9, 21), AuthorId = 6,
            CategoryId = 3
        },
        new Book
        {
            Id = 7, Title = "Fahrenheit 451", PublicationDate = new DateTime(1953, 10, 19), AuthorId = 7,
            CategoryId = 2
        },
        new Book
        {
            Id = 8, Title = "Jane Eyre", PublicationDate = new DateTime(1847, 10, 16), AuthorId = 8,
            CategoryId = 1
        },
        new Book
        {
            Id = 9, Title = "Brave New World", PublicationDate = new DateTime(1932, 8, 30), AuthorId = 9,
            CategoryId = 2
        },
        new Book
        {
            Id = 10, Title = "The Lord of the Rings", PublicationDate = new DateTime(1954, 7, 29),
            AuthorId = 6, CategoryId = 3
        },
        new Book
        {
            Id = 11, Title = "Animal Farm", PublicationDate = new DateTime(1945, 8, 17), AuthorId = 3,
            CategoryId = 2
        },
        new Book
        {
            Id = 12, Title = "Moby-Dick", PublicationDate = new DateTime(1851, 10, 18), AuthorId = 10,
            CategoryId = 1
        },
        new Book
        {
            Id = 13, Title = "War and Peace", PublicationDate = new DateTime(1869, 1, 1), AuthorId = 11,
            CategoryId = 1
        },
        new Book
        {
            Id = 14, Title = "The Odyssey", PublicationDate = new DateTime(800, 1, 1), AuthorId = 12,
            CategoryId = 4
        },
        new Book
        {
            Id = 15, Title = "Crime and Punishment", PublicationDate = new DateTime(1866, 1, 1),
            AuthorId = 13, CategoryId = 1
        }
    ];

    public Book[] Get(BooksFilterRequest filterRequest, int? accountId)
    {
        var query = _books.AsEnumerable();

        if (filterRequest.Author.HasValue)
            query = query.Where(b => b.AuthorId == filterRequest.Author);
        if (filterRequest.CategoryId.HasValue)
            query = query.Where(b => b.CategoryId == filterRequest.CategoryId);
        if (filterRequest.ShowFavorites == true && accountId.HasValue)
        {
            var favoriteBooks = favoriteBookService.GetByAccountId(accountId.Value);
            query = query.Where(x => favoriteBooks.Any(any => any.BookId == x.Id)).ToArray();
        }
        switch (filterRequest.SortBy)
        {
            case "publicationDate":
                query = query.OrderBy(b => b.PublicationDate);
                break;
            case "title":
            default:
                query = query.OrderBy(b => b.Title);
                break;

        }

        return query.ToArray();
    }

    public Book[] Get(params int[] ids)
    {
        return _books.Where(x => ids.Contains(x.Id)).ToArray();
    }
}