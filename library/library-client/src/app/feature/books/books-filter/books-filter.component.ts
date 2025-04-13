import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgIf } from '@angular/common';

import { BooksFilter } from '../../../core/models/books/BooksFilter';
import { StringInputComponent } from '../../../shared/components/string-input/string-input.component';
import { TogglerComponent } from '../../../shared/components/toggler/toggler.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { selectListItem } from '../../../core/models/selectListItem';
import { Author } from '../../../core/models/authors/Author';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/UserService';
import { IUserService } from '../../../core/services/contracts/IUserService';
import { CurrentUserDirective } from '../../../shared/directives/currentUser.directive';
@Component({
  selector: 'app-books-filter',
  imports: [
    StringInputComponent,
    TogglerComponent,
    SelectComponent,
    NgIf,
    CurrentUserDirective,
  ],
  templateUrl: './books-filter.component.html',
})
export class BooksFilterComponent implements OnChanges {
  @Input() authors: Author[] = [];
  @Input() filter: BooksFilter = {};
  @Input() search: string = '';
  @Output() onSearchChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onFilterChange: EventEmitter<BooksFilter> =
    new EventEmitter<BooksFilter>();

  authorOptions: selectListItem[] = [];
  sortOptions: selectListItem[] = [
    { text: 'Title', value: 'title' },
    { text: 'Date', value: 'publicationDate' },
  ];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['authors'] && changes['authors'].currentValue.length) {
      this.authorOptions = this.authors.map<selectListItem>(
        (author: Author) => {
          return {
            text: author.name,
            value: author.id,
            selected: author.id === this.filter.author,
          };
        }
      );
    }
  }

  onSeachInput(value: string): void {
    this.onSearchChange.emit(value);
  }

  onShowFavoritesChange(value: boolean): void {
    this.onFilterChange.emit({ ...this.filter, showFavorites: value });
  }

  onSortChange(value: selectListItem | undefined): void {
    this.onFilterChange.emit({
      ...this.filter,
      sortBy: value && value.value ? value.value.toString() : undefined,
    });
  }

  onAuthorsChange(value: selectListItem | undefined): void {
    this.onFilterChange.emit({
      ...this.filter,
      author: value?.value ? +value.value : undefined,
    });
  }
}
