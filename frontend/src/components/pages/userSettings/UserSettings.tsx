import { IdcardOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Flex, Space, Typography } from 'antd';
import React from 'react';
import { useAppContext } from '../../../context/useAppContext';

export const UserSettings: React.FC = () => {
  const { tokenUser } = useAppContext();

  const dividerText = () => {
    return (
      <span
        style={{
          fontSize: '1rem',
          fontWeight: 'inherit',
          display: 'flex',
          flexDirection: 'row',
          gap: '0.3rem',
        }}
      >
        <IdcardOutlined />
        <p>Menu do Usuário</p>
      </span>
    );
  };
  return (
    <>
      <Divider children={dividerText()} />
      <Space>
        <Avatar
          icon={<UserOutlined />}
          style={{
            backgroundColor: '#87d068',
            margin: '0 0.5rem 0.9rem 0',
          }}
        />
        <Flex align="flex-start" justify="flex-start" vertical>
          <Typography style={{ color: '#000', fontWeight: 'bold' }}>
            Nome: {tokenUser?.name}
          </Typography>
          <Typography style={{ color: '#868383' }}>
            E-mail: {tokenUser?.email}
          </Typography>
          <Typography>Permissão: {tokenUser?.roles}</Typography>
        </Flex>
      </Space>
    </>
  );
};
