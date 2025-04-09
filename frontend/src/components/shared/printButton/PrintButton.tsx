import { PrinterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

interface Props {
  handlePrint: () => void;
  disabled?: boolean;
  setMargin?: boolean;
  margin?: string | number;
}

export const PrintButton: React.FC<Props> = ({
  handlePrint,
  disabled,
  setMargin = false,
  margin = '0.8rem',
}: Props) => {
  return (
    <Button
      icon={<PrinterOutlined />}
      onClick={handlePrint}
      type="text"
      size="large"
      disabled={disabled}
      style={{
        display: 'flex',
        marginBottom: setMargin ? margin : '0.8rem',
        alignSelf: 'flex-end',
        justifySelf: 'flex-end',
      }}
    >
      Imprimir
    </Button>
  );
};
