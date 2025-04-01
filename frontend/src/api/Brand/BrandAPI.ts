import axios from 'axios';
import { authHeader } from '../../config/token';
import { brandRoute } from '../endpoints';
import { Response, Update } from '../types';
import { Brand } from './types';

export class BrandAPI {
  static create = async (name: string): Promise<Response> => {
    const response = await axios.post(
      `${brandRoute.create}`,
      name,
      authHeader(),
    );
    return response.data;
  };

  static getAll = async (): Promise<Brand[]> => {
    const response = await axios.get(`${brandRoute.getAll}`, authHeader());
    return response.data;
  };

  static delete = async (id: number): Promise<Response> => {
    const response = await axios.delete(
      `${brandRoute.delete}/${id}`,
      authHeader(),
    );
    return response.data;
  };

  static update = async (id: number, request: Update): Promise<Response> => {
    const response = await axios.put(
      `${brandRoute.update}/${id}`,
      request,
      authHeader(),
    );
    return response.data;
  };
}
