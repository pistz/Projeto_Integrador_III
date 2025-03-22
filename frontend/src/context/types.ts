import { Dispatch, SetStateAction } from "react";

export interface IChildren {
    children: React.ReactNode;
}

export interface AppContextType {
    signed:boolean;
    token:string, 
    
    setToken: Dispatch<SetStateAction<string>>
    setSigned: Dispatch<SetStateAction<boolean>>;
}