import React, { useCallback, useEffect, useState } from 'react'
import { useAppContext } from '../../../../context/useAppContext';
import { Divider } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Movement, MovementSource, MovementType } from './types';
import { notifyError } from '../../../shared/notify/notify';
import { StockAPI } from '../../../../api/Stock/StockAPI';
import { Table } from '../../../shared/table/Table';
import dayjs from 'dayjs';

export const GetAllMovements:React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [movements, setMovements] = useState<Movement[]>([]);

  const {productsList, isFetchingOptions} = useAppContext();

  const columns:ColumnsType<Movement> = [
    {
        title:'Nome do Produto',
        dataIndex:'product_id',
        filters:productsList.map((item) => ({
            text:item.name,
            value:item.id
        })),
        filterSearch:true,
        render: (value) => (productsList.map(product => product.id === value ? product.name : null))
    },
    {
      title: 'Tipo',
      dataIndex: 'movement_type',
      render: (value: keyof typeof MovementType) => MovementType[value] || value
    },
    {
      title:'Origem',
      dataIndex:'movement_source',
      render: (value: keyof typeof MovementSource) => MovementSource[value] || value
    },
    {
      title:'Data:Hora',
      dataIndex:'movement_date',
      render:(value) => dayjs(value).format('DD/MM/YYYY HH:mm')
    },

    {
      title:'Criado por',
      dataIndex:'created_by',
    },
    {
      title:'Observações',
      dataIndex:'observations',
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
