import {
  CloseOutlined,
  DeleteFilled,
  EditFilled,
  SaveOutlined,
} from '@ant-design/icons';
import { Table as AntTable, Button, Form, Input, TableColumnsType } from 'antd';
import { ColumnType } from 'antd/es/table';
import { useState } from 'react';
import { EditableColumnType } from '../../pages/stock/brand/types';
import { DeleteButton } from '../deleteButton/DeleteButton';
import { notifyError, notifySuccess } from '../notify/notify';

type APIWithDeleteMethod = {
  delete: (id: number) => Promise<Response>;
  update: (id: number, data: any) => Promise<Response>; // update agora recebe dados
};

interface Entity {
  id?: number;
  [key: string]: any;
}

interface Response {
  message: string;
}

interface Props<T extends Entity, API extends APIWithDeleteMethod> {
  columns: TableColumnsType<T>;
  data: T[];
  size?: 'large' | 'middle' | 'small';
  loading: boolean;
  api?: API;
  hiddenActions?: boolean;
  onDataUpdate?: (updatedData: T[]) => void;
}

export const Table = <T extends Entity, API extends APIWithDeleteMethod>({
  columns,
  data,
  size,
  loading,
  api,
  onDataUpdate,
  hiddenActions,
}: Props<T, API>) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = (record: T) => record.id === editingKey;

  const edit = (record: T) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id ?? null);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const save = async (record: T) => {
    try {
      const updated = await form.validateFields();
      const id = record.id!;
      setIsLoading(true);

      const response = api ? await api.update(id, updated) : null;
      if (response) {
        notifySuccess(response.message);
      }

      const newData = data.map((item: T) =>
        item.id === id ? { ...item, ...updated } : item,
      );
      setEditingKey(null);
      if (onDataUpdate) {
        onDataUpdate(newData);
      }
    } catch (err) {
      notifyError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (record: T) => {
    const id = record.id!;
    setIsLoading(true);

    try {
      const response = api ? await api.delete(id) : null;
      if (response) notifySuccess(response.message);
      const newData = data.filter((item) => item.id !== id);
      if (onDataUpdate) onDataUpdate(newData);
    } catch (err) {
      notifyError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const mergedColumns: ColumnType<T>[] = [
    ...columns.map((col) => {
      const editableCol = col as EditableColumnType<T>;

      if (!editableCol.editable) return col;

      return {
        ...editableCol,
        onCell: (record: T) => ({
          record,
          inputType: 'text',
          dataIndex: editableCol.dataIndex,
          editing: isEditing(record),
        }),
      } as ColumnType<T>;
    }),
    {
      title: 'Ações',
      width: '6rem',
      align: 'center',
      key: 'actions',
      hidden: hiddenActions,
      render: (_: any, record: T) => {
        const editable = isEditing(record);
        return editable ? (
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'space-between',
            }}
          >
            <Button
              icon={<SaveOutlined />}
              type="primary"
              loading={isLoading}
              onClick={() => save(record)}
            />
            <Button
              icon={<CloseOutlined />}
              onClick={cancel}
              loading={isLoading}
              type="default"
            />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              icon={<EditFilled style={{ color: 'blue' }} />}
              onClick={() => edit(record)}
              loading={isLoading}
              disabled={!!editingKey || isLoading}
              key={'action-edit'}
              type="default"
            />
            <DeleteButton
              value={record}
              handleAction={() => handleDelete(record)}
              isLoading={isLoading}
              icon={<DeleteFilled />}
              disabled={!!editingKey || isLoading}
            />
          </div>
        );
      },
    } as ColumnType<T>,
  ];

  const EditableCell: React.FC<{
    editing: boolean;
    dataIndex: keyof T;
    record: T;
    inputType: string;
    children: React.ReactNode;
  }> = ({ editing, dataIndex, inputType, record, children, ...restProps }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex as string}
            style={{ margin: 0 }}
            rules={[{ required: true, message: 'Obrigatório' }]}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <Form form={form} component={false}>
      <AntTable
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        columns={mergedColumns as TableColumnsType<any>}
        dataSource={data}
        loading={loading}
        size={size ?? 'small'}
        rowClassName="editable-row"
        pagination={false}
        rowKey="id"
      />
    </Form>
  );
};
