import { Divider } from 'antd'
import React, { useState } from 'react'
import { CardsContainer } from '../../shared/container/cardsContainer'
import { Modal } from '../../shared/modal/Modal'
import { OptionCard } from '../../shared/card/OptionCard'
import { CardComponent } from '../../shared/card/CardComponent'
import { AppstoreAddOutlined, EyeOutlined } from '@ant-design/icons'

export const Stock:React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    const minHeight = '30vh'
  
    const showModal = (content: React.ReactNode) => {
      setModalContent(content);
      setIsModalOpen(true);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
      setModalContent(null);
    };

    const registerOptions = [
        {
            title: 'Cadastro de Marcas',
            actions: [
              {
                key: 'Adicionar',
                component: (<CardComponent component={<AppstoreAddOutlined />} title={"Criar"}/>),
                onClick: () => showModal(<p>Teste</p>)
              },
              {
                key: 'Listar',
                component: (<CardComponent component={<EyeOutlined />} title={"Listar"}/>),
                onClick: () => showModal(<p>Teste</p>)
              }
            ]
        },

        {
            title: 'Cadastro de Categorias',
            actions: [
              {
                key: 'Adicionar',
                component: (<CardComponent component={<AppstoreAddOutlined />} title={"Criar"}/>),
                onClick: () => showModal(<p>Teste</p>)
              },
              {
                key: 'Listar',
                component: (<CardComponent component={<EyeOutlined />} title={"Listar"}/>),
                onClick: () => showModal(<p>Teste</p>)
              }
            ]
        },

        {
            title: 'Cadastro de Produtos',
            actions: [
              {
                key: 'Adicionar',
                component: (<CardComponent component={<AppstoreAddOutlined />} title={"Criar"}/>),
                onClick: () => showModal(<p>Teste</p>)
              },
              {
                key: 'Listar',
                component: (<CardComponent component={<EyeOutlined />} title={"Listar"}/>),
                onClick: () => showModal(<p>Teste</p>)
              }
            ]
        },
    ]

  return (

    <>
        <Divider>Movimentações</Divider>
        <CardsContainer minHeight={minHeight}>
            {registerOptions.map((option) => (
                <OptionCard
                    key={option.title}
                    title={option.title}
                    actions={option.actions}
                />
            ))}
        </CardsContainer>

        <Divider>Cadastros</Divider>
        <CardsContainer minHeight={minHeight}>
            {registerOptions.map((option) => (
                <OptionCard
                    key={option.title}
                    title={option.title}
                    actions={option.actions}
                />
            ))}
        </CardsContainer>

        <Modal open={isModalOpen} onCancel={handleCancel} modalContent={modalContent}/>

    </>
  )
}
