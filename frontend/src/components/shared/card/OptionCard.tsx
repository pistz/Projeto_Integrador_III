import { Card } from 'antd'
import React, { ReactNode } from 'react'

type ActionsType = {
  key: string;
  component: ReactNode;
  onClick?: () => void;
};

interface Props{
    title:string,
    actions:ActionsType[]
}
export const OptionCard:React.FC<Props> = ({title, actions}:Props) => {
  return (

    <div style={{alignContent:"center", justifyContent:"center", textAlign:'center'}}>
      <Card
        title={title}
        variant='borderless'
        style={{
          width: '20rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
        }}
        type="inner"
        hoverable
        actions={actions.map((action) => (
          <div key={action.key} onClick={action.onClick} style={{ cursor: 'pointer' }}>
            {action.component}
          </div>
        ))}
      />
    </div>
  )
}
