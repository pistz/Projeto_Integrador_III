import React, { createContext, useCallback, useEffect, useState } from 'react';
import { BrandAPI } from '../api/Brand/BrandAPI';
import { CategoryAPI } from '../api/Category/CategoryAPI';
import { ProductAPI } from '../api/Product/ProductAPI';
import { notifyError } from '../components/shared/notify/notify';
import { getUserFromToken } from '../config/token';
import {
  AppContextType,
  IChildren,
  Product,
  ProductOptions,
  TokenUser,
} from './types';

const AppContext = createContext<AppContextType>({} as AppContextType);

const defaultProductOptions: ProductOptions = {
  brands: [],
  categories: [],
};

const defaultProductsList: Product[] = [];

export const ContextProvider: React.FC<IChildren> = ({
  children,
}: IChildren) => {
  const [signed, setSigned] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [expired, setExpired] = useState<boolean>(false);
  const [tokenUser, setTokenUser] = useState<TokenUser | null>(null);

  const [productOptions, setProductOptions] = useState<ProductOptions>(
    defaultProductOptions,
  );
  const [productsList, setProductsList] =
    useState<Product[]>(defaultProductsList);
  const [isFetchingOptions, setIsFetchingOptions] = useState(false);

  const [reload, setReload] = useState<number>(1);

  const getAllBrands = useCallback(async () => {
    return await BrandAPI.getAll();
  }, []);

  const getAllCategories = useCallback(async () => {
    return await CategoryAPI.getAll();
  }, []);

  const getAllProducts = useCallback(async () => {
    return await ProductAPI.getAll();
  }, []);

  const loadProductOptions = useCallback(async () => {
    setIsFetchingOptions(true);
    try {
      const [brands, categories, products] = await Promise.all([
        getAllBrands(),
        getAllCategories(),
        getAllProducts(),
      ]);
      setProductOptions({ brands, categories });
      setProductsList(products);
    } catch (error) {
      notifyError(error);
    } finally {
      setIsFetchingOptions(false);
    }
  }, [getAllBrands, getAllCategories, getAllProducts]);

  useEffect(() => {
    if (signed && token) {
      loadProductOptions();
    }
  }, [signed, token, reload, loadProductOptions]);

  const loadTokenUser = useCallback(() => {
    if (!token) return;
    const retrievedUser = getUserFromToken();
    if (retrievedUser) {
      setTokenUser({ name: retrievedUser.name, email: retrievedUser.user });
    }
  }, [token]);

  useEffect(() => {
    loadTokenUser();
  }, [loadTokenUser]);

  return (
    <AppContext.Provider
      value={{
        signed,
        setSigned,
        token,
        setToken,
        expired,
        setExpired,
        productOptions,
        isFetchingOptions,
        productsList,
        setReload,
        tokenUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
