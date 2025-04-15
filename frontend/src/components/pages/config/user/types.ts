export type CreateUserForm = {
  name: string;
  email: string;
  password: string;
};

export interface ListUsers extends TokenUser {
  id: number;
}

export type TokenUser = {
  name: string;
  email: string;
};
