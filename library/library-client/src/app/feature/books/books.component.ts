import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
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
  filter = new BehaviorSubject<BooksFilter>({});
  search = '';

  constructor(booksUiDataService: BooksUiDataService) {
    this.filter
      .pipe(
        switchMap((filter: BooksFilter) =>
          booksUiDataService.booksPageData(filter)
        )
      )
      .subscribe((books: Book[]) => {
        this.books = books;
      });
  }

  onSearchInput(search: string): void {
    this.search = search;
  }
  onFilterChange(filter: BooksFilter): void {
    console.log(filter);
    this.filter.next(filter);
  }

  onBookClick(book: Book): void {
    console.log('Book clicked:', book);
  }
}
