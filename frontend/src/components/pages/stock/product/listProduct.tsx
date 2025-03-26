import React, { useEffect, useState } from 'react'
import { ProductId } from './types';
import { ColumnsType } from 'antd/es/table';
import { notifyError } from '../../../shared/notify/notify';
import { Divider } from 'antd';
import { ProductAPI } from '../../../../api/Product/ProductAPI';
import { Table } from '../../../shared/table/Table';
import { useAppContext } from '../../../../context/useAppContext';

export const ListProduct:React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductId[]>([]);
    const {productOptions} = useAppContext();
    
    const columns:ColumnsType<ProductId> = [
        {
            title:'Nome do Produto',
            dataIndex:'name',
            filterSearch:true,
            filterMode:'menu',
            onFilter: (value, record) => record.name.includes(value as string),
        },
        {
            title:'Marca do Produto',
            dataIndex:'brand_id',
            render: (value) => (productOptions.brands.map(brand => brand.id == value ? brand.name : null))
        },
        {
            title:'Categoria do Produto',
            dataIndex:'category_id',
            render: (value) => (productOptions.categories.map(category => category.id == value ? category.name : null))
        },

    ];

    const loadData = async () => {
        setLoading(true);
        try {
            const products = await ProductAPI.getAll();
            setProducts(products);
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
        <Divider>Produtos Cadastrados</Divider>

        <Table<ProductId, typeof ProductAPI>
            data={products}
            columns={columns}
            loading={loading}
            size='small'
            api={ProductAPI}
            onDataUpdate={handleDataUpdate}
        />
    </>
  )
}
