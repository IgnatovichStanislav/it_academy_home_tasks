using LibraryApi.Infrastructure.Contracts;
using LibraryApi.Infrastructure.Models.Author;

namespace LibraryApi.Infrastructure.Services;

public class AuthorService : IAuthorService
{
    private List<Author> _authors =
    [
        new Author { Id = 1, Name = "F. Scott Fitzgerald" },
        new Author { Id = 2, Name = "Harper Lee" },
        new Author { Id = 3, Name = "George Orwell" },
        new Author { Id = 4, Name = "Jane Austen" },
        new Author { Id = 5, Name = "J.D. Salinger" },
        new Author { Id = 6, Name = "J.R.R. Tolkien" },
        new Author { Id = 7, Name = "Ray Bradbury" },
        new Author { Id = 8, Name = "Charlotte Brontë" },
        new Author { Id = 9, Name = "Aldous Huxley" },
        new Author { Id = 10, Name = "Herman Melville" },
        new Author { Id = 11, Name = "Leo Tolstoy" },
        new Author { Id = 12, Name = "Homer" },
        new Author { Id = 13, Name = "Fyodor Dostoevsky" }
    ];

    public Author[] Get(params int[] ids)
    {
        return _authors.Where(c => ids.Contains(c.Id)).ToArray();
    }

    public Author[] GetAll()
    {
        return _authors.ToArray();
    }
}