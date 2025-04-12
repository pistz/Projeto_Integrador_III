import { AppstoreAddOutlined, EyeOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import React, { useState } from 'react';
import { useAppContext } from '../../../context/useAppContext';
import { CardComponent } from '../../shared/card/CardComponent';
import { OptionCard } from '../../shared/card/OptionCard';
import { CardsContainer } from '../../shared/container/cardsContainer';
import { Modal } from '../../shared/modal/Modal';
import { CreateBarcode } from './barcodes/createBarcode';
import { CreateBrand } from './brand/createBrand';
import { ListBrands } from './brand/listBrands';
import { CreateCategory } from './category/createCategory';
import { ListCategories } from './category/listCategories';
import { CreateProduct } from './product/createProduct';
import { ListProduct } from './product/listProduct';

export const Registrations: React.FC = () => {
  const { setReload } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const showModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setReload((prev: number) => prev + 1);
  };

  const registerOptions = [
    {
      title: 'Marcas',
      actions: [
        {
          key: 'Adicionar',
          component: (
            <CardComponent
              component={<AppstoreAddOutlined />}
              title={'Criar'}
              boldFont
            />
          ),
          onClick: () => showModal(<CreateBrand close={closeModal} />),
        },
        {
          key: 'Listar/Editar',
          component: (
            <CardComponent
              component={<EyeOutlined />}
              title={'Listar/Editar'}
              boldFont
            />
          ),
          onClick: () => showModal(<ListBrands />),
        },
      ],
    },

    {
      title: 'Categorias',
      actions: [
        {
          key: 'Adicionar',
          component: (
            <CardComponent
              component={<AppstoreAddOutlined />}
              title={'Criar'}
              boldFont
            />
          ),
          onClick: () => showModal(<CreateCategory close={closeModal} />),
        },
        {
          key: 'Listar/Editar',
          component: (
            <CardComponent
              component={<EyeOutlined />}
              title={'Listar/Editar'}
              boldFont
            />
          ),
          onClick: () => showModal(<ListCategories />),
        },
      ],
    },

    {
      title: 'Produtos',
      actions: [
        {
          key: 'Adicionar',
          component: (
            <CardComponent
              component={<AppstoreAddOutlined />}
              title={'Criar'}
              boldFont
            />
          ),
          onClick: () => showModal(<CreateProduct close={closeModal} />),
        },
        {
          key: 'Listar/Editar',
          component: (
            <CardComponent
              component={<EyeOutlined />}
              title={'Listar/Editar'}
              boldFont
            />
          ),
          onClick: () => showModal(<ListProduct />),
        },
      ],
    },

    {
      title: 'Códigos de Barras',
      actions: [
        {
          key: 'Adicionar',
          component: (
            <CardComponent
              component={<AppstoreAddOutlined />}
              title={'Criar'}
              boldFont
            />
          ),
          onClick: () => showModal(<CreateBarcode close={closeModal} />),
        },
        {
          key: 'Listar/Editar',
          component: (
            <CardComponent
              component={<EyeOutlined />}
              title={'Listar/Editar'}
              boldFont
            />
          ),
          onClick: () => showModal(<p>Adicionar componente</p>),
        },
      ],
    },
  ];

  return (
    <>
      <Divider>Cadastros</Divider>
      <CardsContainer>
        {registerOptions.map((option, index) => (
          <OptionCard
            key={`${option.title}-${index}`}
            title={option.title}
            actions={option.actions}
            background="#536493"
          />
        ))}
      </CardsContainer>

      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        modalContent={modalContent}
        width={900}
      />
    </>
  );
};
