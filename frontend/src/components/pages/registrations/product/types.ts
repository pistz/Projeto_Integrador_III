import { CreateProduct as ProductApiType } from '../../../../api/Product/types';

export interface Product extends ProductApiType {}
export interface ProductId extends Product {
  id: number;
}
