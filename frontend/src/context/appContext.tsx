import React, { createContext, useState } from 'react';
import { AppContextType, IChildren } from './types';


const AppContext = createContext<AppContextType>({} as AppContextType);

export const ContextProvider: React.FC<IChildren> = ({ children }:IChildren) => {

    const [signed, setSigned] = useState<boolean>(false);


    return (
    
    <AppContext.Provider value={{ 
        signed,setSigned,

        }}>
        {children}
    </AppContext.Provider>
    );
};

export default AppContext;