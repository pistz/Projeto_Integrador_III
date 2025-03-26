import axios from "axios";
import { Response } from "../types";
import { CreateProduct, Product } from "./types";
import { productRoute } from "../endpoints";

export class ProductAPI {

    static create = async (product:CreateProduct):Promise<Response> =>{
        const response = await axios.post(productRoute.create, product);
        return response.data;
    }

    static getAll = async ():Promise<Product[]> =>{
        const response = await axios.get(productRoute.getAll);
        return response.data;
    }

    static delete = async (id:number):Promise<Response> =>{
        const response = await axios.delete(`${productRoute.delete}/${id}`);
        return response.data;
    }
}