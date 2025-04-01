import { useContext } from 'react';
import AppContext from './appContext';

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
