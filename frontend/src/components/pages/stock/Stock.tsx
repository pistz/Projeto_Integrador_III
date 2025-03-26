import { Divider } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { CardsContainer } from '../../shared/container/cardsContainer'
import { Modal } from '../../shared/modal/Modal'
import { OptionCard } from '../../shared/card/OptionCard'
import { CardComponent } from '../../shared/card/CardComponent'
import { AppstoreAddOutlined, EyeOutlined, MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons'
import { CreateBrand } from './brand/createBrand'
import { ListBrands } from './brand/listBrands'
import { CreateCategory } from './category/createCategory'
import { ListCategories } from './category/listCategories'
import { CreateProduct } from './product/createProduct'
import { ListProduct } from './product/listProduct'
import { getUserFromToken } from '../../../config/token'
import { notifyError } from '../../shared/notify/notify'
import { MoveStock } from './product/moveStock'
import { MovementType } from './product/types'


export const Stock:React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [userName, setUserName] = useState('');

    const minHeight = '30vh'
  
    const showModal = (content: React.ReactNode) => {
      setModalContent(content);
      setIsModalOpen(true);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
      setModalContent(null);
    };

    const loadUserName = useCallback(async () => {
      try{
          const user = getUserFromToken()!;
          setUserName(user.name);
      }catch(err){
          notifyError(err);
      }
    }, [setUserName]);

    useEffect(() =>{
        loadUserName()
    },[loadUserName])


    const moveStock = [
      {
          title: 'Movimentar Estoque',
          actions: [
            {
              key: 'Entrada',
              component: (<CardComponent component={<PlusCircleFilled style={{color:'#059212'}}/>} title={"Entrada"} fontColor='#059212' boldFont/>),
              onClick: () => showModal(<MoveStock user={userName} movementType={MovementType.IN} close={handleCancel}/>)
            },
            {
              key: 'Saída',
              component: (<CardComponent component={<MinusCircleFilled style={{color:'#C21010'}}/>} title={"Saída"} fontColor='#C21010' boldFont/>),
              onClick: () => showModal(<MoveStock user={userName} movementType={MovementType.OUT} close={handleCancel}/>)
            }
          ]
      },
  ];

    const registerOptions = [
      {
          title: 'Marcas',
          actions: [
            {
              key: 'Adicionar',
              component: (<CardComponent component={<AppstoreAddOutlined />} title={"Criar"} boldFont/>),
              onClick: () => showModal(<CreateBrand close={handleCancel}/>)
            },
            {
              key: 'Listar',
              component: (<CardComponent component={<EyeOutlined />} title={"Listar"} boldFont/>),
              onClick: () => showModal( <ListBrands />)
            }
          ]
      },

      {
          title: 'Categorias',
          actions: [
            {
              key: 'Adicionar',
              component: (<CardComponent component={<AppstoreAddOutlined />} title={"Criar"} boldFont/>),
              onClick: () => showModal(<CreateCategory close={handleCancel}/>)
            },
            {
              key: 'Listar',
              component: (<CardComponent component={<EyeOutlined />} title={"Listar"} boldFont/>),
              onClick: () => showModal(<ListCategories />)
            }
          ]
      },

      {
          title: 'Produtos',
          actions: [
            {
              key: 'Adicionar',
              component: (<CardComponent component={<AppstoreAddOutlined />} title={"Criar"} boldFont/>),
              onClick: () => showModal(<CreateProduct close={handleCancel} />)
            },
            {
              key: 'Listar',
              component: (<CardComponent component={<EyeOutlined />} title={"Listar"} boldFont/>),
              onClick: () => showModal(<ListProduct />)
            }
          ]
      },
  ]    

  return (

    <>
        <Divider>Movimentações</Divider>
        <CardsContainer minHeight={minHeight}>
            {moveStock.map((option) => (
                <OptionCard
                    key={option.title}
                    title={option.title}
                    actions={option.actions}
                    background='#51a2fe'
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
                    background='#8ec0ee'
                />
            ))}
        </CardsContainer>

        <Modal open={isModalOpen} onCancel={handleCancel} modalContent={modalContent}/>

    </>
  )
}
