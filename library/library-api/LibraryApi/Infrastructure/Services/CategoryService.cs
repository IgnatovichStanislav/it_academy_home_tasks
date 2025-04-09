using LibraryApi.Infrastructure.Contracts;
using LibraryApi.Infrastructure.Models.Category;

namespace LibraryApi.Infrastructure.Services;

public class CategoryService : ICategoryService
{
    private List<Category> _categories =
    [
        new Category { Id = 1, Name = "Classic Literature", PixUrl = "https://www.pngmart.com/files/15/Antique-Book-PNG-Transparent.png" },
        new Category { Id = 2, Name = "Dystopian", PixUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnhv27Mf3l_7d1JqDFFrN4sqIBWaD4tlDLdg&s" },
        new Category { Id = 3, Name = "Fantasy", PixUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyZ6kbncgSOBWYcGLXXiaCKGZVJL6yxW9fKw&s" },
        new Category { Id = 4, Name = "Epic Poetry", PixUrl = "https://people.umass.edu/eng2/images/elCid.jpg" }
    ];

    public Category[] Get(params int[] ids)
    {
        return _categories.Where(c => ids.Contains(c.Id)).ToArray();
    }

    public Category[] GetAll()
    {
        return _categories.ToArray();
    }
}