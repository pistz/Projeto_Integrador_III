import { ColumnType } from 'antd/es/table';

export interface Brand {
  id: number;
  name: string;
}

export type EditableColumnType<T> = ColumnType<T> & {
  editable?: boolean;
  dataIndex?: keyof T;
};
