import {
  BarcodeOutlined,
  CheckOutlined,
  CloseCircleFilled,
} from '@ant-design/icons';
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
import React, { useEffect, useState } from 'react';
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
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);

    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setFocusInput(true);
    } else {
      setFocusInput(false);
    }
  }, [selectedProduct]);

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
        <BarcodeOutlined />
        <p>Cadastro de Código de Barras : Produto</p>
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
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
        }}
      >
        <Select
          allowClear
          style={{
            marginBottom: '1rem',
            alignSelf: 'center',
            justifySelf: 'flex-start',
            width: isMobile ? '100%' : '36rem',
          }}
          direction="ltr"
          loading={isLoading}
          disabled={isLoading}
          placeholder="Selecione um produto"
          onChange={(value) => setSelectedProduct(value)}
          options={selectList}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />

        <Form
          form={form}
          clearOnDestroy={true}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name={['barcode']}
            label={'Código de Barras'}
            style={{ width: isMobile ? '100%' : '36rem' }}
            rules={[{ required: true, message: 'Código é obrigatório' }]}
          >
            <Input
              type="text"
              disabled={isLoading || !selectedProduct}
              style={formItemStyle}
              autoFocus={focusInput}
              placeholder="|||||||||||||||||"
            />
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
