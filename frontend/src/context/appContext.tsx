import React, { createContext, useState } from 'react';
import { AppContextType, IChildren } from './types';


const AppContext = createContext<AppContextType>({} as AppContextType);

export const ContextProvider: React.FC<IChildren> = ({ children }:IChildren) => {

    const [signed, setSigned] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    const [expired, setExpired] = useState<boolean>(false);


    return (
    <AppContext.Provider value={{ 
        signed,setSigned,
        token, setToken,
        expired, setExpired

        }}>
        {children}
    </AppContext.Provider>
    );
};

export default AppContext;