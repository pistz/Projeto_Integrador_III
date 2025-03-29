import axios from "axios";
import { Response } from "../types";
import { CurrentStock, Movement, ProductMovement } from "./types";
import { currentStockRoute, stockMovementsRoute } from "../endpoints";


export class StockAPI {

    static move = async (movement:ProductMovement):Promise<Response> =>{
        const response = await axios.post(stockMovementsRoute.move, movement);
        return response.data;
    }

    static delete = async ():Promise<Response> =>{
        return {message:""} as Response;
    }

    static getAll = async ():Promise<Movement[]> =>{
        const response = await axios.get(stockMovementsRoute.getAll);
        return response.data;
    }

    static getSingleMovementById = async (id: number):Promise<Response> =>{
        const response = await axios.get(`${stockMovementsRoute.getSingleById}/${id}`);
        return response.data;
    }

    static getMovementsByDate = async (date:string):Promise<Movement []> =>{
        const param = `date=${date}`
        const response = await axios.get(`${stockMovementsRoute.getByDate}${param}`);
        return response.data;
    }

    static getMovementsByDateRange = async (start_date:string, end_date:string):Promise<Movement []> =>{
        const params = `start_date=${start_date}&end_date=${end_date}`
        const response = await axios.get(`${stockMovementsRoute.getByDateRange}${params}`);
        return response.data;
    }

    static getCurrentStockByProductId = async (id:number):Promise<CurrentStock> =>{
        const response = await axios.get(`${currentStockRoute.getCurrentStockByProductId}/${id}`);
        return response.data;
    }

    static getCurrentStock = async ():Promise<CurrentStock[]> =>{
        const response = await axios.get(currentStockRoute.getCurrentStock);
        return response.data;
    }

}