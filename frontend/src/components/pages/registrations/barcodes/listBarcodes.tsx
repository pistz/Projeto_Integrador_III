import {
  CloseOutlined,
  DeleteOutlined,
  EditFilled,
  SaveFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Divider, List, Select, Skeleton, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { BarcodeAPI } from '../../../../api/Barcodes/BarcodesAPI';
import { useAppContext } from '../../../../context/useAppContext';
import { notifyError, notifySuccess } from '../../../shared/notify/notify';
import { Barcode, UpdateBarcode } from './types';

export const ListBarcodes: React.FC = () => {
  const { productsList } = useAppContext();

  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Barcode[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const editableRef = useRef<HTMLDivElement | null>(null);

  const selectList = productsList.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  const handleLoadTable = async () => {
    setIsLoading(true);
    try {
      if (!selectedProduct) {
        notifyError('Produto não selecionado');
        return;
      }
      const barcodeData =
        await BarcodeAPI.getBarcodeByProductId(selectedProduct);
      setTableData(barcodeData);
    } catch (error) {
      notifyError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      if (!selectedProduct) {
        notifyError('Produto não selecionado');
        return;
      }
      const response = await BarcodeAPI.delete(id);
      notifySuccess(response.message);
      setTableData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      notifyError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (id: number, request: UpdateBarcode) => {
    try {
      if (!selectedProduct) {
        notifyError('Produto não selecionado');
        return;
      }
      const response = await BarcodeAPI.update(id, request);
      notifySuccess(response.message);
    } catch (error) {
      notifyError(error);
    }
  };

  const handleEdit = (barcode: Barcode) => {
    setEditMode(true);
    setEditingId(barcode.id);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!editingId || !editableRef.current) return;

    const newValue = editableRef.current.textContent?.trim() || '';

    setIsLoading(true);
    try {
      await handleUpdate(editingId, {
        barcode: newValue,
        product_id: selectedProduct!,
      });
      await handleLoadTable();
    } finally {
      handleCancelEdit();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadTable();
  }, []);

  return (
    <>
      <Divider orientation="right">Códigos de Barra por Produto</Divider>
      <Space
        align="center"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
          marginBottom: '1rem',
        }}
      >
        <Select
          allowClear
          style={{ width: '36rem' }}
          disabled={isLoading || editMode}
          placeholder="Selecione um produto"
          options={selectList}
          onChange={(value) => setSelectedProduct(value)}
        />
        <Button
          type="primary"
          disabled={isLoading || !selectedProduct || editMode}
          onClick={handleLoadTable}
          loading={isLoading}
          icon={<SearchOutlined />}
        />
      </Space>
      <Divider
        orientation="right"
        children={tableData.length ? `Total: ${tableData.length}` : null}
      />
      <List
        loading={isLoading}
        dataSource={tableData}
        itemLayout="horizontal"
        renderItem={(item: Barcode) => (
          <List.Item
            actions={
              editingId === item.id
                ? [
                    <Button
                      key="save"
                      type="primary"
                      onClick={handleSave}
                      icon={<SaveFilled />}
                    />,
                    <Button
                      key="cancel"
                      danger
                      onClick={handleCancelEdit}
                      icon={<CloseOutlined />}
                    />,
                  ]
                : [
                    <Button
                      disabled={isLoading}
                      onClick={() => handleEdit(item)}
                      type="default"
                      key={'edit-btn'}
                      icon={<EditFilled style={{ color: 'blue' }} />}
                    />,
                    <Button
                      danger
                      disabled={isLoading || editMode}
                      onClick={() => handleDelete(item.id)}
                      key={'delete-btn'}
                      icon={<DeleteOutlined />}
                    />,
                  ]
            }
          >
            <Skeleton title={false} loading={isLoading} active>
              <List.Item.Meta
                key={item.id}
                description={
                  editingId === item.id ? (
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      ref={editableRef}
                      style={{
                        border: '1px solid #d9d9d9',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: '#f5f5f5',
                      }}
                    >
                      {item.barcode}
                    </div>
                  ) : (
                    item.barcode
                  )
                }
              />
            </Skeleton>
          </List.Item>
        )}
      ></List>
    </>
  );
};
