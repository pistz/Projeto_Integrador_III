import axios from 'axios';
import { authHeader } from '../../config/token';
import { barcodeRoute } from '../endpoints';
import { Response } from '../types';
import { Barcode, CreateBarcode, UpdateBarcode } from './types';

export class BarcodeAPI {
  static create = async (barcode: CreateBarcode): Promise<Response> => {
    const response = await axios.post(
      `${barcodeRoute.create}`,
      barcode,
      authHeader(),
    );
    return response.data;
  };

  static delete = async (id: number): Promise<Response> => {
    const response = await axios.delete(
      `${barcodeRoute.delete}/${id}`,
      authHeader(),
    );
    return response.data;
  };

  static update = async (
    id: number,
    request: UpdateBarcode,
  ): Promise<Response> => {
    const response = await axios.put(
      `${barcodeRoute.update}/${id}`,
      request,
      authHeader(),
    );
    return response.data;
  };

  static getBarcodeByProductId = async (
    productId: number,
  ): Promise<Barcode[]> => {
    const response = await axios.get(
      `${barcodeRoute.getBarcodeByProductId(productId)}`,
      authHeader(),
    );
    return response.data;
  };
}
