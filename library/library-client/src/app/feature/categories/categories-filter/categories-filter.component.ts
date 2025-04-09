import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Book } from '../../../core/models/books/Book';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CatalogFilter } from '../../../core/models/books/BooksFilter';
import { BooksUiDataService } from '../../../core/ui-data-services/BooksUiDataService';
import { IBooksUiDataService } from '../../../core/ui-data-services/contracts/IBooksUiDataService';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { ICategoriesService } from '../../../core/services/contracts/ICategoriesService';
import { CategoriesService } from '../../../core/services/CategoriesService';
import { Category } from '../../../core/models/categories/Category';
import { CategoryCardComponent } from '../../../shared/components/cards/category-card/category-card.component';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-categories-filter',
  imports: [CategoryCardComponent, NgFor],
  templateUrl: './categories-filter.component.html',
  styleUrl: './categories-filter.component.scss',
})
export class CategoriesFilterComponent implements OnInit {
  categoriesService: ICategoriesService;
  @Output() books: EventEmitter<Book[]> = new EventEmitter<Book[]>();
  filter = new BehaviorSubject<CatalogFilter>({});
  categories: Category[] = [];
  selectedCategory: Category | undefined = undefined;
  constructor(
    @Inject(BooksUiDataService) booksUiDataService: IBooksUiDataService,
    @Inject(CategoriesService) categoriesService: ICategoriesService
  ) {
    this.categoriesService = categoriesService;

    this.filter
      .pipe(
        switchMap((filter: CatalogFilter) =>
          booksUiDataService.booksPageData(filter)
        )
      )
      .subscribe((books: Book[]) => {
        this.books.emit(books);
      });
  }
  ngOnInit(): void {
    this.setCategories();
  }

  onCategoryClick(event: Event): void {
    let categoryId = 0;
    this.filter.value.categoryId = categoryId;
    this.filter.next(this.filter.value);
  }

  setCategories() {
    this.categoriesService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onCategorySelect(category: Category | undefined): void {
    this.filter.value.categoryId = category?.id;
    this.selectedCategory = category;
    this.filter.next(this.filter.value);
  }
}
