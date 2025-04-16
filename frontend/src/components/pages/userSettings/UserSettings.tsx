import { IdcardOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Form,
  FormProps,
  Input,
  Space,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { LoginAPI } from '../../../api/Login/LoginAPI';
import { PasswordResetData, Roles, RolesPt } from '../../../api/Login/types';
import { useAppContext } from '../../../context/useAppContext';
import { notifyError, notifySuccess } from '../../shared/notify/notify';

export const UserSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const { tokenUser } = useAppContext();

  const clearForm = () => {
    form.resetFields();
  };

  const onFinish: FormProps['onFinish'] = async (data: PasswordResetData) => {
    data.email = tokenUser?.email!;
    setLoading(true);
    try {
      const response = await LoginAPI.resetPassword(data);
      notifySuccess(response.message);
    } catch (error) {
      notifyError(error);
    } finally {
      clearForm();
      setLoading(false);
    }
  };

  const translateRole = (roleValue: string) => {
    const key = Object.entries(Roles).find(
      ([, value]) => value === roleValue,
    )?.[0];
    return key ? RolesPt[key as keyof typeof RolesPt] : undefined;
  };

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
      <Space
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}
        size={0}
      >
        <Space
          style={{
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyItems: 'center',
          }}
        >
          <Avatar
            icon={<UserOutlined />}
            style={{
              backgroundColor: '#87d068',
              margin: '0 1rem 0 0 ',
            }}
          />
          <Flex align="flex-start" justify="flex-start" vertical>
            <Flex align="center" justify="space-between" gap={5}>
              <Typography style={{ color: '#000', fontWeight: 'bold' }}>
                Nome:
              </Typography>
              <Typography>{tokenUser?.name}</Typography>
            </Flex>
            <Flex align="center" justify="space-between" gap={5}>
              <Typography style={{ color: '#000', fontWeight: 'bold' }}>
                E-mail:
              </Typography>
              <Typography>{tokenUser?.email}</Typography>
            </Flex>
            <Flex align="center" justify="space-between" gap={5}>
              <Typography style={{ color: '#000', fontWeight: 'bold' }}>
                Permissão:
              </Typography>
              <Typography>{translateRole(tokenUser?.roles!)}</Typography>
            </Flex>
          </Flex>
        </Space>
        <Divider />
        <Space
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Divider children={'Alterar senha'} />

          <Form
            form={form}
            layout="vertical"
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            onFinish={onFinish}
            initialValues={{ remember: false }}
            autoComplete="off"
            clearOnDestroy={true}
            disabled={loading}
          >
            <Form.Item
              label="Senha Atual"
              name="password"
              rules={[
                { required: true, message: 'Senha é um campo obrigatório' },
              ]}
            >
              <Input.Password disabled={loading} />
            </Form.Item>

            <Form.Item
              label="Nova Senha"
              name="new_password"
              rules={[
                {
                  required: true,
                  message: 'Nova senha é um campo obrigatório',
                },
              ]}
            >
              <Input.Password disabled={loading} />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{ alignSelf: 'center', justifySelf: 'center' }}
              loading={loading}
            >
              Atualizar
            </Button>
          </Form>
        </Space>
      </Space>
    </>
  );
};
