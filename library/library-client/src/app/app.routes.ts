import { Routes } from '@angular/router';
import { SigninComponent } from './feature/auth/signin/signin.component';
import { SignupComponent } from './feature/auth/signup/signup.component';

export const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' },
];
