import { Update } from '../types';

export interface CreateProduct {
  name: string;
  description: string;
  brand_id: number;
  category_id: number;
  has_pack: boolean;
  pack_value: number;
}

export interface Product extends CreateProduct {
  id: number;
}

export interface ProductMovement {
  product_id: number;
  movement_type: string;
  movement_source: string;
  quantity: number;
  created_by: string;
  observations?: string;
}

export type UpdateProduct = Update & { description: string };
