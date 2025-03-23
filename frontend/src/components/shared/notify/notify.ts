import { message } from "antd";
import axios from "axios";

export const notifySuccess = (msg:string) => {
    message.success(msg);
};

export const notifyError = (error:unknown) =>{
    if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message;
        message.error(errorMsg);
    } else {
        message.error('Erro inesperado');
    }
}

export const notifyWarning = (msg:string) =>{
    message.warning(msg);
}