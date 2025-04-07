import { Component, Inject, Input } from '@angular/core';
import { of } from 'rxjs';
import { Book } from '../../../core/models/books/Book';
import { NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';
import { User } from '../../../core/models/user';
import { getUser } from '../../../core/helpers/userHelper';
import { ButtonComponent } from '../../../shared/components/buttons/button.component';
import { switchMap, tap } from 'rxjs';
import { FavoritesService } from '../../../core/services/FavoritesService';
import { FavoriteBook } from '../../../core/models/favoriteBook/FavoriteBook';
import { IFavoritesService } from '../../../core/services/contracts/IFavoritesService';

@Component({
  selector: 'app-book-card',
  imports: [NgIf, DatePipe, ButtonComponent],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  @Input() book!: Book;
  @Input() showCategory: boolean = false;
  currentUser: User | null = null;
  favoritesService: IFavoritesService;

  constructor(@Inject(FavoritesService) favoritesService: IFavoritesService) {
    this.favoritesService = favoritesService;
    this.currentUser = getUser();
  }

  onSetFavorites(event: Event, isFavorite: boolean): void {
    if (this.book && this.currentUser?.id !== undefined) {
      if (isFavorite) {
        this.favoritesService
          .post({ bookId: this.book.id, accountId: this.currentUser.id })
          .subscribe({
            next: (v) => (this.book.favorite = v),
            error: (err) => {
              console.error('Error adding favorite:', err);
            },
          });
      } else {
        this.favoritesService
          .deleteByBookUser({
            bookId: this.book.id,
            accountId: this.currentUser.id,
          } as FavoriteBook)
          .subscribe({
            next: (v) => (this.book.favorite = undefined),
          });
      }
    }
  }
}
