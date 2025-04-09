import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { NgIf } from '@angular/common';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { switchMap } from 'rxjs/internal/operators/switchMap';

import { BooksFilter } from '../../../core/models/books/BooksFilter';
import { StringInputComponent } from '../../../shared/components/string-input/string-input.component';
import { TogglerComponent } from '../../../shared/components/toggler/toggler.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { selectListItem } from '../../../core/models/selectListItem';
import { AuthorsService } from '../../../core/services/AuthorsService';
import { Author } from '../../../core/models/authors/Author';
import { User } from '../../../core/models/user';
import { BooksUiDataService } from '../../../core/ui-data-services/BooksUiDataService';
import { Book } from '../../../core/models/books/Book';
import { IAuthorsService } from '../../../core/services/contracts/IAuthorsService';
import { IBooksUiDataService } from '../../../core/ui-data-services/contracts/IBooksUiDataService';
import { UserService } from '../../../core/services/UserService';
import { IUserService } from '../../../core/services/contracts/IUserService';

@Component({
  selector: 'app-books-filter',
  imports: [StringInputComponent, TogglerComponent, SelectComponent, NgIf],
  templateUrl: './books-filter.component.html',
  styleUrl: './books-filter.component.scss',
})
export class BooksFilterComponent {
  @Output() books: EventEmitter<Book[]> = new EventEmitter<Book[]>();
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  filter = new BehaviorSubject<BooksFilter>({});
  authorsService: IAuthorsService;
  currentUser: User | null = null;

  sortOptions: selectListItem[] = [
    { text: 'Title', value: 'title' },
    { text: 'Date', value: 'publicationDate' },
  ];

  authorOptions: selectListItem[] = [];

  constructor(
    @Inject(AuthorsService) authorsService: IAuthorsService,
    @Inject(BooksUiDataService) booksUiDataService: IBooksUiDataService,
    @Inject(UserService) userService: IUserService
  ) {
    this.authorsService = authorsService;

    this.currentUser = userService.getUser();
    this.setAuthorOptions();

    this.filter
      .pipe(
        switchMap((filter: BooksFilter) =>
          booksUiDataService.booksPageData(filter)
        )
      )
      .subscribe((books: Book[]) => {
        this.books.emit(books);
      });
  }

  onSeachInput(value: string): void {
    this.search.emit(value);
  }

  onShowFavoritesChange(value: boolean): void {
    const currentFilter = this.filter.value;
    this.filter.next({ ...currentFilter, showFavorites: value });
  }

  onSortChange(value: selectListItem | undefined): void {
    const currentFilter = this.filter.value;

    this.filter.next({
      ...currentFilter,
      sortBy: value && value.value ? value.value.toString() : undefined,
    });
  }

  onAuthorsChange(value: selectListItem | undefined): void {
    const currentFilter = this.filter.value;
    this.filter.next({
      ...currentFilter,
      author: value?.value ? +value.value : undefined,
    });
  }

  setAuthorOptions() {
    this.authorsService.getAuthors().subscribe((authors) => {
      this.authorOptions = authors.map<selectListItem>(
        (author: Author): selectListItem => {
          return { text: author.name, value: author.id };
        }
      );
    });
  }
}
