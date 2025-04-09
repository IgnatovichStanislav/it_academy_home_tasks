namespace LibraryApi.Infrastructure.Models.Book;

public class BooksFilterRequest
{
    public int? Author { get; set; }
    public string? SortBy { get; set; }
    public bool? ShowFavorites { get; set; }
    public int? CategoryId { get; set; }
}