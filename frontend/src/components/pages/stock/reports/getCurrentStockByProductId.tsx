import { Button, Divider, Input, Select, Skeleton } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import styled from 'styled-components';
import { StockAPI } from '../../../../api/Stock/StockAPI';
import { useAppContext } from '../../../../context/useAppContext';
import { notifyError } from '../../../shared/notify/notify';
import { CurrentStock } from './types';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2rem;
`;

const ResponsiveResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-top: 2rem;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;

    input {
      width: 100% !important;
    }

    .ant-skeleton-input {
      width: 100% !important;
    }
  }
`;
export const GetCurrentStockByProductId: React.FC = () => {
  const [currentStock, setCurrentStock] = useState<CurrentStock | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<number | null>(null);
  const { productsList, isFetchingOptions, productOptions } = useAppContext();

  const brands = productOptions.brands;

  const selectList = productsList.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  const handleProductSelection = (id: number) => {
    setData(id);
  };

  const loadCurrentStock = async () => {
    setIsLoading(true);
    try {
      if (data) {
        const stock = await StockAPI.getCurrentStockByProductId(data);
        setCurrentStock(stock);
      }
    } catch (error) {
      notifyError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedProduct = productsList.find(
    (value) => value.id === currentStock?.product_id,
  );
  const productName = selectedProduct?.name;
  const brandName = brands.find(
    (b) => b.id === selectedProduct?.brand_id,
  )?.name;
  const lastUpdate = dayjs(currentStock?.last_updated).format(
    'DD/MM/YYYY hh:mm',
  );

  return (
    <>
      <Divider>Selecione o produto</Divider>
      <Container>
        <Select
          disabled={isFetchingOptions || isLoading}
          showSearch
          optionFilterProp="label"
          options={selectList}
          style={{ width: '30rem' }}
          onChange={(id) => handleProductSelection(id)}
        />
        <Button htmlType="button" type="primary" onClick={loadCurrentStock}>
          Buscar
        </Button>
      </Container>

      <ResponsiveResultContainer>
        {currentStock ? (
          <>
            <Input addonBefore="Produto" value={productName} />
            <Input addonBefore="Marca" value={brandName} />
            <Input
              addonBefore="Quantidade"
              value={currentStock.total_quantity}
            />
            <Input addonBefore="Atualização" value={lastUpdate} />
          </>
        ) : (
          <>
            <Skeleton.Input size="large" />
            <Skeleton.Input size="large" />
            <Skeleton.Input size="large" />
            <Skeleton.Input size="large" />
          </>
        )}
      </ResponsiveResultContainer>
    </>
  );
};
