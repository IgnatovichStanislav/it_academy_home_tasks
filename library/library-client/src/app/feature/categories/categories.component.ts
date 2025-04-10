import { Component, Inject } from '@angular/core';
import { Book } from '../../core/models/books/Book';
import { CategoriesFilterComponent } from './categories-filter/categories-filter.component';

import { BooksListComponent } from '../books/books-list/books-list.component';
import { Category } from '../../core/models/categories/Category';
import { BooksUiDataService } from '../../core/ui-data-services/BooksUiDataService';
import { IBooksUiDataService } from '../../core/ui-data-services/contracts/IBooksUiDataService';
import { ICategoriesService } from '../../core/services/contracts/ICategoriesService';
import { CategoriesService } from '../../core/services/CategoriesService';
import { BooksFilter } from '../../core/models/books/BooksFilter';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { ILoadingService } from '../../core/ui-services/contracts/ILoadingService';
import { LoadingService } from '../../core/ui-services/LoadingService ';
import { LoadingIndicatorComponent } from '../../shared/components/loading-indicator/loading-indicator.component';
@Component({
  selector: 'app-categories',
  imports: [
    CategoriesFilterComponent,
    BooksListComponent,
    LoadingIndicatorComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  loadingService: ILoadingService;

  books: Book[] = [];
  categories: Category[] = [];
  filter: BehaviorSubject<BooksFilter> = new BehaviorSubject<BooksFilter>({});
  loading: boolean = false;
  constructor(
    @Inject(BooksUiDataService) booksUiDataService: IBooksUiDataService,
    @Inject(CategoriesService) categoriesService: ICategoriesService,
    @Inject(LoadingService) loadingService: ILoadingService
  ) {
    this.loadingService = loadingService;

    categoriesService
      .getCategories()
      .subscribe((authors: Category[]) => (this.categories = authors));

    this.filter
      .pipe(
        switchMap((filter: BooksFilter) => {
          this.loading = this.loadingService.loadingOn();
          return booksUiDataService.booksPageData(filter);
        })
      )
      .subscribe((books: Book[]) => {
        this.loading = this.loadingService.loadingOff();
        this.books = books;
      });
  }

  onFilterChange(filter: BooksFilter): void {
    this.filter.next({ ...filter });
  }
}
