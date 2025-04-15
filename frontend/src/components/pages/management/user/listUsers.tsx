import { DeleteFilled, IdcardOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Flex, List, Skeleton, Space, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { UsersAPI } from '../../../../api/Users/UsersAPI';
import { useAppContext } from '../../../../context/useAppContext';
import { DeleteButton } from '../../../shared/deleteButton/DeleteButton';
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from '../../../shared/notify/notify';
import { ListUsers as SystemUser } from './types';

export const ListUsers: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [onlineUser, setOnlineUser] = useState<SystemUser | null>(null);

  const { tokenUser } = useAppContext();

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const allUsers = await UsersAPI.getAll();
      const activeUser = allUsers.find(
        (user) => user.email === tokenUser?.email,
      )!;
      const filteredUsers = allUsers.filter(
        (user) => user.email !== tokenUser?.email,
      );
      setUsers(filteredUsers);
      setOnlineUser(activeUser!);
    } catch (err) {
      notifyError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (user: SystemUser) => {
    if (user.email === tokenUser?.email) {
      notifyWarning('Usuário com sessão ativa não pode ser deletado');
      return;
    }
    setLoading(true);
    try {
      const response = await UsersAPI.delete(user.id);
      notifySuccess(response.message);
      await loadUsers();
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tokenUser) {
      loadUsers();
    }
  }, [tokenUser, loadUsers]);

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
        <p>Usuários do Sistema</p>
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
            {onlineUser?.name}
          </Typography>
          <Typography style={{ color: '#868383' }}>
            {onlineUser?.email}
          </Typography>
        </Flex>
      </Space>
      <List
        loading={loading}
        dataSource={users}
        itemLayout="horizontal"
        renderItem={(item: SystemUser) => (
          <List.Item
            actions={[
              <DeleteButton
                isLoading={loading}
                icon={<DeleteFilled />}
                value={item}
                disabled={item.email === tokenUser?.email}
                handleAction={() => handleDelete(item)}
                key={'delete-btn'}
              />,
            ]}
          >
            <Skeleton title={false} loading={loading} active>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={item.name}
                description={item.email}
                key={item.id}
              />
            </Skeleton>
          </List.Item>
        )}
      ></List>
    </>
  );
};
