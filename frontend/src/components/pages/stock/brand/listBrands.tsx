import React, { useEffect, useState } from 'react'
import { Table } from '../../../shared/table/Table'
import { Brand } from './types'
import { ColumnsType } from 'antd/es/table'
import { Divider } from 'antd'
import { BrandAPI } from '../../../../api/Brand/BrandAPI'
import { notifyError } from '../../../shared/notify/notify'


export const ListBrands:React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [brands, setBrands] = useState<Brand[]>([]);
    
    const columns:ColumnsType<Brand> = [
        {
            title:'Nome da Marca',
            dataIndex:'name'
        }
    ]

    const loadBrands = async () => {
        setLoading(true);
        try {
            const brands = await BrandAPI.getAll();
            setBrands(brands);
        } catch (error) {
            notifyError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBrands()
    },[]);

    const handleDataUpdate = async () => {
        await loadBrands(); 
    };
    

  return (
    <>
        <Divider>Marcas Cadastradas</Divider>

        <Table<Brand, typeof BrandAPI>
            data={brands}
            columns={columns}
            loading={loading}
            size='small'
            api={BrandAPI}
            onDataUpdate={handleDataUpdate}
        />
    </>
  )
}
