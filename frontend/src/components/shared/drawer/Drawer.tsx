import React from 'react'
import { Drawer as AntDrawer } from "antd";

interface Props {
    open:boolean,
    content:React.ReactNode,
    title?:string,
    onClose:() => void
}
export const Drawer:React.FC<Props> = ({open, content, title, onClose}:Props) => {
  return (

    <>
        <AntDrawer
            open={open}
            title={title||''}
            onClose={onClose}
        >
            {content}
        </AntDrawer>
    </>
  )
}
