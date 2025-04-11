import { ColumnType } from 'antd/es/table';
import { Brand as BrandApiType } from '../../../../api/Brand/types';

export interface Brand extends BrandApiType {}

export type EditableColumnType<T> = ColumnType<T> & {
  editable?: boolean;
  dataIndex?: keyof T;
};
