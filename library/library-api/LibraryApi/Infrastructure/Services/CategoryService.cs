using LibraryApi.Infrastructure.Contracts;
using LibraryApi.Infrastructure.Models.Category;

namespace LibraryApi.Infrastructure.Services;

public class CategoryService : ICategoryService
{
    private List<Category> _categories =
    [
        new Category { Id = 1, Name = "Classic Literature", PixUrl = "url1" },
        new Category { Id = 2, Name = "Dystopian", PixUrl = "url2" },
        new Category { Id = 3, Name = "Fantasy", PixUrl = "url3" },
        new Category { Id = 4, Name = "Epic Poetry", PixUrl = "url4" }
    ];

    public Category[] Get(params int[] ids)
    {
        return _categories.Where(c => ids.Contains(c.Id)).ToArray();
    }
}