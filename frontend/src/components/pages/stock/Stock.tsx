import {
  AppstoreAddOutlined,
  EyeOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
  SnippetsOutlined,
} from '@ant-design/icons';
import { Divider } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { getUserFromToken } from '../../../config/token';
import { useAppContext } from '../../../context/useAppContext';
import { CardComponent } from '../../shared/card/CardComponent';
import { OptionCard } from '../../shared/card/OptionCard';
import { CardsContainer } from '../../shared/container/cardsContainer';
import { Drawer } from '../../shared/drawer/Drawer';
import { Modal } from '../../shared/modal/Modal';
import { notifyError } from '../../shared/notify/notify';
import { CreateBrand } from './brand/createBrand';
import { ListBrands } from './brand/listBrands';
import { CreateCategory } from './category/createCategory';
import { ListCategories } from './category/listCategories';
import { CreateProduct } from './product/createProduct';
import { ListProduct } from './product/listProduct';
import { MoveProduct } from './product/moveProduct';
import { MovementType } from './product/types';
import { Reports } from './reports/Reports';

export const Stock: React.FC = () => {
  const MIN_HEIGHT = '30vh';
  const { setReload } = useAppContext();

  const [userName, setUserName] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);

  const showModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setReload((prev: number) => prev + 1);
  };

  const openDrawer = (content: React.ReactNode) => {
    setDrawerContent(content);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerContent(null);
    setIsDrawerOpen(false);
  };

  const loadUserName = useCallback(async () => {
    try {
      const user = getUserFromToken()!;
      setUserName(user.name);
    } catch (err) {
      notifyError(err);
    }
  }, [setUserName]);

  useEffect(() => {
    loadUserName();
  }, [loadUserName]);

  const moveProductStock = [
    {
      title: 'Registrar Movimentação',
      actions: [
        {
          key: 'Entrada',
          component: (
            <CardComponent
              component={<PlusCircleFilled style={{ color: '#059212' }} />}
              title={'Entrada'}
              fontColor="#059212"
              boldFont
            />
          ),
          onClick: () =>
            showModal(
              <MoveProduct
                user={userName}
                movementType={MovementType.IN}
                close={closeModal}
              />,
            ),
        },
        {
          key: 'Saída',
          component: (
            <CardComponent
              component={<MinusCircleFilled style={{ color: '#C21010' }} />}
              title={'Saída'}
              fontColor="#C21010"
              boldFont
            />
          ),
          onClick: () =>
            showModal(
              <MoveProduct
                user={userName}
                movementType={MovementType.OUT}
                close={closeModal}
              />,
            ),
        },
      ],
    },
    {
      title: 'Relatórios de Estoque',
      actions: [
        {
          key: 'Abrir',
          component: (
            <CardComponent
              component={<SnippetsOutlined />}
              title={'Abrir'}
              boldFont
            />
          ),
          onClick: () => openDrawer(<Reports />),
        },
      ],
    },
  ];

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
  ];

  return (
    <>
      <Divider>Movimentos de Estoque</Divider>
      <CardsContainer $minHeight={MIN_HEIGHT}>
        {moveProductStock.map((option, index) => (
          <OptionCard
            key={`${option.title}-${index}`}
            title={option.title}
            actions={option.actions}
          />
        ))}
      </CardsContainer>

      <Divider>Cadastros</Divider>
      <CardsContainer $minHeight={MIN_HEIGHT}>
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
      />
      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        content={drawerContent}
        width={500}
        title={moveProductStock[1].title}
      />
    </>
  );
};
