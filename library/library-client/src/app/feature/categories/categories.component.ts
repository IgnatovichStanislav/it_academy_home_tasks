import { Component } from '@angular/core';
import { BookCardComponent } from '../../shared/components/cards/book-card/book-card.component';
import { Book } from '../../core/models/books/Book';
import { CategoriesFilterComponent } from './categories-filter/categories-filter.component';
import { NgFor, NgStyle } from '@angular/common';
@Component({
  selector: 'app-categories',
  imports: [BookCardComponent, CategoriesFilterComponent, NgFor, NgStyle],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  books: Book[] = [];

  constructor() {}

  onBooksUpdate(books: Book[]): void {
    this.books = books;
  }
}
