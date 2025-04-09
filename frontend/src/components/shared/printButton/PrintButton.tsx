import { PrinterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

interface Props {
  handlePrint: () => void;
}

export const PrintButton: React.FC<Props> = ({ handlePrint }: Props) => {
  return (
    <Button
      icon={<PrinterOutlined />}
      onClick={handlePrint}
      type="text"
      size="large"
      style={{
        display: 'flex',
        marginBottom: '0.8rem',
        alignSelf: 'flex-end',
        justifySelf: 'flex-end',
      }}
    >
      Imprimir
    </Button>
  );
};
