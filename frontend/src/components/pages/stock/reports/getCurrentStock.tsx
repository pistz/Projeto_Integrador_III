import { SortAscendingOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StockAPI } from '../../../../api/Stock/StockAPI';
import { useAppContext } from '../../../../context/useAppContext';
import { notifyError } from '../../../shared/notify/notify';
import { PrintPage } from '../../../shared/print/PrintPage';
import { PrintButton } from '../../../shared/printButton/PrintButton';
import { Table } from '../../../shared/table/Table';
import { CurrentStock } from './types';

export const GetCurrentStock: React.FC = () => {
  const REPORT_NAME = 'Estoque Total Atual';
  const reportHeaders = [
    'Produto',
    'Marca',
    'Quantidade',
    'Última Atualização',
  ];
  const { productsList, isFetchingOptions, productOptions } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<CurrentStock[]>([]);

  const printFnRef = useRef<() => void>(null);

  const brands = productOptions.brands;
  const productMap = new Map(productsList.map((p) => [p.id, p]));
  const brandMap = new Map(brands.map((b) => [b.id, b]));

  const brandFilters = Array.from(
    new Map(
      productsList
        .map((product) => {
          const brand = brandMap.get(product.brand_id);
          if (!brand?.id) return null;
          return [brand.id, { text: brand.name, value: brand.id }];
        })
        .filter(
          (item): item is [number, { text: string; value: number }] =>
            item !== null,
        ),
    ).values(),
  );

  const columns: ColumnsType<CurrentStock> = [
    {
      title: 'Nome do Produto',
      dataIndex: 'product_id',
      filters: productsList.map((item) => ({
        text: item.name,
        value: item.id,
      })),
      filterSearch: true,
      sorter: (a, b) => {
        const nameA =
          productsList.find((value) => value.id === a.product_id)?.name || '';
        const nameB =
          productsList.find((value) => value.id === b.product_id)?.name || '';
        return nameA.localeCompare(nameB);
      },
      sortIcon: () => <SortAscendingOutlined />,
      render: (value) =>
        productsList.find((product) => product.id === value)?.name || null,
    },
    {
      title: 'Marca',
      filters: brandFilters,
      filterSearch: true,
      onFilter: (value, record) => {
        const product = productMap.get(record.product_id);
        return product?.brand_id === value;
      },
      sortIcon: () => <SortAscendingOutlined />,
      sorter: (a, b) => {
        const brandAId = productMap.get(a.product_id)?.brand_id;
        const brandBId = productMap.get(b.product_id)?.brand_id;

        const brandAName = brandMap.get(brandAId!)?.name || '';
        const brandBName = brandMap.get(brandBId!)?.name || '';

        return brandAName.localeCompare(brandBName);
      },
      render: (_, record) => {
        const product = productMap.get(record.product_id);
        const brand = brandMap.get(product?.brand_id!);
        return brand?.name || null;
      },
    },
    {
      title: 'Quantidade',
      dataIndex: 'total_quantity',
      sorter: (a, b) => a.total_quantity - b.total_quantity,
      sortIcon: () => <SortAscendingOutlined />,
    },
    {
      title: 'Última Atualização',
      dataIndex: 'last_updated',
      sorter: (a, b) => {
        const dateA = dayjs(a.last_updated)
          .format('DD/MM/YYYY hh:mm')
          .toString();
        const dateB = dayjs(b.last_updated)
          .format('DD/MM/YYYY hh:mm')
          .toString();
        return dateA.localeCompare(dateB);
      },
      sortIcon: () => <SortAscendingOutlined />,
      render: (value) => dayjs(value).format('DD/MM/YYYY hh:mm').toString(),
    },
  ];

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

  const loadTableData = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentStock = await StockAPI.getCurrentStock();
      setTableData(currentStock);
    } catch (error) {
      notifyError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTableData();
  }, [loadTableData]);

  return (
    <>
      <Divider>{REPORT_NAME}</Divider>
      <PrintButton handlePrint={() => printFnRef.current?.()} />

      <Table<CurrentStock, typeof StockAPI>
        columns={columns}
        data={tableData}
        hiddenActions
        size="middle"
        loading={isLoading || isFetchingOptions}
      />

      <PrintPage
        title={REPORT_NAME}
        headers={reportHeaders}
        tableData={tableData}
        rowMapper={rowMapper}
        triggerRef={printFnRef}
      />
    </>
  );
};
