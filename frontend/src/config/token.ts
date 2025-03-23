import { jwtDecode, JwtPayload } from "jwt-decode";

interface JwtCustomPayload extends JwtPayload{
    user:string,
    name:string,
}

export const getTokenFromSessionStorage = ():string =>{
    const token_id = getTokenId();
    const getToken = () =>{
        return sessionStorage.getItem(token_id);
    }
    let token = ""
    token = getToken()!;
    return token;
}

export const authHeader = () => {
    const token:string = getTokenFromSessionStorage();
    return {
        headers: {
            Authorization: "Bearer " + token,
        },
    };
};

export const getTokenId = () =>{
    const tokenId:string = String(process.env.TOKEN_ID);
    return tokenId;
}

export const isTokenExpired = () =>{
    const token = getTokenFromSessionStorage();
    if(token === undefined || token === null){
        return true;
    }
    if(token){
        const decoded = jwtDecode<JwtPayload>(token)
        const expired:number = Number(decoded.exp);
        const currentTime = Date.now() / 1000

        if(expired < currentTime){
            return true;
        }
    }
    return false;
}

export const getUserFromToken = ():JwtCustomPayload|undefined =>{
    const token = getTokenFromSessionStorage();
    let user = undefined;
    if(token === undefined || token === null){
        return;
    }
    if(token){
        const decoded = jwtDecode<JwtCustomPayload>(token)
        user = decoded
    }
    return user;
}