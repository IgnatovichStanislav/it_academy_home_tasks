import { Component } from '@angular/core';
import { Book } from '../../core/models/books/Book';
import { BooksFilterComponent } from './books-filter/books-filter.component';
import { NgFor } from '@angular/common';
import { BookCardComponent } from '../../shared/components/cards/book-card/book-card.component';
import { BooksClientSideFilterPipe } from '../../shared/pipes/books-client-side-filter.pipe';

@Component({
  selector: 'app-books',
  imports: [
    BooksFilterComponent,
    NgFor,
    BookCardComponent,
    BooksClientSideFilterPipe,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent {
  books: Book[] = [];
  search = '';
  constructor() {}

  onBookClick(book: Book): void {
    console.log('Book clicked:', book);
  }

  onBooksUpdate(books: Book[]): void {
    this.books = books;
  }
  onSearchUpdate(search: string): void {
    this.search = search;
  }
}
