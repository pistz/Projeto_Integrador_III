import { Logout } from "../components/pages/logout/Logout";
import { NotFound } from "../components/pages/notFound/NotFound";
import { Welcome } from "../components/pages/welcome/Welcome";
import { appPath, Router } from "./types";

export const mainRoutes: Router[] = [
    {
      label: 'Inicio',
      path: 'home',
      element: <Welcome />,
      get fullpath() {
        return `${appPath}${this.path}`;
      }
    },
    {
      label: 'Relatórios',
      path: 'report',
      element: <NotFound />,
    },
    {
      label: 'Estoque',
      path: 'stock',
      element: <NotFound />,
    },

    {
      label: 'Configurações',
      path: 'config',
      element: <NotFound />,
    },

    {
      label: 'Sair',
      path: 'logout',
      element: <Logout />,
    },

  ];