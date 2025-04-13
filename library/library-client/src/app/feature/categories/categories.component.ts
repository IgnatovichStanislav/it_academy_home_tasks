import { Component, inject, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { switchMap } from 'rxjs/internal/operators/switchMap';

import { Book } from '../../core/models/books/Book';
import { Category } from '../../core/models/categories/Category';
import { BooksUiDataService } from '../../core/ui-data-services/BooksUiDataService';
import { IBooksUiDataService } from '../../core/ui-data-services/contracts/IBooksUiDataService';
import { ICategoriesService } from '../../core/services/contracts/ICategoriesService';
import { CategoriesService } from '../../core/services/CategoriesService';
import { BooksFilter } from '../../core/models/books/BooksFilter';
import { ILoadingService } from '../../core/ui-services/contracts/ILoadingService';
import { LoadingService } from '../../core/ui-services/LoadingService ';
import { LoadingIndicatorComponent } from '../../shared/components/loading-indicator/loading-indicator.component';

import { CategoriesFilterComponent } from './categories-filter/categories-filter.component';
import { BooksListComponent } from '../books/books-list/books-list.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { combineLatest, tap } from 'rxjs';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';

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
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly booksUiDataService = inject(BooksUiDataService);
  private readonly loadingService = inject(LoadingService);
  private readonly categoriesService = inject(CategoriesService);

  books: Book[] = [];
  categories: Category[] = [];
  loading: boolean = true;
  filter: BooksFilter = {};
  categoryId: number | undefined = undefined;

  constructor() {
    this.categoriesService
      .getCategories()
      .subscribe((categories: Category[]) => (this.categories = categories));

    this.activatedRoute.queryParams
      .pipe(
        map((params: Params) => {
          this.categoryId = params['categoryId']
            ? +params['categoryId']
            : undefined;

          return {
            categoryId: this.categoryId,
          };
        })
      )
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

  onFilterChange(filter: BooksFilter): void {
    this.router.navigate([], {
      queryParams: filter,
      queryParamsHandling: 'merge',
    });
  }
}
