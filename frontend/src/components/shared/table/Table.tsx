import { Table as AntTable, Button, RowProps, TableColumnsType } from 'antd';
import { useState } from 'react';
import { notifyError, notifySuccess } from '../notify/notify';

type APIWithDeleteMethod = {
  delete: (id: number) => Promise<Response>;
};

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
interface Entity extends Object {
  id?: number;
  product_id?: number;
}

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
interface Response extends Object {
  message: string;
}

interface Props<T, API extends APIWithDeleteMethod> {
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
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async (row: RowProps) => {
    const id = Number(row.id);
    setIsLoading(true);

    try {
      const response = api ? await api.delete(id) : null;
      if (response) {
        notifySuccess(response.message);
      }

      const updatedData = data.filter((item: T) => item.id !== id);

      if (onDataUpdate) {
        onDataUpdate(updatedData);
      }
    } catch (error) {
      notifyError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const tableColumns: TableColumnsType<T> = [
    ...columns,
    {
      title: 'Ações',
      width: '5rem',
      align: 'center',
      key: 'actions',
      hidden: hiddenActions,
      render: (value) => (
        <Button
          type="default"
          danger
          title="Deletar"
          onClick={() => handleOnClick(value)}
          loading={isLoading}
          key={'actions-delete'}
        >
          Deletar
        </Button>
      ),
    },
  ];

  return (
    <AntTable
      columns={tableColumns}
      dataSource={data}
      loading={loading}
      size={size ? size : 'small'}
      rowHoverable
      showSorterTooltip={{ target: 'sorter-icon' }}
      key={Math.random()}
    />
  );
};
