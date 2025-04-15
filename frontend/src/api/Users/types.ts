export type CreateUser = {
  name: string;
  email: string;
  password: string;
  roles: string;
};

export interface User extends TokenUser {
  id: number;
}

export type TokenUser = {
  name: string;
  email: string;
  roles: string;
};
