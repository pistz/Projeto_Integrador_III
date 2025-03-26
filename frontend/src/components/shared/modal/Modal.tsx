import React from 'react'
import {Modal as AntModal} from 'antd'

interface Props {
    open: boolean;
    onCancel: () => void;
    modalContent: React.ReactNode
    width?:number
}

export const Modal:React.FC<Props> = ({open, onCancel, modalContent, width}:Props) => {
  return (
    <AntModal 
        open={open} 
        onCancel={onCancel}
        footer={null} 
        destroyOnClose
        closable
        style={{minWidth:'40rem', maxWidth:width? width :'100rem'}}
        width={width}
    >
        {modalContent}
    </AntModal>
  )
}
