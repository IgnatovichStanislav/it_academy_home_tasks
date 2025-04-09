namespace LibraryApi.Infrastructure.Models.Book;

public class Book
{
    public int Id { get; set; }
    public DateTime? PublicationDate { get; set; }
    public string Title { get; set; }
    public string PixUrl { get; set; }
    public int? AuthorId { get; set; }
    public int? CategoryId { get; set; }
}