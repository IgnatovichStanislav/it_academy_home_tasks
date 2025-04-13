import { Routes } from '@angular/router';
import { SigninComponent } from './feature/auth/signin/signin.component';
import { SignupComponent } from './feature/auth/signup/signup.component';
import { BooksComponent } from './feature/books/books.component';
import { LayoutComponent } from './layout/layout.component';
import { CategoriesComponent } from './feature/categories/categories.component';
import { EditBookComponent } from './feature/books/edit-book/edit-book.component';
import { AuthGuard } from './core/guards/AuthGuard';
export const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'categories',
    component: LayoutComponent,
    children: [{ path: '', component: CategoriesComponent }],
  },
  {
    path: 'books/add',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: EditBookComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'books',
    component: LayoutComponent,
    children: [{ path: '', component: BooksComponent }],
  },

  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', component: BooksComponent }],
  },
  { path: '**', redirectTo: '' },
];
