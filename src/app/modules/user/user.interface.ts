export type TRole = 'admin' | 'user';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TUser = {
  name: TUserName;
  email: string;
  password: string;
  phone: string;
  role: TRole;
  address: string;
};
