import React, { useEffect, useState } from 'react'
import { ProductId } from './types';
import { ColumnsType } from 'antd/es/table';
import { notifyError } from '../../../shared/notify/notify';
import { Divider } from 'antd';
import { ProductAPI } from '../../../../api/Product/ProductAPI';
import { Table } from '../../../shared/table/Table';
import { useAppContext } from '../../../../context/useAppContext';
import { SortAscendingOutlined } from '@ant-design/icons';

export const ListProduct:React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductId[]>([]);
    const {productOptions} = useAppContext();
    
    const columns:ColumnsType<ProductId> = [
        {
            title:'Nome do Produto',
            dataIndex:'name',
            filters:products.map((item) => ({
                text:item.name,
                value:item.name
            })),
            filterSearch:true,
            sorter: (a, b) => a.name.length - b.name.length,
            sortIcon:()=> <SortAscendingOutlined/>,
            onFilter: (value, record) => record.name.includes(value as string),
            key:'name'
        },
        {
            title:'Marca do Produto',
            dataIndex:'brand_id',
            render: (value) => (productOptions.brands.map(brand => brand.id == value ? brand.name : null)),
            key:'brand_id'
        },
        {
            title:'Categoria do Produto',
            dataIndex:'category_id',
            render: (value) => (productOptions.categories.map(category => category.id == value ? category.name : null)),
            key:'category_id'
        },

    ];

    const loadData = async () => {
        setLoading(true);
        try {
            const productData = await ProductAPI.getAll();
            setProducts(productData);
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
