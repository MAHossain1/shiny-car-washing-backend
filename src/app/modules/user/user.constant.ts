import { TRole } from './user.interface';

export const Roles: TRole[] = ['admin', 'user'];

export const USER_ROLE = {
  admin: 'admin',
  user: 'user',
} as const;

export const userSearchFields = ['role', 'address', 'phone', 'name'];
