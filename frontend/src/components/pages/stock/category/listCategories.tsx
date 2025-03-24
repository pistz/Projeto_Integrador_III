import React, { useEffect, useState } from 'react'
import { Table } from '../../../shared/table/Table'
import { ColumnsType } from 'antd/es/table'
import { Divider } from 'antd'
import { notifyError } from '../../../shared/notify/notify'
import { Category } from './types'
import { CategoryAPI } from '../../../../api/Category/CategoryAPI'


export const ListCategories:React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [category, setCategory] = useState<Category[]>([]);
    
    const columns:ColumnsType<Category> = [
        {
            title:'Nome da Categoria',
            dataIndex:'name'
        }
    ]

    const loadData = async () => {
        setLoading(true);
        try {
            const categories = await CategoryAPI.getAll();
            setCategory(categories);
        } catch (error) {
            notifyError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData()
    },[]);

    const handleDataUpdate = async () => {
        await loadData(); 
    };
    

  return (
    <>
        <Divider>Categorias Cadastradas</Divider>

        <Table<Category, typeof CategoryAPI>
            data={category}
            columns={columns}
            loading={loading}
            size='small'
            api={CategoryAPI}
            onDataUpdate={handleDataUpdate}
        />
    </>
  )
}
