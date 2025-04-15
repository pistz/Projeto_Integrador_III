import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../../context/useAppContext';
import { filteredRoutes } from '../../../routes/mainRoutes';
import { SystemLayout } from '../layout/SystemLayout';

export const Content: React.FC = () => {
  const { tokenUser } = useAppContext();
  const userFilteredRoutes = filteredRoutes(tokenUser?.roles!);

  return (
    <>
      <SystemLayout menu={userFilteredRoutes}>
        <Outlet />
      </SystemLayout>
    </>
  );
};
