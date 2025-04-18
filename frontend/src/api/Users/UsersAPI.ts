import axios from "axios";
import { CreateUser, User } from "./types";
import { userRoute } from "../endpoints";
import { Response } from "../types";
import { authHeader } from "../../config/token";

export class UsersAPI{

    static create = async (values:CreateUser):Promise<Response> =>{
        const response = await axios.post(userRoute.create, values, authHeader());
        return response.data;
    }

    static getAll = async ():Promise<User[]> =>{
        const response = await axios.get(userRoute.getAll, authHeader());
        return response.data;
    }

    static delete = async (id:number):Promise<Response> =>{
        const response = await axios.delete(`${userRoute.delete}${id}`, authHeader());
        return response.data
    }
}