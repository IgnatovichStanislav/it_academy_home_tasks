import { Inject, Injectable } from '@angular/core';

import { forkJoin, iif, map, Observable, of, switchMap, tap } from 'rxjs';

import { Book } from '../models/books/Book';
import { BooksFilter } from '../models/books/BooksFilter';
import { BooksService } from '../services/BooksService';
import { CategoriesService } from '../services/CategoriesService';
import { AuthorsService } from '../services/AuthorsService';
import '../extensions/ArrayExtensions';
import { FavoritesService } from '../services/FavoritesService';
import { FavoriteBook } from '../models/favoriteBook/FavoriteBook';
import { IBooksUiDataService } from './contracts/IBooksUiDataService';
import { UserService } from '../services/UserService';
import { IUserService } from '../services/contracts/IUserService';
import { IFavoritesService } from '../services/contracts/IFavoritesService';
import { IAuthorsService } from '../services/contracts/IAuthorsService';
import { ICategoriesService } from '../services/contracts/ICategoriesService';
import { IBooksService } from '../services/contracts/IBooksService';

@Injectable({
  providedIn: 'root',
})
export class BooksUiDataService implements IBooksUiDataService {
  booksService: IBooksService;
  categoriesService: ICategoriesService;
  authorsService: IAuthorsService;
  favoritesService: IFavoritesService;
  userService: IUserService;

  constructor(
    @Inject(BooksService) booksService: IBooksService,
    @Inject(CategoriesService) categoriesService: ICategoriesService,
    @Inject(AuthorsService) authorsService: IAuthorsService,
    @Inject(FavoritesService) favoritesService: IFavoritesService,
    @Inject(UserService) userService: IUserService
  ) {
    this.booksService = booksService;
    this.categoriesService = categoriesService;
    this.authorsService = authorsService;
    this.favoritesService = favoritesService;
    this.userService = userService;
  }

  booksPageData(filter: BooksFilter): Observable<Book[]> {
    return this.booksService.getByFilter(filter).pipe(
      switchMap((books: Book[]) => {
        const categoryIds: number[] = books
          .selectNumbers((x) => x.categoryId)
          .distinct();
        const authorIds: number[] = books
          .selectNumbers((x) => x.authorId)
          .distinct();
        const user = this.userService.getUser();
        return forkJoin({
          categories: this.categoriesService.getById(categoryIds),
          authors: this.authorsService.getById(authorIds),
          favorites: iif(
            () => user !== null && user !== undefined,
            this.favoritesService.getBooksByCurrentUser(),
            of<FavoriteBook[]>([])
          ),
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
