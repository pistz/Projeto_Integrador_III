import {
  CreateProduct,
  Product as ProductApiType,
} from '../../../../api/Product/types';

export interface Product extends CreateProduct {}
export interface ProductId extends ProductApiType {}
