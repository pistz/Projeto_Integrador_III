import { Dispatch, SetStateAction } from "react";

export interface IChildren {
    children: React.ReactNode;
}

export interface AppContextType {
    signed:boolean;
    token:string;
    expired:boolean; 
    
    setToken: Dispatch<SetStateAction<string>>;
    setSigned: Dispatch<SetStateAction<boolean>>;
    setExpired: Dispatch<SetStateAction<boolean>>;
}