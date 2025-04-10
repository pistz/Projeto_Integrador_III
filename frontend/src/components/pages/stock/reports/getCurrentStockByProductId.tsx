import { Button, Divider, Input, Select, Skeleton } from 'antd';
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { StockAPI } from '../../../../api/Stock/StockAPI';
import { useAppContext } from '../../../../context/useAppContext';
import { notifyError } from '../../../shared/notify/notify';
import { PrintPage } from '../../../shared/print/PrintPage';
import { PrintButton } from '../../../shared/printButton/PrintButton';
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
  const REPORT_NAME = 'Estoque Atual';

  const [currentStock, setCurrentStock] = useState<CurrentStock | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<number | null>(null);

  const { productsList, isFetchingOptions, productOptions } = useAppContext();

  const printFnRef = useRef<() => void>(null);

  const reportHeaders = [
    'Produto',
    'Marca',
    'Quantidade',
    'Última Atualização',
  ];

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

  const productMap = new Map(productsList.map((p) => [p.id, p]));
  const brandMap = new Map(brands.map((b) => [b.id, b]));

  const rowMapper = (cs: CurrentStock) => {
    const product = productMap.get(cs.product_id);
    const brand = brandMap.get(product?.brand_id!);

    return [
      product?.name || '',
      brand?.name || '',
      cs.total_quantity,
      dayjs(cs.last_updated).format('DD/MM/YYYY HH:mm'),
    ];
  };

  const tableData = currentStock ? [currentStock] : [];

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
        <PrintButton
          handlePrint={() => printFnRef.current?.()}
          disabled={tableData.length === 0}
          setMargin
          margin={'-0.1rem'}
        />
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

      <PrintPage
        title={`${REPORT_NAME} - ${productName}`}
        headers={reportHeaders}
        tableData={tableData}
        rowMapper={rowMapper}
        triggerRef={printFnRef}
      />
    </>
  );
};
