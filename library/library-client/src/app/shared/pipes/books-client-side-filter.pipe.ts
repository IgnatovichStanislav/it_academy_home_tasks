import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../../core/models/books/Book';

@Pipe({
  name: 'booksClientSideFilter',
})
export class BooksClientSideFilterPipe implements PipeTransform {
  transform(books: Book[], search: string): Book[] {
    if (!search) return books;

    search = search.trim().toLocaleLowerCase();
    if (!search.length) return books;

    return books.filter(
      (book: Book) =>
        book.title.toLocaleLowerCase().includes(search) ||
        book.author?.name.toLocaleLowerCase().includes(search) ||
        book.category?.name.toLocaleLowerCase().includes(search)
    );
  }
}
