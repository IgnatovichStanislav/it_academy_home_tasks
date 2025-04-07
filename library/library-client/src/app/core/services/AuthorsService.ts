import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../config';
import { ApiPaths } from '../api-paths';
import { Author } from '../models/authors/Author';
import { IAuthorsService } from './contracts/IAuthorsService';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService implements IAuthorsService {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  getById(ids: number[]): Observable<Author[]> {
    const url = `${environment.baseApiUrl}${ApiPaths.AuthorsGetByIds}`;
    let params = new HttpParams({ fromObject: { ids } });
    return this.http.get<Author[]>(url, { params });
  }
  getAuthors(): Observable<Author[]> {
    const url = `${environment.baseApiUrl}${ApiPaths.AuthorsGetAll}`;
    return this.http.get<Author[]>(url);
  }
}
