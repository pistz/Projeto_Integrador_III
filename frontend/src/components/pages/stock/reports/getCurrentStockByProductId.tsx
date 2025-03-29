import { Button, Divider, Input, Select, Skeleton, Space } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useAppContext } from '../../../../context/useAppContext'
import { CurrentStock } from './types'
import { StockAPI } from '../../../../api/Stock/StockAPI'
import { notifyError } from '../../../shared/notify/notify'
import dayjs from 'dayjs'

const Container = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  width:100%;
  gap:2rem;
`
export const GetCurrentStockByProductId:React.FC = () => {
    const [currentStock, setCurrentStock] = useState<CurrentStock|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<number|null>(null)
    const {productsList, isFetchingOptions} = useAppContext();

    const selectList = productsList.map((product) =>({
        value:product.id,
        label:product.name
    }));

    const handleProductSelection = (id:number) =>{
        setData(id);
    }

    const loadCurrentStock = async () =>{
        setIsLoading(true)
        try{
            if(data){
                const stock = await StockAPI.getCurrentStockByProductId(data)
                setCurrentStock(stock);
            }
        }catch(error){
            notifyError(error)
        }finally{
            setIsLoading(false);
        }
    }

    const productName = productsList.find((value => value.id === currentStock?.product_id))?.name
    const lastUpdate = dayjs(currentStock?.last_updated).format("DD/MM/YYYY hh:mm")


  return (
    <>
        <Divider>Selecione o produto</Divider>
        <Container>
            <Select 
                disabled={isFetchingOptions || isLoading} 
                showSearch 
                optionFilterProp="label" 
                options={selectList}
                style={{width:'30rem'}}
                onChange={(id) => handleProductSelection(id)}
            />
            <Button htmlType='button' type='primary' onClick={loadCurrentStock}>Buscar</Button>
        </Container>
        <Container>
            {currentStock ? 
            <>
                <Space style={{margin:'3rem 0'}}>
                    <Input addonBefore="Produto" value={productName} />
                    <Input addonBefore="Quantidade" value={currentStock.total_quantity} />
                    <Input addonBefore="Última atualização" value={lastUpdate} />
                </Space>
            </>
            : 
            <>
                <Skeleton.Input size='large' style={{margin:'3rem 0'}} /> 
                <Skeleton.Input size='large' style={{margin:'3rem 0'}} />
                <Skeleton.Input size='large' style={{margin:'3rem 0'}} />
            </>
            }
           
        </Container>
        
    </>
  )
}
