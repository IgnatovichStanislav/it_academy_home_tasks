import { Book } from '../../models/books/Book';
import { BooksFilter } from '../../models/books/BooksFilter';
import { Observable } from 'rxjs';

export interface IBooksUiDataService {
  booksPageData(filter: BooksFilter): Observable<Book[]>;
}
