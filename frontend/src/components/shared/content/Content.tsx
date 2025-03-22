import React from 'react'
import { SystemLayout } from '../layout/SystemLayout'
import { mainRoutes } from '../../../routes/mainRoutes'
import { Outlet } from 'react-router-dom'


export const Content:React.FC = () => {

  return (
    <>
      <SystemLayout menu={mainRoutes} >
        <Outlet />
      </SystemLayout>
    </>
  )
}
