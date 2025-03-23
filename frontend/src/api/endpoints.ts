import { loadBaseURL } from "../config/loadEnv";

export const base = {
    host:loadBaseURL()
}

export const loginRoute ={
    login:`${base.host}/login`
}

export const userRoute = {
    create:`${base.host}/users`,
    getAll:`${base.host}/users/all`,
    delete:`${base.host}/users/`
}

