import { message } from "antd";
import axios from "axios";
import { Errors } from "../../../assets/enums/errors";

export const notifySuccess = (msg:string) => {
    message.success(msg);
};

export const notifyError = (error:unknown) =>{
    if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message;
        const errorType = error.response?.data?.error as keyof typeof Errors;

        console.error(errorMsg);
        message.error(Errors[errorType]);
    } else {
        message.error('Erro inesperado');
    }
}

export const notifyWarning = (msg:string) =>{
    message.warning(msg);
}