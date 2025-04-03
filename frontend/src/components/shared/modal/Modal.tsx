import { Modal as AntModal } from 'antd';
import React, { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  onCancel: () => void;
  modalContent: React.ReactNode;
  width?: number;
}

export const Modal: React.FC<Props> = ({
  open,
  onCancel,
  modalContent,
  width,
}: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);

    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return (
    <AntModal
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      closable
      style={
        isMobile
          ? { top: 0, padding: 0 }
          : { minWidth: '40rem', maxWidth: width ?? '100vh' }
      }
      width={isMobile ? '100vw' : width}
      styles={{
        body: isMobile
          ? { height: '100vh', overflowY: 'auto', padding: '1rem' }
          : {},
      }}
      key={Math.random()}
    >
      {modalContent}
    </AntModal>
  );
};
