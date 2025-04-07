import { AuthenticationService } from './services/AuthenticationService';
import { AuthorsService } from './services/AuthorsService';
import { BooksService } from './services/BooksService';
import { CategoriesService } from './services/CategoriesService';
import { FavoritesService } from './services/FavoritesService';
import { UserService } from './services/UserService';
import { BooksUiDataService } from './ui-data-services/BooksUiDataService';

export const provideIoC = function () {
  return [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IAuthenticationService', useClass: AuthenticationService },
    { provide: 'IAuthorsService', useClass: AuthorsService },
    { provide: 'IBooksService', useClass: BooksService },
    { provide: 'ICategoriesService', useClass: CategoriesService },
    { provide: 'IFavoritesService', useClass: FavoritesService },
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IBooksUiDataService', useClass: BooksUiDataService },
  ];
};
