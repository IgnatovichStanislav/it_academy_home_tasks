import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';

import { Book } from '../../core/models/books/Book';
import { AuthorsService } from '../../core/services/AuthorsService';
import { IAuthorsService } from '../../core/services/contracts/IAuthorsService';
import { BooksListComponent } from './books-list/books-list.component';
import { Author } from '../../core/models/authors/Author';
import { BooksFilter } from '../../core/models/books/BooksFilter';
import { BooksUiDataService } from '../../core/ui-data-services/BooksUiDataService';
import { IBooksUiDataService } from '../../core/ui-data-services/contracts/IBooksUiDataService';
import { BooksFilterComponent } from './books-filter/books-filter.component';
import { LoadingIndicatorComponent } from '../../shared/components/loading-indicator/loading-indicator.component';
import { LoadingService } from '../../core/ui-services/LoadingService ';
import { ILoadingService } from '../../core/ui-services/contracts/ILoadingService';

@Component({
  selector: 'app-books',
  imports: [
    BooksFilterComponent,
    BooksListComponent,
    LoadingIndicatorComponent,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  authorsService: IAuthorsService;
  booksUiDataService: IBooksUiDataService;
  loadingService: ILoadingService;

  books: Book[] = [];
  authors: Author[] = [];
  search: string = '';
  loading: boolean = false;
  filter: BehaviorSubject<BooksFilter> = new BehaviorSubject<BooksFilter>({});

  constructor(
    @Inject(AuthorsService) authorsService: IAuthorsService,
    @Inject(BooksUiDataService) booksUiDataService: IBooksUiDataService,
    @Inject(LoadingService) loadingService: ILoadingService
  ) {
    this.authorsService = authorsService;
    this.booksUiDataService = booksUiDataService;
    this.loadingService = loadingService;
  }

  ngOnInit(): void {
    this.authorsService
      .getAuthors()
      .subscribe((authors: Author[]) => (this.authors = authors));

    this.filter
      .pipe(
        switchMap((filter: BooksFilter) => {
          this.loading = this.loadingService.loadingOn();
          return this.booksUiDataService.booksPageData(filter);
        })
      )
      .subscribe((books: Book[]) => {
        this.loading = this.loadingService.loadingOff();
        this.books = books;
      });
  }

  onSearchChange(search: string): void {
    this.search = search;
  }

  onFilterChange(filter: BooksFilter): void {
    this.filter.next({ ...filter });
  }
}
