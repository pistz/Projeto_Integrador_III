import { Button, Divider, Input, Select, Skeleton, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { StockAPI } from '../../../../api/Stock/StockAPI';
import { useAppContext } from '../../../../context/useAppContext';
import { notifyError } from '../../../shared/notify/notify';
import { PrintPage } from '../../../shared/print/PrintPage';
import { PrintButton } from '../../../shared/printButton/PrintButton';
import { dayjsDateFormat } from '../../../utils/utils';
import { CurrentStock } from './types';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    .btn-container {
      display: 'flex';
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      gap: 1rem;
    }
  }
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
  const lastUpdate = dayjs(currentStock?.last_updated).format(dayjsDateFormat);

  const productMap = new Map(productsList.map((p) => [p.id, p]));
  const brandMap = new Map(brands.map((b) => [b.id, b]));

  const rowMapper = (cs: CurrentStock) => {
    const product = productMap.get(cs.product_id);
    const brand = brandMap.get(product?.brand_id!);

    return [
      product?.name || '',
      brand?.name || '',
      cs.total_quantity,
      dayjs(cs.last_updated).format(dayjsDateFormat),
    ];
  };

  const tableData = currentStock ? [currentStock] : [];

  return (
    <>
      <Divider>Selecione o produto</Divider>
      <Container>
        <Select
          allowClear
          disabled={isFetchingOptions || isLoading}
          showSearch
          optionFilterProp="label"
          options={selectList}
          style={{ width: '15rem' }}
          onChange={(id) => handleProductSelection(id)}
        />
        <span
          className="btn-container"
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <Button htmlType="button" type="primary" onClick={loadCurrentStock}>
            Buscar
          </Button>
          <PrintButton
            handlePrint={() => printFnRef.current?.()}
            disabled={tableData.length === 0}
            setMargin
            margin={'-0.1rem'}
          />
        </span>
      </Container>

      <ResponsiveResultContainer>
        {currentStock ? (
          <>
            <Space direction="vertical" style={{ gap: 15 }}>
              <Input addonBefore="Produto" value={productName} />
              <Input addonBefore="Marca" value={brandName} />
              <Input
                addonBefore="Quantidade"
                value={currentStock.total_quantity}
              />
              <Input addonBefore="Atualização" value={lastUpdate} />
            </Space>
          </>
        ) : (
          <>
            <Space direction="vertical" style={{ gap: 15 }}>
              <Skeleton.Input size="large" />
              <Skeleton.Input size="large" />
              <Skeleton.Input size="large" />
              <Skeleton.Input size="large" />
            </Space>
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
