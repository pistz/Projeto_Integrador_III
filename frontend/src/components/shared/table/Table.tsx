import {Table as AntTable, Button, RowProps, TableColumnsType} from 'antd'
import { useState } from 'react'
import { notifyError, notifySuccess } from '../notify/notify';

type APIWithDeleteMethod = {
    delete: (id: any) => Promise<any>; 
};

interface Props<T, API extends APIWithDeleteMethod> {
    columns:TableColumnsType<T>,
    data:T[],
    size?:'large'|'middle'|'small',
    loading:boolean,
    api: API,
    onDataUpdate: (updatedData: T[]) => void
}
export const Table = <T extends object, API extends APIWithDeleteMethod>({columns, data, size, loading, api, onDataUpdate}:Props<T, API>) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleOnClick = async (row:RowProps) =>{
        const id = row.id
        setIsLoading(true)
        try {
            const response = await api.delete(id)
            notifySuccess(response.message)
            const updatedData = data.filter((item:T) => item.id !== id);
            onDataUpdate(updatedData);
        } catch (error) {
            notifyError(error)
        }finally{
            setIsLoading(false);
        }
    }

    const tableColumns:TableColumnsType<T> = [
        ...columns,
        {
            title:'Ações',
            width:'5rem',
            align:'center',
            render:(value) => (
            <Button type='default' danger title='Deletar' onClick={() => handleOnClick(value)} loading={isLoading}>
                Deletar
            </Button>
        )
        }
    ];

    return (
        <AntTable
            columns={tableColumns}
            dataSource={data}
            loading={loading}
            size={size? size:'small'}
            rowHoverable
            showSorterTooltip={{ target: 'sorter-icon' }}
    />
    )
}
