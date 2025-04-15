import {
  CalendarOutlined,
  FileSearchOutlined,
  GoldOutlined,
  ProjectOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { Button, Divider, Flex } from 'antd';
import React, { useState } from 'react';
import { Roles } from '../../../../api/Login/types';
import { useAppContext } from '../../../../context/useAppContext';
import { Modal } from '../../../shared/modal/Modal';
import { notifyWarning } from '../../../shared/notify/notify';
import { GetAllMovements } from './getAllMovements';
import { GetCurrentStock } from './getCurrentStock';
import { GetCurrentStockByProductId } from './getCurrentStockByProductId';
import { GetDateRangeMovement } from './getDateRangeMovement';
import { GetSingleDateMovement } from './getSingleDateMovement';
import { ButtonContent } from './types';

export const Reports: React.FC = () => {
  const movementButtonStyles: React.CSSProperties = {
    alignContent: 'center',
    justifyContent: 'stretch',
    fontWeight: 'bolder',
    color: '#496989',
  };

  const currentStockButtonStyles: React.CSSProperties = {
    alignContent: 'center',
    justifyContent: 'stretch',
    fontWeight: 'bolder',
    color: '#074173',
  };

  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [key, setKey] = useState<number | string>(
    `${Math.random() * 1000} - reports-key`,
  );

  const { tokenUser } = useAppContext();
  const authorizedAccess =
    tokenUser?.roles?.includes(Roles.ADMIN) ||
    tokenUser?.roles?.includes(Roles.REPORT_ONLY);

  const showModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleOnClick = (type: string) => {
    if (!authorizedAccess) {
      notifyWarning('Acesso não autorizado, verifique suas permissões.');
      return;
    }
    const content = stockActivityButtons.map((value) =>
      value.type == type ? value.content : null,
    );
    const key = stockActivityButtons.find((value) => value.type === type)?.key;
    setKey(key!);
    return showModal(content);
  };

  const stockActivityButtons: ButtonContent[] = [
    {
      key: 'getAllMovements',
      type: 'getAllMovements',
      content: <GetAllMovements />,
    },
    {
      key: 'getSingleDateMovement',
      type: 'getSingleDateMovement',
      content: <GetSingleDateMovement />,
    },
    {
      key: 'getDateRangeMovement',
      type: 'getDateRangeMovement',
      content: <GetDateRangeMovement />,
    },
    {
      key: 'getCurrentStockByProductId',
      type: 'getCurrentStockByProductId',
      content: <GetCurrentStockByProductId />,
    },
    {
      key: 'getCurrentStock',
      type: 'getCurrentStock',
      content: <GetCurrentStock />,
    },
  ];

  return (
    <>
      <Divider orientation="left" style={{ color: '#a19ba1' }}>
        Estoque Atual
      </Divider>
      <Flex align="stretch" justify="space-around" vertical gap={15}>
        <Button
          htmlType="button"
          type="text"
          icon={<FileSearchOutlined />}
          onClick={() => handleOnClick('getCurrentStockByProductId')}
          style={currentStockButtonStyles}
        >
          Estoque por Produto
        </Button>

        <Button
          htmlType="button"
          type="text"
          icon={<GoldOutlined />}
          onClick={() => handleOnClick('getCurrentStock')}
          style={currentStockButtonStyles}
        >
          Estoque Total Atual
        </Button>
      </Flex>

      <Divider orientation="left" style={{ color: '#a19ba1' }}>
        Movimentações de Produtos
      </Divider>
      <Flex align="stretch" justify="space-around" vertical gap={15}>
        <Button
          htmlType="button"
          type="text"
          icon={<ProjectOutlined />}
          onClick={() => handleOnClick('getAllMovements')}
          style={movementButtonStyles}
        >
          Todas
        </Button>

        <Button
          htmlType="button"
          type="text"
          icon={<ScheduleOutlined />}
          onClick={() => handleOnClick('getSingleDateMovement')}
          style={movementButtonStyles}
        >
          Por dia
        </Button>

        <Button
          htmlType="button"
          type="text"
          icon={<CalendarOutlined />}
          onClick={() => handleOnClick('getDateRangeMovement')}
          style={movementButtonStyles}
        >
          Entre datas
        </Button>
      </Flex>

      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        modalContent={modalContent}
        keyId={key}
        width={1500}
      />
    </>
  );
};
