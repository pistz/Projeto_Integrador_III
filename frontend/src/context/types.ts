import { Dispatch, SetStateAction } from "react";

export interface IChildren {
    children: React.ReactNode;
}

export interface AppContextType {
    signed:boolean;
    
    setSigned: Dispatch<SetStateAction<boolean>>;
}