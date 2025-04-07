import { Config } from '../components/pages/config/Config';
import { Registrations } from '../components/pages/registrations/Registrations';
import { Stock } from '../components/pages/stock/Stock';
import { Welcome } from '../components/pages/welcome/Welcome';
import { appPath, Router } from './types';

export const mainRoutes: Router[] = [
  {
    label: 'Início',
    path: 'home',
    element: <Welcome />,
    get fullpath() {
      return `${appPath}${this.path}`;
    },
  },
  {
    label: 'Estoque',
    path: 'stock',
    element: <Stock />,
  },
  {
    label: 'Cadastros',
    path: 'registrations',
    element: <Registrations />,
  },
  {
    label: 'Configurações',
    path: 'config',
    element: <Config />,
  },
];
