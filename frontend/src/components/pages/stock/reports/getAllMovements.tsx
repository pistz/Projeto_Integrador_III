import { SortAscendingOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { StockAPI } from '../../../../api/Stock/StockAPI';
import { useAppContext } from '../../../../context/useAppContext';
import { notifyError } from '../../../shared/notify/notify';
import { Table } from '../../../shared/table/Table';
import { Movement, MovementSource, MovementType } from './types';

export const GetAllMovements: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movements, setMovements] = useState<Movement[]>([]);

  const { productsList, isFetchingOptions } = useAppContext();

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

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const productData = await StockAPI.getAll();
      setMovements(productData);
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <Divider>Relatório Geral de Movimentações</Divider>

      <Table<Movement, typeof StockAPI>
        data={movements}
        columns={columns}
        loading={loading || isFetchingOptions}
        size="large"
        hiddenActions
      />
    </>
  );
};
