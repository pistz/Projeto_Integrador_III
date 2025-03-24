import { message } from "antd";
import axios from "axios";

export const notifySuccess = (msg:string) => {
    message.success(msg, 3);
};

export const notifyError = (error:unknown) =>{
    if (axios.isAxiosError(error)) {
        const errorMsg:string = error.response?.data?.message;
        const errorDetails:string = error.response?.data.aditional ? error.response?.data.aditional : null
        console.error("\nMessage: ", errorMsg, " \nAditional: ", errorDetails);
        const completeMessage = errorMsg.includes("Erro ao deletar") ? errorMsg.concat(" .Verifique o uso!"):errorMsg
        message.error(completeMessage, 3);
    } else {
        message.error('Erro inesperado');
    }
}

export const notifyWarning = (msg:string) =>{
    message.warning(msg, 3);
}