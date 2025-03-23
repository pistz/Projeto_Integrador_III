import React from "react"

export interface Router {
    label:string,
    path:string,
    element:React.ReactElement,
    fullpath?:string
}

export const appPath = '/app/'