import axios from 'axios';
import { loginRoute } from '../endpoints';
import { Response } from '../types';
import { LoginData, PasswordResetData, Token } from './types';

export class LoginAPI {
  static login = async (data: LoginData): Promise<Token> => {
    const response = await axios.post<Token>(loginRoute.login, data);
    return response.data;
  };

  static resetPassword = async (data: PasswordResetData): Promise<Response> => {
    const response = await axios.put<Response>(loginRoute.resetPassword, data);
    return response.data;
  };
}
