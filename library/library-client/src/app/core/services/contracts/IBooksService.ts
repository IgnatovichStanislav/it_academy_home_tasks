import { Observable } from 'rxjs';
import { Book } from '../../models/books/Book';
import { BooksFilter } from '../../models/books/BooksFilter';

export interface IBooksService {
  getByFilter(filter: BooksFilter): Observable<Book[]>;
  setFavorite(
    bookId: number,
    currentUserId: number,
    isFavorite: boolean
  ): Observable<any>;
}
