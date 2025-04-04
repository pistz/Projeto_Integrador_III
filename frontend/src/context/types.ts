import { Dispatch, SetStateAction } from 'react';
import { Brand } from '../api/Brand/types';
import { Category } from '../api/Category/types';

export interface IChildren {
  children: React.ReactNode;
}

export interface AppContextType {
  signed: boolean;
  setSigned: Dispatch<SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  expired: boolean;
  setExpired: Dispatch<SetStateAction<boolean>>;

  productOptions: ProductOptions;
  isFetchingOptions: boolean;
  productsList: Product[];
  setReload: React.Dispatch<React.SetStateAction<number>>;
}
export interface ProductOptions {
  brands: Brand[];
  categories: Category[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  brand_id: number;
  category_id: number;
}
