import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { BrandAPI } from '../../../../api/Brand/BrandAPI';
import { notifyError } from '../../../shared/notify/notify';
import { Table } from '../../../shared/table/Table';
import { Brand, EditableColumnType } from './types';

export const ListBrands: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [brands, setBrands] = useState<Brand[]>([]);

  const columns: EditableColumnType<Brand>[] = [
    {
      title: 'Nome da Marca',
      dataIndex: 'name',
      filters: brands.map((item) => ({
        text: item.name,
        value: item.name,
      })),
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value as string),
      key: 'brand-name',
      editable: true,
    },
  ];

  const loadBrands = async () => {
    setLoading(true);
    try {
      const brandData = await BrandAPI.getAll();
      setBrands(brandData);
    } catch (error) {
      notifyError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const handleDataUpdate = async () => {
    await loadBrands();
  };

  return (
    <>
      <Divider orientation="right">Marcas Cadastradas</Divider>
      <Divider
        orientation="right"
        variant="dotted"
      >{`Total: ${brands.length}`}</Divider>
      <Table<Brand, typeof BrandAPI>
        data={brands}
        columns={columns}
        loading={loading}
        size="small"
        api={BrandAPI}
        onDataUpdate={handleDataUpdate}
      />
    </>
  );
};
