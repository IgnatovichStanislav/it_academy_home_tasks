import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { BooksFilter } from '../../../core/models/books/BooksFilter';
import { StringInputComponent } from '../../../shared/components/string-input/string-input.component';
import { TogglerComponent } from '../../../shared/components/toggler/toggler.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { selectListItem } from '../../../core/models/selectListItem';
import { AuthorsService } from '../../../core/services/AuthorsService';
import { Author } from '../../../core/models/authors/Author';
import { NgIf } from '@angular/common';
import { User } from '../../../core/models/user';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { switchMap } from 'rxjs/internal/operators/switchMap';
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
export class BooksFilterComponent implements OnInit {
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

  ngOnInit(): void {}

  onSeachInput(value: string): void {
    this.search.emit(value);
  }

  onShowFavoritesChange(value: boolean): void {
    //Question: Should I create copy of this.filter.value change prop and next()
    // or i can change prop directly in observable?

    // const filter = { ...this.filter.value };
    // filter.showFavorites = value;
    // this.filter.next(filter);

    this.filter.value.showFavorites = value;
    this.filter.next(this.filter.value);
  }

  onSortChange(value: selectListItem | undefined): void {
    this.filter.value.sortBy =
      value && value.value ? String(value.value) : undefined;
    this.filter.next(this.filter.value);
  }

  onAuthorsChange(value: selectListItem | undefined): void {
    this.filter.value.author = value?.value ? Number(value.value) : undefined;
    this.filter.next(this.filter.value);
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
