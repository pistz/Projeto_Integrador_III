import { Button, Popconfirm, RowProps } from 'antd';
import React from 'react';

interface Props {
  value: RowProps;
  handleAction: (value: RowProps) => void;
  isLoading: boolean;
  action?: string;
  icon?: React.ReactNode;
}

export const DeleteButton: React.FC<Props> = ({
  handleAction,
  isLoading,
  value,
  action,
  icon,
}: Props) => {
  return (
    <>
      <Popconfirm
        title="Confirma a exclusão ?"
        onConfirm={() => handleAction(value)}
        okText="Sim"
        cancelText="Não"
        key={'popconfirm-delete'}
      >
        <Button
          type="default"
          danger
          title={action ?? 'Deletar'}
          loading={isLoading}
          key={'actions-delete'}
        >
          {icon ?? 'Deletar'}
        </Button>
      </Popconfirm>
    </>
  );
};
