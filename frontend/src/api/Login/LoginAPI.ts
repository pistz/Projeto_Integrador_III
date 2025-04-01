import axios from 'axios';
import { loginRoute } from '../endpoints';
import { LoginData, Token } from './types';

export class LoginAPI {
  static login = async (data: LoginData): Promise<Token> => {
    const response = await axios.post<Token>(loginRoute.login, data);
    return response.data;
  };
}
