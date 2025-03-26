import React, { createContext, useCallback, useEffect, useState } from 'react';
import { AppContextType, IChildren, ProductOptions } from './types';
import { BrandAPI } from '../api/Brand/BrandAPI';
import { CategoryAPI } from '../api/Category/CategoryAPI';
import { notifyError } from '../components/shared/notify/notify';


const AppContext = createContext<AppContextType>({} as AppContextType);

const defaultProductOptions:ProductOptions = {
    brands:[],
    categories:[]
}

export const ContextProvider: React.FC<IChildren> = ({ children }:IChildren) => {

    const [signed, setSigned] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    const [expired, setExpired] = useState<boolean>(false);

    const [productOptions, setProductOptions] = useState<ProductOptions>(defaultProductOptions);
    const [isFetchingOptions, setIsFetchingOptions] = useState(false);

    const getAllBrands = useCallback(async () =>{
        return await BrandAPI.getAll();
    }, []);
    
    const getAllCategories = useCallback(async () =>{
        return await CategoryAPI.getAll();
    }, []);

    const loadProductOptions = useCallback(async () =>{
        setIsFetchingOptions(true);
        try{
            const [brands, categories] = await Promise.all([
                getAllBrands(), 
                getAllCategories()
            ]);
            setProductOptions({brands, categories})
        }catch(error){
            notifyError(error);
        }finally{
            setIsFetchingOptions(false);
        }
    },[getAllBrands, getAllCategories]);

    useEffect(() =>{
        loadProductOptions()
    }, [loadProductOptions]);


    return (
    <AppContext.Provider value={{ 
        signed,setSigned,
        token, setToken,
        expired, setExpired,
        productOptions,
        isFetchingOptions

        }}>
        {children}
    </AppContext.Provider>
    );
};

export default AppContext;