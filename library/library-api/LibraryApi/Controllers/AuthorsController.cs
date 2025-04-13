using LibraryApi.Infrastructure.Contracts;
using LibraryApi.Infrastructure.Models.Author;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthorsController(IAuthorService authorService) : ControllerBase
    {
        [HttpGet("getbyids")]
        public ActionResult<IEnumerable<Author>> Get([FromQuery] int[] ids)
        {
            return Ok(authorService.Get(ids.ToArray()));
        }

        [HttpGet("getall")]
        public ActionResult<IEnumerable<Author>> GetAll()
        {
            return Ok(authorService.GetAll());
        }
    }
}
