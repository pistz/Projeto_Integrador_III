import React, { useCallback, useEffect, useState } from 'react'
import { useAppContext } from '../../../../context/useAppContext';
import { Divider } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Movement, MovementSource, MovementType } from './types';
import { notifyError } from '../../../shared/notify/notify';
import { StockAPI } from '../../../../api/Stock/StockAPI';
import { Table } from '../../../shared/table/Table';
import dayjs from 'dayjs';
import { SortAscendingOutlined } from '@ant-design/icons';

export const GetAllMovements:React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [movements, setMovements] = useState<Movement[]>([]);

  const {productsList, isFetchingOptions} = useAppContext();

  const columns: ColumnsType<Movement> = [
    {
        title: 'Nome do Produto',
        dataIndex: 'product_id',
        filters: productsList.map((item) => ({
            text: item.name,
            value: item.id
        })),
        filterSearch: true,
        sorter: (a, b) => {
            const nameA = productsList.find((value) => value.id === a.product_id)?.name || '';
            const nameB = productsList.find((value) => value.id === b.product_id)?.name || '';
            return nameA.localeCompare(nameB);
        },
        sortIcon: () => <SortAscendingOutlined />,
        render: (value) => productsList.find(product => product.id === value)?.name || null
    },
    {
        title: 'Tipo',
        dataIndex: 'movement_type',
        render: (value: keyof typeof MovementType) => MovementType[value] || value,
        sorter: (a, b) => a.movement_type.localeCompare(b.movement_type),
        sortIcon: () => <SortAscendingOutlined />,
    },
    {
        title: 'Origem',
        dataIndex: 'movement_source',
        render: (value: keyof typeof MovementSource) => MovementSource[value] || value,
        sorter: (a, b) => a.movement_source.localeCompare(b.movement_source),
        sortIcon: () => <SortAscendingOutlined />,
    },
    {
        title: 'Data:Hora',
        dataIndex: 'movement_date',
        sorter: (a, b) => dayjs(a.movement_date).valueOf() - dayjs(b.movement_date).valueOf(),
        sortIcon: () => <SortAscendingOutlined />,
        render: (value) => dayjs(value).format('DD/MM/YYYY HH:mm')
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
          return obsA.localeCompare(obsB)
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
  },[]);

  useEffect(() => {
      loadData()
  },[loadData]);

  return (
    <>
        <Divider>Relatório Geral de Movimentações</Divider>

        <Table<Movement, typeof StockAPI>
            data={movements}
            columns={columns}
            loading={loading||isFetchingOptions}
            size='large'
            hiddenActions
        />
    </>
  )
}
