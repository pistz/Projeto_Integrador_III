import { CheckOutlined, CloseCircleFilled } from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  FormProps,
  Input,
  Select,
  Space,
  Switch,
} from 'antd';
import React, { useState } from 'react';
import { ProductAPI } from '../../../../api/Product/ProductAPI';
import { useAppContext } from '../../../../context/useAppContext';
import { notifyError, notifySuccess } from '../../../shared/notify/notify';
import { SaveButton } from '../../../shared/saveButton/saveButton';
import { formItemStyle } from '../../welcome/styles';
import { Product } from './types';

interface Props {
  close: () => void;
}
export const CreateProduct: React.FC<Props> = ({ close }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasPack, setHasPack] = useState<boolean>(false);
  const { isFetchingOptions, productOptions } = useAppContext();

  const [form] = Form.useForm();

  const onFinish: FormProps<Product>['onFinish'] = async (product: Product) => {
    setIsLoading(true);
    try {
      const created = await ProductAPI.create(product);
      notifySuccess(created.message);
    } catch (error) {
      notifyError(error);
    } finally {
      setIsLoading(false);
      form.resetFields();
    }
  };

  const brandList = productOptions.brands.map((brand) => ({
    value: brand.id,
    label: brand.name,
  }));

  const categoryList = productOptions.categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <>
      <Divider>Cadastrar Produto</Divider>
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
          disabled={isFetchingOptions || isLoading}
        >
          <Form.Item
            name={['name']}
            label={'Nome do Produto'}
            rules={[{ required: true, message: 'Nome é obrigatório' }]}
          >
            <Input
              type="text"
              disabled={isLoading || isFetchingOptions}
              style={formItemStyle}
            />
          </Form.Item>

          <Form.Item
            name={['brand_id']}
            label={'Marca'}
            rules={[{ required: true, message: 'Marca é obrigatório' }]}
          >
            <Select
              disabled={isLoading || isFetchingOptions}
              showSearch
              optionFilterProp="label"
              options={brandList}
            />
          </Form.Item>

          <Form.Item
            name={['category_id']}
            label={'Categoria'}
            rules={[{ required: true, message: 'Categoria é obrigatório' }]}
          >
            <Select
              disabled={isLoading || isFetchingOptions}
              showSearch
              optionFilterProp="label"
              options={categoryList}
            />
          </Form.Item>

          <Space direction="horizontal">
            <Form.Item
              name={['has_pack']}
              label={'Possui pacote?'}
              initialValue={false}
            >
              <Switch
                unCheckedChildren={'Não'}
                checkedChildren={'Sim'}
                onChange={(checked: boolean) => setHasPack(checked)}
                value={hasPack}
              />
            </Form.Item>
            <Form.Item
              name={['pack_value']}
              label={'Quantidade'}
              style={{
                visibility: hasPack ? 'visible' : 'hidden',
                width: '5rem',
              }}
              rules={
                hasPack
                  ? [
                      { min: 0, message: 'Valor deve ser maior do que 0' },
                      {
                        max: 1000,
                        message: 'Valor deve ser menor do que 1000',
                      },
                      {
                        pattern: /^[0-9]+$/,
                        message: 'Valor deve ser um número',
                      },
                    ]
                  : []
              }
              initialValue={0}
            >
              <Input defaultValue={0} />
            </Form.Item>
          </Space>

          <Form.Item name={['description']} label={'Descrição do produto'}>
            <Input.TextArea
              disabled={isLoading || isFetchingOptions}
              autoSize={{ minRows: 3, maxRows: 3 }}
              style={{ resize: 'block' }}
            />
          </Form.Item>

          <Space direction="horizontal" size="large">
            <SaveButton
              icon={<CheckOutlined />}
              loading={isFetchingOptions || isLoading}
              form={form}
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
