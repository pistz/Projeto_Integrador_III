import axios from "axios";
import { Response } from "../types";
import { ProductMovement } from "./types";
import { stockMovementsRoute } from "../endpoints";


export class StockAPI {

    static move = async (movement:ProductMovement):Promise<Response> =>{
        const response = await axios.post(stockMovementsRoute.move, movement);
        return response.data;
    }

    static getAll = async ():Promise<Response> =>{
        const response = await axios.get(stockMovementsRoute.getAll);
        return response.data;
    }

    static getSingleMovementById = async (id: number):Promise<Response> =>{
        const response = await axios.get(`${stockMovementsRoute.getSingleById}/${id}`);
        return response.data;
    }

    static getMovementsByDate = async (date:string):Promise<Response> =>{
        const response = await axios.get(stockMovementsRoute.getSingleById, {params:date});
        return response.data;
    }

    static getMovementsByDateRange = async (start_date:string, end_date:string):Promise<Response> =>{
        const response = await axios.get(stockMovementsRoute.getSingleById, {params:{start_date, end_date}});
        return response.data;
    }

}