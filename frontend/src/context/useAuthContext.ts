import { useContext } from "react"
import AppContext from "./appContext"

export const useAuth =()=>{
    const context = useContext(AppContext);
    return context;
}