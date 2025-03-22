import { Login } from "../api/Login/Login"
import { LoginData, Token } from "../api/Login/types";

export const login = async (data:LoginData) =>{
    const {token}:Token = await Login.login(data)
    return token;
}