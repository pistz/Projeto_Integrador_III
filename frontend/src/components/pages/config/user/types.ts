export type CreateUserForm = {
    name:string;
    email: string;
    password: string;
};

export type ListUsers = {
    id:number;
    name:string;
    email:string;
}