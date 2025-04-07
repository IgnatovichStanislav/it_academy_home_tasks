import { Author } from '../authors/Author';
import { Category } from '../categories/Category';
import { FavoriteBook } from '../favoriteBook/FavoriteBook';

export type Book = {
  id: number;
  title: string;
  pixUrl: string;
  authorId?: number;
  categoryId?: number;
  publicationDate?: Date;
  author?: Author;
  category?: Category;
  favorite?: FavoriteBook;
};
