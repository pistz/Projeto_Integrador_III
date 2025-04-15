import { Dispatch, SetStateAction } from 'react';
import { Brand } from '../api/Brand/types';
import { Category } from '../api/Category/types';
import { Product as ProductApiType } from '../api/Product/types';
import { TokenUser as TokenUserType } from '../components/pages/config/user/types';

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
  tokenUser: TokenUser | null;
}
export interface ProductOptions {
  brands: Brand[];
  categories: Category[];
}

export interface Product extends ProductApiType {}
export interface TokenUser extends TokenUserType {}
