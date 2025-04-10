using System.Security.Claims;
using LibraryApi.Infrastructure.Contracts;
using LibraryApi.Infrastructure.Models.Book;
using Microsoft.AspNetCore.Mvc;


namespace LibraryApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BooksController(IBookService bookService, IFavoriteBookService favoriteBookService) : ControllerBase
    {
        [HttpGet("GetByFilter")]
        public async Task<ActionResult<Book>> Get([FromQuery] BooksFilterRequest filter)
        {
            int.TryParse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
                out var accountId);

            var books = bookService.Get(filter, accountId);
            await Task.Delay(2000);
            return Ok(books);
        }

        [HttpGet("{id}")]
        public ActionResult<Book> Get(int id)
        {
            var book = bookService.Get(id).FirstOrDefault();
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }
    }
}
