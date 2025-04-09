import { Author } from '../../models/authors/Author';
import { Observable } from 'rxjs';

export interface IAuthorsService {
  getById(ids: number[]): Observable<Author[]>;
  getAuthors(): Observable<Author[]>;
}
