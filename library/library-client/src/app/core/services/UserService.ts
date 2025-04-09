import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { IUserService } from './contracts/IUserService';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {
  constructor() {}

  getUser(): User | null {
    const user = sessionStorage.getItem('user');
    if (user) {
      let parsedUser: User = JSON.parse(user);
      return parsedUser;
    }
    return null;
  }

  setUser(user: User | null): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
}
