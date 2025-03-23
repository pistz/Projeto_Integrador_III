import { Button, Divider, List, Skeleton } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { ListUsers as SystemUser } from './types';
import { UsersAPI } from '../../../../api/Users/UsersAPI';
import { notifyError, notifySuccess, notifyWarning } from '../../../shared/notify/notify';
import { getUserFromToken } from '../../../../config/token';

export const ListUsers:React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<SystemUser[]>([]);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const allUsers = await UsersAPI.getAll();
      setUsers(allUsers);
    } catch (err) {
      notifyError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (user: SystemUser) => {
    const tokenUser = getUserFromToken();
    if(user.email === tokenUser?.user){
      notifyWarning('Usuário com sessão ativa não pode ser deletado');
      return
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
    loadUsers();
  }, [loadUsers]);

  return (
    <>
      <Divider>Lista de Usuários do Sistema</Divider>
      <List
        loading={loading}
        dataSource={users}
        itemLayout='horizontal'
        renderItem={(item:SystemUser) =>(
          <List.Item
            actions={[<Button danger onClick={() => handleDelete(item)} key={'delete-btn'}>Delete</Button>]}>
              <Skeleton title={false} loading={loading} active>
                <List.Item.Meta 
                  title={item.name}
                  description={item.email}
                />
              </Skeleton>
          </List.Item>
        )}
      
      >

      </List>
    </>
  )
}
