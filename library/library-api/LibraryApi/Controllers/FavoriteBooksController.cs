using LibraryApi.Infrastructure.Contracts;
using LibraryApi.Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class FavoriteBooksController(IFavoriteBookService favoriteBookService) : ControllerBase
    {

        [HttpGet("get")]
        public ActionResult<FavoriteBook> Get()
        {
            if (int.TryParse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
                    out var accountId))
            {
                return Ok(favoriteBookService.GetByAccountId(accountId));
            }

            return Ok(new List<FavoriteBook>());
        }

        [HttpPost("post")]
        public ActionResult<FavoriteBook> Post([FromBody]FavoriteBook favoriteBook)
        {
            return Ok(favoriteBookService.Save(favoriteBook));
        }

        [HttpDelete("delete")]
        public ActionResult<bool> Delete(FavoriteBook favoriteBook)
        {
            favoriteBookService.Delete(favoriteBook);
            return Ok();
        }
    }
}
