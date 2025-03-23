import { Divider } from 'antd'
import React, { useState } from 'react'
import { CardsContainer } from '../../shared/container/cardsContainer'
import { Modal } from '../../shared/modal/Modal'
import { OptionCard } from '../../shared/card/OptionCard'
import { CardComponent } from '../../shared/card/CardComponent'
import { AppstoreAddOutlined, EyeOutlined } from '@ant-design/icons'
import { CreateBrand } from './brand/createBrand'

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

    const register = [
      {
          title: 'Marcas',
          actions: [
            {
              key: 'Adicionar',
              component: (<CardComponent component={<AppstoreAddOutlined />} title={"Criar"}/>),
              onClick: () => showModal(<CreateBrand close={handleCancel}/>)
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

    const movements = [
        {
            title: 'Marcas',
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
            title: 'Categorias',
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
            title: 'Produtos',
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
    ];

    

  return (

    <>
        <Divider>Cadastros</Divider>
        <CardsContainer minHeight={minHeight}>
            {register.map((option) => (
                <OptionCard
                    key={option.title}
                    title={option.title}
                    actions={option.actions}
                    background='#5aa9f3'
                    color='#080808'
                />
            ))}
        </CardsContainer>

        <Divider>Movimentações</Divider>
        <CardsContainer minHeight={minHeight}>
            {movements.map((option) => (
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
