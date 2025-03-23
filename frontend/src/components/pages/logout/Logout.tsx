import { Modal } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';

interface Props {
  open:boolean,
  onClose: () => void
}

export const Logout:React.FC<Props> = ({open, onClose: close} :Props) => {

    const navigate = useNavigate();
    
      const handleOk = () => {
        sessionStorage.clear();
        navigate('/');
        window.location.reload()
      };
    
      const handleCancel = () => {
        close();
      };

  return (
    <>
        <Modal title="Confirma a saída do sistema?" 
            open={open} 
            onOk={handleOk} 
            onCancel={handleCancel} 
            cancelText={'Cancelar'} 
            okText={'Sair do Sistema'}
            />
    </>
  )
}