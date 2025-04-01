import React, { useState } from 'react';

import { EyeOutlined, UserAddOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { CardComponent } from '../../shared/card/CardComponent';
import { OptionCard } from '../../shared/card/OptionCard';
import { CardsContainer } from '../../shared/container/cardsContainer';
import { Modal } from '../../shared/modal/Modal';
import { CreateUser } from './user/createUser';
import { ListUsers } from './user/listUsers';

export const Config: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const showModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const options = [
    {
      title: 'Usuários do sistema',
      actions: [
        {
          key: 'Criar',
          component: (
            <CardComponent component={<UserAddOutlined />} title={'Criar'} />
          ),
          onClick: () => showModal(<CreateUser close={handleCancel} />),
        },
        {
          key: 'Listar',
          component: (
            <CardComponent component={<EyeOutlined />} title={'Listar'} />
          ),
          onClick: () => showModal(<ListUsers />),
        },
      ],
    },
  ];

  return (
    <>
      <Divider>Configurações de Usuário</Divider>
      <CardsContainer>
        {options.map((option) => (
          <OptionCard
            key={option.title}
            title={option.title}
            actions={option.actions}
          />
        ))}
      </CardsContainer>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        modalContent={modalContent}
      />
    </>
  );
};
