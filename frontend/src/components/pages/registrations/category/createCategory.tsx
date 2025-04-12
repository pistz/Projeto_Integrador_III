import { CheckOutlined, CloseCircleFilled } from '@ant-design/icons';
import { Button, Divider, Form, FormProps, Input, Space } from 'antd';
import React, { useState } from 'react';
import { CategoryAPI } from '../../../../api/Category/CategoryAPI';
import { notifyError, notifySuccess } from '../../../shared/notify/notify';
import { SaveButton } from '../../../shared/saveButton/saveButton';
import { formItemStyle } from '../../../shared/styles/globalStyles';

interface Props {
  close: () => void;
}

export const CreateCategory: React.FC<Props> = ({ close }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form] = Form.useForm();

  const onFinish: FormProps<string>['onFinish'] = async (name: string) => {
    setIsLoading(true);
    try {
      const created = await CategoryAPI.create(name);
      notifySuccess(created.message);
    } catch (error) {
      notifyError(error);
    } finally {
      setIsLoading(false);
      form.resetFields();
      close();
    }
  };

  return (
    <>
      <Divider>Cadastrar Categoria de Produto</Divider>
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
            rules={[{ required: true, message: 'Nome é obrigatório' }]}
          >
            <Input type="text" disabled={isLoading} style={formItemStyle} />
          </Form.Item>

          <Space>
            <SaveButton
              icon={<CheckOutlined />}
              loading={isLoading}
              form={form}
              showText
            />

            <Button
              danger
              htmlType="button"
              onClick={close}
              icon={<CloseCircleFilled />}
            >
              Fechar
            </Button>
          </Space>
        </Form>
      </Space>
    </>
  );
};
