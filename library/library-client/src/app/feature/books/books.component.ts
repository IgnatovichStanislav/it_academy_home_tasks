import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../core/models/books/Book';
import { BooksFilter } from '../../core/models/books/BooksFilter';
import { BooksUiDataService } from '../../core/ui-data-services/BooksUiDataService';
import { BooksFilterComponent } from './books-filter/books-filter.component';
import { NgFor, NgStyle } from '@angular/common';
import { BookCardComponent } from './book-card/book-card.component';
import { BooksClientSideFilterPipe } from '../../shared/pipes/books-client-side-filter.pipe';

@Component({
  selector: 'app-books',
  imports: [
    BooksFilterComponent,
    NgFor,
    BookCardComponent,
    BooksClientSideFilterPipe,
    NgStyle,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent {
  books: Book[] = [];
  search = '';

  constructor() {}

  @ViewChild(BooksFilterComponent) booksFilterComponent!: BooksFilterComponent;

  ngAfterViewInit(): void {
    this.booksFilterComponent.booksObservable.subscribe(
      (books: Book[]) => (this.books = books)
    );

    this.booksFilterComponent.searchObservable.subscribe(
      (search: string) => (this.search = search)
    );
  }

  onBookClick(book: Book): void {
    console.log('Book clicked:', book);
  }
}
