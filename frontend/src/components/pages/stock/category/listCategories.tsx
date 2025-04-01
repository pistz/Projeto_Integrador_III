import { Divider } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { CategoryAPI } from '../../../../api/Category/CategoryAPI';
import { notifyError } from '../../../shared/notify/notify';
import { Table } from '../../../shared/table/Table';
import { Category } from './types';

export const ListCategories: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const columns: ColumnsType<Category> = [
    {
      title: 'Nome da Categoria',
      dataIndex: 'name',
      filters: categories.map((item) => ({
        text: item.name,
        value: item.name,
      })),
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value as string),
    },
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const categoryData = await CategoryAPI.getAll();
      setCategories(categoryData);
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDataUpdate = async () => {
    await loadData();
  };

  return (
    <>
      <Divider>Categorias Cadastradas</Divider>

      <Table<Category, typeof CategoryAPI>
        data={categories}
        columns={columns}
        loading={loading}
        size="small"
        api={CategoryAPI}
        onDataUpdate={handleDataUpdate}
      />
    </>
  );
};
