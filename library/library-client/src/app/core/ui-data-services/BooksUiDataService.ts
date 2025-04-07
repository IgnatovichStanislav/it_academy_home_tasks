import { Injectable } from '@angular/core';
import { Book } from '../models/books/Book';
import { BooksFilter } from '../models/books/BooksFilter';
import { BooksService } from '../services/BooksService';
import { CategoriesService } from '../services/CategoriesService';
import { forkJoin, map, mergeMap, Observable, of, tap } from 'rxjs';
import { AuthorsService } from '../services/AuthorsService';
import '../extensions/ArrayExtensions';
import { FavoritesService } from '../services/FavoritesService';
import { FavoriteBook } from '../models/favoriteBook/FavoriteBook';
import { getUser } from '../helpers/userHelper';
import { IBooksUiDataService } from './contracts/IBooksUiDataService';

@Injectable({
  providedIn: 'root',
})
export class BooksUiDataService implements IBooksUiDataService {
  booksService: BooksService;
  categoriesService: CategoriesService;
  authorsService: AuthorsService;
  favoritesService: FavoritesService;

  constructor(
    booksService: BooksService,
    categoriesService: CategoriesService,
    authorsService: AuthorsService,
    favoritesService: FavoritesService
  ) {
    this.booksService = booksService;
    this.categoriesService = categoriesService;
    this.authorsService = authorsService;
    this.favoritesService = favoritesService;
  }

  booksPageData(filter: BooksFilter): Observable<Book[]> {
    return this.booksService.getByFilter(filter).pipe(
      mergeMap((books: Book[]) => {
        const categoryIds: number[] = books
          .selectNumbers((x) => x.categoryId)
          .distinct();
        const authorIds: number[] = books
          .selectNumbers((x) => x.authorId)
          .distinct();
        const user = getUser();
        return forkJoin({
          categories: this.categoriesService.getById(categoryIds),
          authors: this.authorsService.getById(authorIds),
          favorites: user
            ? this.favoritesService.getBooksByCurrentUser()
            : of<FavoriteBook[]>([]),
        }).pipe(
          map(({ categories, authors, favorites }) => {
            books.forEach((book: Book) => {
              book.category = categories.find((x) => x.id === book.categoryId);
              book.author = authors.find((x) => x.id === book.authorId);
              if (user)
                book.favorite = favorites.find((x) => x.bookId === book.id);
            });
            return books;
          })
        );
      })
    );
  }
}
