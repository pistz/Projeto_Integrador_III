import { Roles } from '../api/Login/types';
import { Config } from '../components/pages/management/Config';
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
    roles: [Roles.ADMIN, Roles.REGISTER_ONLY, Roles.REPORT_ONLY],
  },
  {
    label: 'Estoque',
    path: 'stock',
    element: <Stock />,
    roles: [Roles.ADMIN, Roles.REGISTER_ONLY, Roles.REPORT_ONLY],
  },
  {
    label: 'Cadastros',
    path: 'registrations',
    element: <Registrations />,
    roles: [Roles.ADMIN, Roles.REGISTER_ONLY],
  },
  {
    label: 'Configurações',
    path: 'config',
    element: <Config />,
    roles: [Roles.ADMIN],
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export function filteredRoutes(userRole: string): Router[] {
  const filtered: Router[] = mainRoutes.filter((route) =>
    route.roles.includes(userRole),
  );
  return filtered;
}
