import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BooksFilter } from '../../../core/models/books/BooksFilter';
import { StringInputComponent } from '../../../shared/components/string-input/string-input.component';
import { TogglerComponent } from '../../../shared/components/toggler/toggler.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { selectListItem } from '../../../core/models/selectListItem';
import { AuthorsService } from '../../../core/services/AuthorsService';
import { Author } from '../../../core/models/authors/Author';
import { NgIf } from '@angular/common';
import { getUser } from '../../../core/helpers/userHelper';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-books-filter',
  imports: [StringInputComponent, TogglerComponent, SelectComponent, NgIf],
  templateUrl: './books-filter.component.html',
  styleUrl: './books-filter.component.scss',
})
export class BooksFilterComponent implements OnInit {
  @Output() onChange = new EventEmitter<BooksFilter>();
  @Output() onSearchInput = new EventEmitter<string>();
  currentUser: User | null = null;
  filter: BooksFilter = {};

  sortOptions: selectListItem[] = [
    { text: 'Title', value: 'title' },
    { text: 'Date', value: 'publicationDate' },
  ];

  authorOptions: selectListItem[] = [];

  constructor(private authorsService: AuthorsService) {
    this.authorsService.getAuthors().subscribe((authors) => {
      this.authorOptions = authors.map<selectListItem>(
        (author: Author): selectListItem => {
          return { text: author.name, value: author.id };
        }
      );
    });
  }
  ngOnInit(): void {
    this.currentUser = getUser();
  }

  onSeachInput(value: string): void {
    this.onSearchInput.emit(value);
  }

  onShowFavoritesChange(value: boolean): void {
    this.filter.showFavorites = value;
    this.onChange.emit(this.filter);
  }

  onSortChange(value: selectListItem | undefined): void {
    this.filter.sortBy = value && value.value ? String(value.value) : undefined;
    this.onChange.emit(this.filter);
  }

  onAuthorsChange(value: selectListItem | undefined): void {
    this.filter.author = value?.value ? Number(value.value) : undefined;
    this.onChange.emit(this.filter);
  }
}
