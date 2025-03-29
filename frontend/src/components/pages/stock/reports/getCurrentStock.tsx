import { Divider } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { Table } from '../../../shared/table/Table'
import { CurrentStock } from './types'
import { StockAPI } from '../../../../api/Stock/StockAPI'
import { ColumnsType } from 'antd/es/table'
import { useAppContext } from '../../../../context/useAppContext'
import { SortAscendingOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { notifyError } from '../../../shared/notify/notify'

export const GetCurrentStock:React.FC = () => {

  const {productsList, isFetchingOptions} = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<CurrentStock[]>([]);

  const columns: ColumnsType<CurrentStock> = [
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
      title: 'Quantidade',
      dataIndex: 'total_quantity',
      sorter: (a, b) => a.total_quantity - b.total_quantity,
      sortIcon: () => <SortAscendingOutlined />,
    },
    {
      title: 'Última Atualização',
      dataIndex: 'last_updated',
      sorter: (a, b) => {
          const dateA = dayjs(a.last_updated).format('DD/MM/YYYY hh:mm').toString();
          const dateB = dayjs(b.last_updated).format('DD/MM/YYYY hh:mm').toString();
          return dateA.localeCompare(dateB)
      },
      sortIcon: () => <SortAscendingOutlined />,
      render: (value) => dayjs(value).format('DD/MM/YYYY hh:mm').toString()
  },
];

  const loadTableData = useCallback(async () =>{
      setIsLoading(true)
      try{
        const currentStock = await StockAPI.getCurrentStock();
        setTableData(currentStock)

      }catch(error){
        notifyError(error);
      }finally{
        setIsLoading(false);
      }

  },[])

  useEffect(() =>{
    loadTableData()
  },[loadTableData])

  return (
    <>
      <Divider>Estoque Total Atual</Divider>
      <Table<CurrentStock, typeof StockAPI> 
          columns={columns}
          data={tableData}
          hiddenActions
          size='middle'
          loading={isLoading || isFetchingOptions}
      />
    </>
  )
}
