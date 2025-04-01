import axios from "axios";
import { Response } from "../types";
import { CreateProduct, Product } from "./types";
import { productRoute } from "../endpoints";
import { authHeader } from "../../config/token";

export class ProductAPI {

    static create = async (product:CreateProduct):Promise<Response> =>{
        const response = await axios.post(productRoute.create, product, authHeader());
        return response.data;
    }

    static getAll = async ():Promise<Product[]> =>{
        const response = await axios.get(productRoute.getAll, authHeader());
        return response.data;
    }

    static delete = async (id:number):Promise<Response> =>{
        const response = await axios.delete(`${productRoute.delete}/${id}`, authHeader());
        return response.data;
    }
}