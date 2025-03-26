import React, { useState } from 'react'
import { Button, Divider, Form, FormProps, Input, Select, Space } from 'antd'
import { MovementSource, MovementSourceTypeIn, MovementSourceTypeOut, MovementType, ProductMovement } from './types'
import { useAppContext } from '../../../../context/useAppContext'
import { notifyError, notifySuccess } from '../../../shared/notify/notify'
import { ProductAPI } from '../../../../api/Product/ProductAPI'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

interface Props {
    movementType:MovementType,
    user:string,
    close:() => void;
}
export const MoveStock:React.FC<Props> = ({movementType, user, close}) => {

    const {productsList, isFetchingOptions} = useAppContext();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const getMovementOptions = (movementType: MovementType): string[] => {
        if (movementType === MovementType.IN) {
            return Object.values(MovementSourceTypeIn);
        } else {
            return Object.values(MovementSourceTypeOut);
        }
    };

    const [form] = Form.useForm()
  
    const onFinish: FormProps<ProductMovement>['onFinish'] = async (product: ProductMovement) => {
      product.movement_type = movementType
      product.created_by = user
      product.quantity = Number(product.quantity);
      setIsLoading(true);
      try {
        const created = await ProductAPI.move(product);
        notifySuccess(created.message);
      } catch (error) {
        notifyError(error);
      } finally{
        setIsLoading(false);
        form.resetFields();
      }
    };

  return (
    <>
        <Divider>Cadastrar Movimentação de Estoque</Divider>
        <Space align='center' style={{display:'flex', justifyContent:"center", alignContent:"center"}}>
          <Form
              form={form}
              clearOnDestroy={true}
              layout='vertical'
              onFinish={onFinish}
              disabled={isFetchingOptions}
          >
            <Form.Item 
              name={['product_id']} 
              label={'Produto'} 
              rules={[{required:true, message:'Produto é obrigatório'}]}
              >
                <Select disabled={isLoading || isFetchingOptions}>
                    {productsList.map((product) =>(
                  <Select.Option value={product.id}>{product.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name={['movement_source']}
              label={'Origem'}
              rules={[{required:true, message:'Origem é obrigatório'}]}
            >
              <Select disabled={isLoading || isFetchingOptions}>
                {getMovementOptions(movementType).map((option) =>(
                  <Select.Option value={option} key={option}>{MovementSource[option as keyof typeof MovementSource]}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item 
              name={['quantity']} 
              label={'Quantidade'}
              rules={[{required:true, message:'Quantidade é obrigatório'}]}
            >
              <Input
                disabled={isLoading || isFetchingOptions}
                type='number'
              />
            </Form.Item>


            <Form.Item 
              name={['observations']} 
              label={'Descrição da Movimentação'}
            >
              <Input.TextArea
                disabled={isLoading || isFetchingOptions}
                autoSize={{ minRows: 3, maxRows: 3 }}
                style={{ resize: 'block' }}
              />
            </Form.Item>

            <Space style={{display: 'flex', alignItems:'center', justifyContent:"space-evenly"}}>
                <Button type='primary' htmlType='submit' icon={<CheckOutlined />} loading={isLoading}>Salvar</Button>
                <Button onClick={close} danger type='default' htmlType='button' icon={<CloseOutlined />} loading={isLoading}>Cancelar</Button> 
            </Space>
          </Form>
        </Space>
      </>
  )
}
