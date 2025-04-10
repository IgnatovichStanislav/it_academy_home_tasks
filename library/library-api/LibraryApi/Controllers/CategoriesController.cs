using LibraryApi.Infrastructure.Contracts;
using LibraryApi.Infrastructure.Models.Category;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoriesController(ICategoryService categoryService) : ControllerBase
    {
        [HttpGet("getbyids")]
        public ActionResult<IEnumerable<Category>> Get([FromQuery] int[] ids)
        {
            return Ok(categoryService.Get(ids));
        }

        [HttpGet("getall")]
        public ActionResult<IEnumerable<Category>> GetAll()
        {
            return Ok(categoryService.GetAll());
        }
    }
}
