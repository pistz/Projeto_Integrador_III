import { SortAscendingOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StockAPI } from '../../../../api/Stock/StockAPI';
import { useAppContext } from '../../../../context/useAppContext';
import { notifyError } from '../../../shared/notify/notify';
import { Table } from '../../../shared/table/Table';
import { Movement, MovementSource, MovementType } from './types';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 5rem;
`;
export const GetSingleDateMovement: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [targetDate, setTargetDate] = useState<string>('');
  const [tableData, setTableData] = useState<Movement[]>([]);

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

  const handleDatePicking = (date: Dayjs) => {
    const stringDate = dayjs(date).format('DD/MM/YYYY').toString();
    setTargetDate(stringDate);
  };

  const handleLoadTable = async () => {
    setIsLoading(true);
    try {
      const movementsData = await StockAPI.getMovementsByDate(targetDate);
      setTableData(movementsData);
    } catch (error) {
      notifyError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (targetDate) return;
  }, [targetDate]);

  const columns: ColumnsType<Movement> = [
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
      title: 'Tipo',
      dataIndex: 'movement_type',
      render: (value: keyof typeof MovementType) =>
        MovementType[value] || value,
      sorter: (a, b) => a.movement_type.localeCompare(b.movement_type),
      sortIcon: () => <SortAscendingOutlined />,
    },
    {
      title: 'Origem',
      dataIndex: 'movement_source',
      render: (value: keyof typeof MovementSource) =>
        MovementSource[value] || value,
      sorter: (a, b) => a.movement_source.localeCompare(b.movement_source),
      sortIcon: () => <SortAscendingOutlined />,
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      sortIcon: () => <SortAscendingOutlined />,
    },
    {
      title: 'Data:Hora',
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
      title: 'Criado por',
      dataIndex: 'created_by',
      sorter: (a, b) => a.created_by.localeCompare(b.created_by),
      sortIcon: () => <SortAscendingOutlined />,
    },
    {
      title: 'Observações',
      dataIndex: 'observations',
      sorter: (a, b) => {
        const obsA = a.observations || '';
        const obsB = b.observations || '';
        return obsA.localeCompare(obsB);
      },
      sortIcon: () => <SortAscendingOutlined />,
    },
  ];

  return (
    <>
      <Divider>Movimentações por dia específico</Divider>
      <Container>
        <DatePicker
          format={'DD/MM/YYYY'}
          placeholder="Selecione a data"
          type="mask"
          style={{ width: '10rem' }}
          onChange={(date) => handleDatePicking(date)}
          required
        />
        <Button type="primary" onClick={handleLoadTable}>
          {' '}
          Buscar{' '}
        </Button>
      </Container>
      <Divider />
      <Table<Movement, typeof StockAPI>
        columns={columns}
        data={tableData}
        hiddenActions
        size="middle"
        loading={isLoading}
      />
    </>
  );
};
