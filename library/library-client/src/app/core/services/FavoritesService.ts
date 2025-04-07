import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../config';
import { ApiPaths } from '../api-paths';
import { FavoriteBook } from '../models/favoriteBook/FavoriteBook';
import { IFavoritesService } from './contracts/IFavoritesService';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService implements IFavoritesService {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  getBooksByCurrentUser(): Observable<FavoriteBook[]> {
    const url = `${environment.baseApiUrl}${ApiPaths.FavoriteBooksGet}`;
    return this.http.get<FavoriteBook[]>(url);
  }

  deleteByBookUser(favoriteBook: FavoriteBook): Observable<boolean> {
    const url = `${environment.baseApiUrl}${ApiPaths.FavoriteBooksDelete}`;
    const body = { ...favoriteBook };
    return this.http.delete<boolean>(url, { body });
  }

  post(favoriteBook: FavoriteBook): Observable<FavoriteBook> {
    const url = `${environment.baseApiUrl}${ApiPaths.FavoriteBooksPost}`;
    return this.http.post<FavoriteBook>(url, { ...favoriteBook });
  }
}
