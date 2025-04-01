import axios from 'axios';
import { authHeader } from '../../config/token';
import { categoryRoute } from '../endpoints';
import { Response } from '../types';
import { Category } from './types';

export class CategoryAPI {
  static create = async (name: string): Promise<Response> => {
    const response = await axios.post(categoryRoute.create, name, authHeader());
    return response.data;
  };

  static getAll = async (): Promise<Category[]> => {
    const response = await axios.get(categoryRoute.getAll, authHeader());
    return response.data;
  };

  static delete = async (id: number): Promise<Response> => {
    const response = await axios.delete(
      `${categoryRoute.delete}/${id}`,
      authHeader(),
    );
    return response.data;
  };

  static update = async (id: number, request: string): Promise<Response> => {
    const body = { name: request };
    const response = await axios.put(`${categoryRoute.update}/${id}`, body);
    return response.data;
  };
}
