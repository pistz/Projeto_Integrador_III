import {
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
import { MoveProduct } from './movement/moveProduct';
import { MovementType } from './movement/types';
import { Reports } from './reports/Reports';

export const Stock: React.FC = () => {
  const { setReload } = useAppContext();

  const [userName, setUserName] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);
  const [key, setKey] = useState(Math.random());

  const showModal = (content: React.ReactNode) => {
    setKey((prev: number) => prev + 1 + Math.random());
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

  return (
    <>
      <Divider>Movimentos de Estoque</Divider>
      <CardsContainer>
        {moveProductStock.map((option, index) => (
          <OptionCard
            key={`${option.title}-${index}`}
            title={option.title}
            actions={option.actions}
          />
        ))}
      </CardsContainer>

      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        modalContent={modalContent}
        keyId={key}
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
