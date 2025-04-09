import { FavoriteBook } from '../../models/favoriteBook/FavoriteBook';
import { Observable } from 'rxjs';

export interface IFavoritesService {
  getBooksByCurrentUser(): Observable<FavoriteBook[]>;
  deleteByBookUser(favoriteBook: FavoriteBook): Observable<boolean>;
  post(favoriteBook: FavoriteBook): Observable<FavoriteBook>;
}
