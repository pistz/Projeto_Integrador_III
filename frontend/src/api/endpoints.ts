import { loadBaseURL } from "../config/loadEnv";

export const base = {
    host:loadBaseURL()
}

export const loginRoute ={
    login:`${base.host}/login`
}

