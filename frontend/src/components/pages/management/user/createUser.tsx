import { CheckOutlined, UserAddOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  FormProps,
  Input,
  Select,
  Space,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { rolesList } from '../../../../api/Login/types';
import { UsersAPI } from '../../../../api/Users/UsersAPI';
import { notifyError, notifySuccess } from '../../../shared/notify/notify';
import { CreateUserForm } from './types';

interface Props {
  close: () => void;
}

export const CreateUser: React.FC<Props> = ({ close }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form] = Form.useForm();

  const onFinish: FormProps<CreateUserForm>['onFinish'] = async (
    values: CreateUserForm,
  ) => {
    setIsLoading(true);
    try {
      const created = await UsersAPI.create(values);
      notifySuccess(created.message);
    } catch (error) {
      notifyError(error);
    } finally {
      setIsLoading(false);
      form.resetFields();
      close();
    }
  };

  const dividerText = () => {
    return (
      <Typography
        style={{
          fontSize: '1rem',
          fontWeight: 'inherit',
          display: 'flex',
          flexDirection: 'row',
          gap: '0.3rem',
        }}
      >
        <UserAddOutlined />
        <p>Criar Usuário do Sistema</p>
      </Typography>
    );
  };

  return (
    <>
      <Divider children={dividerText()} />
      <Space
        align="center"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Form
          form={form}
          clearOnDestroy={true}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name={['name']}
            label={'Nome'}
            rules={[{ required: true, message: 'Nome é obrigatório' }]}
          >
            <Input type="text" disabled={isLoading} />
          </Form.Item>
          <Form.Item
            name={['email']}
            label={'E-mail'}
            rules={[
              { required: true, message: 'e-mail é obrigatório' },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Ainda é um email inválido',
              },
            ]}
          >
            <Input
              type="text"
              placeholder="email@email.com"
              disabled={isLoading}
            />
          </Form.Item>
          <Form.Item
            name={['password']}
            label={'Senha'}
            rules={[{ required: true, message: 'senha é obrigatório' }]}
          >
            <Input.Password disabled={isLoading} />
          </Form.Item>

          <Form.Item
            name={['roles']}
            label={'Perfil de Acesso'}
            rules={[{ required: true, message: 'Perfil é obrigatório' }]}
          >
            <Select
              disabled={isLoading}
              showSearch
              optionFilterProp="label"
              options={rolesList}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            icon={<CheckOutlined />}
            loading={isLoading}
          >
            Salvar
          </Button>
        </Form>
      </Space>
    </>
  );
};
