import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/categories/Category';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../config';
import { ApiPaths } from '../api-paths';
import { ICategoriesService } from './contracts/ICategoriesService';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService implements ICategoriesService {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }
  getAll(): Observable<Category[]> {
    const url = `${environment.baseApiUrl}${ApiPaths.CategoriesGetAll}`;
    return this.http.get<Category[]>(url);
  }

  getById(ids: number[]): Observable<Category[]> {
    const url = `${environment.baseApiUrl}${ApiPaths.CategoriesGetByIds}`;
    let params = new HttpParams({ fromObject: { ids } });
    return this.http.get<Category[]>(url, { params });
  }
}
