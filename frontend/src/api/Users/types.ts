export type CreateUser = {
    name:string,
    email:string,
    password:string
}

export type User = {
    id:number,
    name:string,
    email:string,
}

export type Response = {
    message:string
}