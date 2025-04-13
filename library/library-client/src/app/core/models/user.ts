import { RoleEnum } from '../enums/RoleEnum';

export type User = {
  userName: string;
  firstName: string;
  lastName: string;
  id: number;
  role: RoleEnum;
};
