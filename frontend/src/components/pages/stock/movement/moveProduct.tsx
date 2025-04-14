import {
  BarcodeOutlined,
  CheckOutlined,
  CloseOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  FormProps,
  Input,
  Select,
  Space,
  Switch,
  Tooltip,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { ProductAPI } from '../../../../api/Product/ProductAPI';
import { StockAPI } from '../../../../api/Stock/StockAPI';
import { useAppContext } from '../../../../context/useAppContext';
import { notifyError, notifySuccess } from '../../../shared/notify/notify';
import { formItemStyle } from '../../../shared/styles/globalStyles';
import {
  MovementSource,
  MovementSourceTypeIn,
  MovementSourceTypeOut,
  MovementType,
  ProductMovement,
} from './types';

interface Props {
  movementType: MovementType;
  user: string;
  close: () => void;
}
export const MoveProduct: React.FC<Props> = ({ movementType, user, close }) => {
  const { productsList, isFetchingOptions } = useAppContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [registerPack, setRegisterPack] = useState<boolean>(false);
  const [hasPack, setHasPack] = useState<boolean>(false);
  const [packValue, setPackValue] = useState<number | null>(null);
  const [barcodeSearch, setBarcodeSearch] = useState<boolean>(false);

  const [form] = Form.useForm();

  const getMovementOptions = (movementType: MovementType): string[] => {
    if (movementType === MovementType.IN) {
      return Object.values(MovementSourceTypeIn);
    } else {
      return Object.values(MovementSourceTypeOut);
    }
  };
  const getMovementLabel = (movementType: MovementType): React.ReactNode => {
    if (movementType === MovementType.IN) {
      return (
        <Typography style={{ fontSize: '1rem', fontWeight: 'inherit' }}>
          <PlusSquareOutlined style={{ color: 'green', margin: '0.3rem' }} />
          Movimentação de Entrada
        </Typography>
      );
    } else {
      return (
        <Typography style={{ fontSize: '1rem', fontWeight: 'inherit' }}>
          <MinusSquareOutlined
            style={{ color: 'red', margin: '0.3rem' }}
            title="Movimentação de Saída"
          />
          Movimentação de Saída
        </Typography>
      );
    }
  };

  const onFinish: FormProps<ProductMovement>['onFinish'] = async (
    product: ProductMovement,
  ) => {
    setIsLoading(true);
    product.movement_type = movementType;
    product.created_by = user;
    product.quantity = registerPack
      ? Number(product.quantity) * (packValue ?? 1)
      : Number(product.quantity);
    try {
      const created = await StockAPI.move(product);
      notifySuccess(created.message);
      form.resetFields();
    } catch (error) {
      notifyError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchByBarcode = async (barcode: string) => {
    setIsLoading(true);
    try {
      const product = await ProductAPI.getByBarcode(barcode);
      notifySuccess('Produto encontrado: ' + product.name);
      setSelectedProduct(product.id);
      form.setFieldsValue({
        product_id: product.id,
        name: product.name,
      });
    } catch (error) {
      notifyError(error);
    } finally {
      setIsLoading(false);
      setBarcodeSearch(false);
    }
  };

  const selectList = productsList.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  useEffect(() => {
    if (!selectedProduct) {
      setRegisterPack(false);
      setHasPack(false);
      setPackValue(null);
    }
    if (selectedProduct) {
      const hasPack = productsList.find(
        (value) => value.id === selectedProduct,
      )?.has_pack;
      setHasPack(hasPack ?? false);
      const packValue = productsList.find(
        (value) => value.id === selectedProduct,
      )?.pack_value;
      setPackValue(packValue ?? null);
      form.setFieldsValue({
        product_id: selectedProduct,
      });
    }
  }, [selectedProduct, productsList]);

  useEffect(() => {
    if (!hasPack) {
      setRegisterPack(false);
    }
  }, [hasPack]);

  return (
    <>
      <Divider children={getMovementLabel(movementType)}></Divider>
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
          <Space
            align="center"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}
          >
            <Form.Item
              name={['product_id']}
              label={'Produto'}
              rules={[{ required: true, message: 'Produto é obrigatório' }]}
              style={formItemStyle}
            >
              {barcodeSearch ? (
                <Input
                  name="barcode"
                  disabled={isLoading || isFetchingOptions}
                  placeholder="Código de Barras"
                  onChange={(value) => searchByBarcode(value.target.value)}
                />
              ) : (
                <Select
                  disabled={isLoading || isFetchingOptions}
                  allowClear
                  showSearch
                  placeholder="Selecione um produto"
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  optionFilterProp="label"
                  options={selectList}
                  onChange={(value) => setSelectedProduct(value)}
                />
              )}
            </Form.Item>

            <Tooltip
              title={
                barcodeSearch
                  ? 'Desligar buscar pelo código de barras'
                  : 'Iniciar buscar pelo código de barras'
              }
              autoAdjustOverflow
            >
              <Button
                icon={<BarcodeOutlined />}
                style={{ marginTop: '0.3rem' }}
                type={barcodeSearch ? 'primary' : 'default'}
                onClick={() => setBarcodeSearch(!barcodeSearch)}
              />
            </Tooltip>
          </Space>

          <Form.Item
            name={['movement_source']}
            label={'Origem'}
            rules={[{ required: true, message: 'Origem é obrigatório' }]}
          >
            <Select disabled={isLoading || isFetchingOptions}>
              {getMovementOptions(movementType).map((option) => (
                <Select.Option value={option} key={option}>
                  {MovementSource[option as keyof typeof MovementSource]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Space
            style={{
              display: 'flex',
              margin: '0.1rem 0 1rem 0',
              justifyContent: 'space-between',
            }}
          >
            <Tooltip
              title={
                'Habilita ou desabilita o uso de quantidade de pacotes caso haja pacotes disponíveis'
              }
              autoAdjustOverflow
            >
              <Switch
                disabled={!hasPack || isLoading || isFetchingOptions}
                unCheckedChildren={'Pacote'}
                checkedChildren={'Pacote'}
                checked={registerPack && hasPack}
                onChange={(checked) => setRegisterPack(checked)}
              />
            </Tooltip>

            {!hasPack && <Typography>Não possui pacotes</Typography>}

            {hasPack && (
              <Typography
                className="pack-value"
                direction="rtl"
                style={{
                  visibility: registerPack ? 'visible' : 'hidden',
                }}
              >
                {registerPack ? `${packValue} Itens por pacote` : ''}
              </Typography>
            )}
          </Space>

          {registerPack && (
            <Form.Item
              name={['quantity']}
              label={'Quantidade de Pacotes'}
              rules={[
                { required: true, message: 'Quantidade é obrigatória' },
                { pattern: /[0-9]/, message: 'Apenas números' },
                { min: 1, message: 'Quantidade mínima é 1' },
              ]}
            >
              <Input disabled={isLoading || isFetchingOptions} />
            </Form.Item>
          )}

          {!registerPack && (
            <Form.Item
              name={['quantity']}
              label={'Quantidade Unitária'}
              rules={[
                { required: true, message: 'Quantidade é obrigatória' },
                { pattern: /[0-9]/, message: 'Apenas números' },
                { min: 1, message: 'Quantidade mínima é 1' },
              ]}
            >
              <Input disabled={isLoading || isFetchingOptions} />
            </Form.Item>
          )}

          <Form.Item
            name={['observations']}
            label={'Descrição da Movimentação'}
            rules={[{ required: true, message: 'Adicione uma descrição' }]}
          >
            <Input.TextArea
              disabled={isLoading || isFetchingOptions}
              autoSize={{ minRows: 3, maxRows: 3 }}
              style={{ resize: 'block' }}
            />
          </Form.Item>

          <Space
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              icon={<CheckOutlined />}
              loading={isLoading || isFetchingOptions}
            >
              Salvar
            </Button>
            <Button
              onClick={close}
              danger
              type="default"
              htmlType="button"
              icon={<CloseOutlined />}
              loading={isLoading || isFetchingOptions}
            >
              Cancelar
            </Button>
          </Space>
        </Form>
      </Space>
    </>
  );
};
