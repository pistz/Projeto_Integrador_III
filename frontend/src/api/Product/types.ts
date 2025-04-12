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

export type UpdateProduct = Update & { description: string };
