import { User } from '../models/user';

export const getUser = function () {
  const user = sessionStorage.getItem('user');
  if (user) {
    let parsedUser: User = JSON.parse(user);
    return parsedUser;
  }
  return null;
};
