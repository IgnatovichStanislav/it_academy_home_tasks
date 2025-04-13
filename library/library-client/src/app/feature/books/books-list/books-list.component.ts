import { Component, Input } from '@angular/core';
import { BookCardComponent } from '../../../shared/components/cards/book-card/book-card.component';
import { Book } from '../../../core/models/books/Book';
import { NgFor } from '@angular/common';
import { BooksClientSideFilterPipe } from '../../../shared/pipes/books-client-side-filter.pipe';

@Component({
  selector: 'app-books-list',
  imports: [BookCardComponent, NgFor, BooksClientSideFilterPipe],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
})
export class BooksListComponent {
  @Input() books: Book[] = [];
  @Input() search: string = '';
}
