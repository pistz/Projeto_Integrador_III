import { Button, Popconfirm } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React from 'react';

interface Props {
  loading: boolean;
  icon: React.ReactNode;
  disabled?: boolean;
  form?: FormInstance<any>;
}

export const SaveButton: React.FC<Props> = ({
  icon,
  loading,
  disabled,
  form,
}: Props) => {
  return (
    <>
      <Popconfirm
        title="Confirma a gravação ?"
        onConfirm={() => form?.submit()}
        okText="Sim"
        cancelText="Não"
        key={'popconfirm-save'}
        icon={icon}
        disabled={form?.isFieldsValidating() ?? false}
        placement="topLeft"
      >
        <Button
          type="primary"
          icon={icon}
          loading={loading}
          disabled={disabled}
        >
          Salvar
        </Button>
      </Popconfirm>
    </>
  );
};
