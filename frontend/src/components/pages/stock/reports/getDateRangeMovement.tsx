import { SortAscendingOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { StockAPI } from '../../../../api/Stock/StockAPI';
import { useAppContext } from '../../../../context/useAppContext';
import { notifyError } from '../../../shared/notify/notify';
import { PrintPage } from '../../../shared/print/PrintPage';
import { PrintButton } from '../../../shared/printButton/PrintButton';
import { Table } from '../../../shared/table/Table';
import { Movement, MovementSource, MovementType } from './types';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2rem;
`;
export const GetDateRangeMovement: React.FC = () => {
  const REPORT_NAME = 'Movimentações por Intervalo de Datas';
  const reportHeaders = [
    'Produto',
    'Marca',
    'Tipo',
    'Origem',
    'Quantidade',
    'Data:Hora',
    'Criado por',
    'Observações',
  ];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startingDate, setStartingDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [tableData, setTableData] = useState<Movement[]>([]);
  const [disableButton, setDisableButton] = useState<boolean>(true);

  const printFnRef = useRef<() => void>(null);

  const { productsList, productOptions } = useAppContext();

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

  const handleStartDatePicking = (date: Dayjs) => {
    const stringDate = dayjs(date).format('DD/MM/YYYY').toString();
    setStartingDate(stringDate);
  };

  const handleEndDatePicking = (date: Dayjs) => {
    const stringDate = dayjs(date).format('DD/MM/YYYY').toString();
    setEndDate(stringDate);
  };

  const handleLoadTable = async () => {
    setIsLoading(true);
    try {
      const movementsData = await StockAPI.getMovementsByDateRange(
        startingDate,
        endDate,
      );
      setTableData(movementsData);
    } catch (error) {
      notifyError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (startingDate && endDate) return;
  }, [startingDate, endDate]);

  useEffect(() => {
    if (tableData.length > 0) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [tableData]);

  const columns: ColumnsType<Movement> = [
    {
      title: reportHeaders[0],
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
      title: reportHeaders[1],
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
      title: reportHeaders[2],
      dataIndex: 'movement_type',
      render: (value: keyof typeof MovementType) =>
        MovementType[value] || value,
      sorter: (a, b) => a.movement_type.localeCompare(b.movement_type),
      sortIcon: () => <SortAscendingOutlined />,
    },
    {
      title: reportHeaders[3],
      dataIndex: 'movement_source',
      render: (value: keyof typeof MovementSource) =>
        MovementSource[value] || value,
      sorter: (a, b) => a.movement_source.localeCompare(b.movement_source),
      sortIcon: () => <SortAscendingOutlined />,
    },
    {
      title: reportHeaders[4],
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      sortIcon: () => <SortAscendingOutlined />,
    },
    {
      title: reportHeaders[5],
      dataIndex: 'movement_date',
      sorter: (a, b) => {
        const dateA = dayjs(a.movement_date)
          .format('DD/MM/YYYY hh:mm')
          .toString();
        const dateB = dayjs(b.movement_date)
          .format('DD/MM/YYYY hh:mm')
          .toString();
        return dateA.localeCompare(dateB);
      },
      sortIcon: () => <SortAscendingOutlined />,
      render: (value) => dayjs(value).format('DD/MM/YYYY hh:mm').toString(),
    },
    {
      title: reportHeaders[6],
      dataIndex: 'created_by',
      sorter: (a, b) => a.created_by.localeCompare(b.created_by),
      sortIcon: () => <SortAscendingOutlined />,
    },
    {
      title: reportHeaders[7],
      dataIndex: 'observations',
      sorter: (a, b) => {
        const obsA = a.observations || '';
        const obsB = b.observations || '';
        return obsA.localeCompare(obsB);
      },
      sortIcon: () => <SortAscendingOutlined />,
    },
  ];

  const rowMapper = (m: Movement) => {
    const product = productMap.get(m.product_id);
    const brand = brandMap.get(product?.brand_id!);

    return [
      product?.name || '',
      brand?.name || '',
      MovementType[m.movement_type as keyof typeof MovementType],
      MovementSource[m.movement_source as keyof typeof MovementSource],
      m.quantity,
      dayjs(m.movement_date).format('DD/MM/YYYY HH:mm'),
      m.created_by,
      m.observations,
    ];
  };

  return (
    <>
      <Divider>{REPORT_NAME}</Divider>
      <Container>
        <DatePicker
          format={'DD/MM/YYYY'}
          placeholder="Data Inicial"
          type="mask"
          style={{ width: '10rem' }}
          onChange={(date) => handleStartDatePicking(date)}
          required
        />

        <DatePicker
          format={'DD/MM/YYYY'}
          placeholder="Data Final"
          type="mask"
          style={{ width: '10rem' }}
          onChange={(date) => handleEndDatePicking(date)}
          required
        />
        <Button type="primary" onClick={handleLoadTable}>
          {' '}
          Buscar{' '}
        </Button>
        <PrintButton
          handlePrint={() => printFnRef.current?.()}
          disabled={disableButton}
          setMargin
          margin={0}
        />
      </Container>
      <Divider />

      <Table<Movement, typeof StockAPI>
        columns={columns}
        data={tableData}
        hiddenActions
        size="middle"
        loading={isLoading}
      />
      <PrintPage
        title={REPORT_NAME}
        headers={reportHeaders}
        triggerRef={printFnRef}
        rowMapper={rowMapper}
        tableData={tableData}
      />
    </>
  );
};
