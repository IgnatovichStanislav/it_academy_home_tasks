import { Injectable } from '@angular/core';
import { BooksFilter } from '../models/books/BooksFilter';
import { Observable, tap } from 'rxjs';
import { ApiPaths } from '../api-paths';
import { environment } from '../config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from '../models/books/Book';
import { cleanObjectProperties } from '../extensions/ObjectExtensios';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  getByFilter(filter: BooksFilter): Observable<Book[]> {
    const url = `${environment.baseApiUrl}${ApiPaths.BooksGetByFilter}`;
    const params = new HttpParams({
      fromObject: cleanObjectProperties({ ...filter }),
    });
    return this.http.get<Book[]>(url, { params });
  }

  setFavorite(
    bookId: number,
    currentUserId: number,
    isFavorite: boolean
  ): Observable<any> {
    const url = `${environment.baseApiUrl}${ApiPaths.FavoriteBooksGet}`;
    const body = { bookId, currentUserId, isFavorite };

    return this.http.post(url, body);
  }
}
