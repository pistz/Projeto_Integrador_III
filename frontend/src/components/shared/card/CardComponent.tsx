import React from 'react'

interface Props {
    title:string,
    component:React.ReactNode
}
export const CardComponent:React.FC<Props> = ({title, component}:Props) => {

  return (
    <>
        {component}
        <p>{title}</p>
    </>
  )
}
