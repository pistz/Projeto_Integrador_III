export interface Token {
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface PasswordResetData {
  email: string;
  password: string;
  new_password: string;
}

export enum Roles {
  ADMIN = 'admin',
  REGISTER_ONLY = 'register_only',
  REPORT_ONLY = 'report_only',
}

export enum RolesPt {
  ADMIN = 'Administrador',
  REGISTER_ONLY = 'Cadastros',
  REPORT_ONLY = 'Relatórios',
}

export const rolesList = Object.entries(Roles).map(([key, value]) => ({
  label: RolesPt[key as keyof typeof RolesPt],
  value: value,
}));
