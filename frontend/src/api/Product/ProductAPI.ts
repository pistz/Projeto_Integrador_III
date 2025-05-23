import axios from 'axios';
import { authHeader } from '../../config/token';
import { productRoute } from '../endpoints';
import { Response } from '../types';
import { CreateProduct, Product, UpdateProduct } from './types';

export class ProductAPI {
  static create = async (product: CreateProduct): Promise<Response> => {
    const response = await axios.post(
      productRoute.create,
      product,
      authHeader(),
    );
    return response.data;
  };

  static getAll = async (): Promise<Product[]> => {
    const response = await axios.get(productRoute.getAll, authHeader());
    return response.data;
  };

  static getByBarcode = async (barcode: string): Promise<Product> => {
    const response = await axios.get(
      `${productRoute.getByBarcode}=${barcode}`,
      authHeader(),
    );
    return response.data;
  };

  static delete = async (id: number): Promise<Response> => {
    const response = await axios.delete(
      `${productRoute.delete}/${id}`,
      authHeader(),
    );
    return response.data;
  };

  static update = async (
    id: number,
    request: UpdateProduct,
  ): Promise<Response> => {
    const response = await axios.put(
      `${productRoute.update}/${id}`,
      request,
      authHeader(),
    );
    return response.data;
  };
}
