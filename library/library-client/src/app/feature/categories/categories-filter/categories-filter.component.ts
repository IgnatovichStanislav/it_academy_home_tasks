import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';

import { BooksFilter } from '../../../core/models/books/BooksFilter';
import { Category } from '../../../core/models/categories/Category';
import { CategoryCardComponent } from '../../../shared/components/cards/category-card/category-card.component';

@Component({
  selector: 'app-categories-filter',
  imports: [CategoryCardComponent, NgFor],
  templateUrl: './categories-filter.component.html',
  styleUrl: './categories-filter.component.scss',
})
export class CategoriesFilterComponent {
  @Input() categories: Category[] = [];
  @Output() onFilterChange: EventEmitter<BooksFilter> =
    new EventEmitter<BooksFilter>();

  selectedCategory: Category | undefined = undefined;

  constructor() {}

  onCategorySelect(category: Category | undefined): void {
    this.selectedCategory = category;
    this.onFilterChange.emit({
      categoryId: category?.id,
    });
  }
}
