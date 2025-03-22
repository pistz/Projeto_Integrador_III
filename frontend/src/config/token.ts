import { jwtDecode, JwtPayload } from "jwt-decode";

export const getTokenFromSessionStorage = ():string =>{
    const token_id = getTokenId();
    const getToken = sessionStorage.getItem(token_id);
    let token = ""
    if(getToken){
        token = JSON.parse(getToken);
    
    }
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
    if(token === undefined){
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