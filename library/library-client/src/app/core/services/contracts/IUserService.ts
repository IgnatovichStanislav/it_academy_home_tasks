import { User } from '../../models/user';

export interface IUserService {
  getUser(): User | null;
  setUser(user: User | null): void;
}
