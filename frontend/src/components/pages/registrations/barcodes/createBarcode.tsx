import { CheckOutlined, CloseCircleFilled } from '@ant-design/icons';
import { Button, Divider, Form, FormProps, Input, Select, Space } from 'antd';
import React, { useState } from 'react';
import { BarcodeAPI } from '../../../../api/Barcodes/BarcodesAPI';
import { useAppContext } from '../../../../context/useAppContext';
import { notifyError, notifySuccess } from '../../../shared/notify/notify';
import { SaveButton } from '../../../shared/saveButton/saveButton';
import { formItemStyle } from '../../../shared/styles/globalStyles';
import { CreateBarcode as CreateBarcodeType } from './types';

interface Props {
  close: () => void;
}

export const CreateBarcode: React.FC<Props> = ({ close }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [form] = Form.useForm();
  const { productsList } = useAppContext();

  const selectList = productsList.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  const onFinish: FormProps<CreateBarcodeType>['onFinish'] = async (
    barcode: CreateBarcodeType,
  ) => {
    setIsLoading(true);
    try {
      if (!selectedProduct) {
        notifyError('Produto não selecionado');
        return;
      }
      barcode.product_id = selectedProduct;
      const created = await BarcodeAPI.create(barcode);
      notifySuccess(created.message);
    } catch (error) {
      notifyError(error);
    } finally {
      setIsLoading(false);
      form.resetFields();
    }
  };

  return (
    <>
      <Divider>Cadastro de Código de Barras por Produto</Divider>
      <Space
        align="center"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
        }}
      >
        <Select
          allowClear
          style={{ width: '36rem', marginBottom: '1rem' }}
          disabled={isLoading}
          placeholder="Selecione um produto"
          onChange={(value) => setSelectedProduct(value)}
          options={selectList}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      </Space>
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
            name={['barcode']}
            label={'Código de Barras'}
            style={{ width: '36rem' }}
            rules={[{ required: true, message: 'Código é obrigatório' }]}
          >
            <Input type="text" disabled={isLoading} style={formItemStyle} />
          </Form.Item>

          <Space>
            <SaveButton
              icon={<CheckOutlined />}
              loading={isLoading}
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
