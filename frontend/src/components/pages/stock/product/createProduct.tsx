import { Button, Divider, Form, FormProps, Input, Select, Space } from 'antd'
import React, { useState } from 'react'
import { CheckOutlined } from '@ant-design/icons';
import { notifyError, notifySuccess } from '../../../shared/notify/notify';
import { Product } from './types';
import { ProductAPI } from '../../../../api/Product/ProductAPI';
import { useAppContext } from '../../../../context/useAppContext';

interface Props {
    close: ()=> void
}
export const CreateProduct:React.FC<Props> = ({close}:Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {isFetchingOptions, productOptions} = useAppContext();

    const [form] = Form.useForm()
  
    const onFinish: FormProps<Product>['onFinish'] = async (product: Product) => {
      setIsLoading(true);
      try {
        const created = await ProductAPI.create(product);
        notifySuccess(created.message);
      } catch (error) {
        notifyError(error);
      } finally{
        setIsLoading(false);
        form.resetFields();
        close();
      }
    };
  
    return (
      <>
        <Divider>Cadastrar Produto</Divider>
        <Space align='center' style={{display:'flex', justifyContent:"center", alignContent:"center"}}>
          <Form
              form={form}
              clearOnDestroy={true}
              layout='vertical'
              onFinish={onFinish}
              disabled={isFetchingOptions}
          >
            <Form.Item 
              name={['name']} 
              label={'Nome do Produto'} 
              rules={[{required:true, message:'Nome é obrigatório'}]}
              >
                <Input 
                  type='text' 
                  disabled={isLoading||isFetchingOptions}
                />
            </Form.Item>

            <Form.Item
              name={['brand_id']}
              label={'Marca'}
              rules={[{required:true, message:'Marca é obrigatório'}]}
            >
              <Select disabled={isLoading || isFetchingOptions}>
                {productOptions.brands.map((brand) =>(
                  <Select.Option value={brand.id}>{brand.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>


            <Form.Item
              name={['category_id']}
              label={'Categoria'}
              rules={[{required:true, message:'Categoria é obrigatório'}]}
            >
              <Select disabled={isLoading || isFetchingOptions}>
                {productOptions.categories.map((category) =>(
                  <Select.Option value={category.id}>{category.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item 
              name={['description']} 
              label={'Descrição do produto'}
            >
              <Input.TextArea
                disabled={isLoading || isFetchingOptions}
                autoSize={{ minRows: 3, maxRows: 3 }}
                style={{ resize: 'block' }}
              />
            </Form.Item>

            <Button type='primary' htmlType='submit' icon={<CheckOutlined />} loading={isLoading}>Salvar</Button>
          </Form>
        </Space>
      </>
    )
}
