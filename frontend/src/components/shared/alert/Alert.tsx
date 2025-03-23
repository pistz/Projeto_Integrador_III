import { notification } from 'antd';
import React, { useEffect, useRef } from 'react'

export const Alert:React.FC<{expired:boolean}> = ({expired}) => {

const [api, contextHolder] = notification.useNotification();

const alreadyNotifiedRef = useRef(false);

useEffect(() => {
  if (expired && !alreadyNotifiedRef.current) {
    alreadyNotifiedRef.current = true;

    api.info({
      message: `Sessão Expirada`,
      description: 'Realize o login novamente',
      placement: 'top',
      duration: 3,
      onClose() {
        sessionStorage.clear();
        window.location.href = '/';
      },
    });
  }
}, [expired, api]);

  return (
        <>
          {contextHolder}
        </>
  )
}