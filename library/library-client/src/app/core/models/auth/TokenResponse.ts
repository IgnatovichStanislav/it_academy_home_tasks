import { User } from '../user';

export type TokenResponse = {
  authToken: string;
  user: User;
};
