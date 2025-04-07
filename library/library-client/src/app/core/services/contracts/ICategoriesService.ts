import { Category } from '../../models/categories/Category';
import { Observable } from 'rxjs';

export interface ICategoriesService {
  getById(ids: number[]): Observable<Category[]>;
}
