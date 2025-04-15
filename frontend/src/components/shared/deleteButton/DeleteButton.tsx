import { Button, Popconfirm, RowProps } from 'antd';
import React from 'react';

interface Props {
  value: any;
  handleAction: (value: RowProps) => void;
  isLoading: boolean;
  action?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text';
}

export const DeleteButton: React.FC<Props> = ({
  handleAction,
  isLoading,
  value,
  action,
  icon,
  disabled,
  type,
}: Props) => {
  return (
    <>
      <Popconfirm
        title="Confirma a exclusão ?"
        onConfirm={() => handleAction(value)}
        okText="Sim"
        cancelText="Não"
        key={'popconfirm-delete'}
        icon={icon}
        disabled={disabled}
      >
        <Button
          type={type ?? 'default'}
          danger
          title={action ?? 'Deletar'}
          loading={isLoading}
          key={'actions-delete'}
          icon={icon ?? null}
        />
      </Popconfirm>
    </>
  );
};
