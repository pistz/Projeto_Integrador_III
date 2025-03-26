import React from 'react'
import { Drawer as AntDrawer } from "antd";

interface Props {
    open:boolean,
    content:React.ReactNode,
    title?:string,
    onClose:() => void,
    width?:number
}
export const Drawer:React.FC<Props> = ({open, content, title, onClose, width}:Props) => {
  return (

    <>
        <AntDrawer
            open={open}
            title={title||''}
            onClose={onClose}
            width={width}
        >
            {content}
        </AntDrawer>
    </>
  )
}
