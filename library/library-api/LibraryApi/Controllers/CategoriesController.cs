using LibraryApi.Infrastructure.Contracts;
using LibraryApi.Infrastructure.Models.Category;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoriesController(ICategoryService categoryService) : ControllerBase
    {
        [HttpGet("{id}")]
        public ActionResult<Category> Get(int id)
        {
            var category = categoryService.Get(id).FirstOrDefault();
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpGet("getbyids")]
        public ActionResult<IEnumerable<Category>> Get([FromQuery] int[] ids)
        {
            return Ok(categoryService.Get(ids));
        }
    }
}
