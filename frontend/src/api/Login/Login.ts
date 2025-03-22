import { base } from "../../routes/endpoints";
import { LoginData, Token } from "./types";

export class Login {

    static login = async (data:LoginData):Promise<Token> =>{
        console.log(data)
        console.log(base.host)
        return {token:'abc'} as Token
    }
}