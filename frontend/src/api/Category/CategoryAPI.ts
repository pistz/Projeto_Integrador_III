import axios from "axios";
import { Response } from "../types";
import { categoryRoute } from "../endpoints";
import { Category } from "./types";

export class CategoryAPI{

    static create = async (name:string):Promise<Response> =>{
        const response = await axios.post(categoryRoute.create, name);
        return response.data;
    }

    static getAll = async ():Promise<Category[]> =>{
        const response = await axios.get(categoryRoute.getAll);
        return response.data;
    }

    static delete = async (id:number):Promise<Response> =>{
        const response = await axios.delete(`${categoryRoute.delete}/${id}`);
        return response.data;
    }

    //TODO
    static update = async (body:any):Promise<Response> =>{
        const response = await axios.put('/', body);
        return response.data
    }
}