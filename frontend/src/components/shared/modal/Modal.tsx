import React from 'react'
import {Modal as AntModal} from 'antd'

interface Props {
    open: boolean;
    onCancel: () => void;
    modalContent: React.ReactNode
}

export const Modal:React.FC<Props> = ({open, onCancel, modalContent}:Props) => {
  return (
    <AntModal 
        open={open} 
        onCancel={onCancel}
        footer={null} 
        destroyOnClose
        closable
        style={{minWidth:'40rem', maxWidth:'100rem'}}
    >
        {modalContent}
    </AntModal>
  )
}
