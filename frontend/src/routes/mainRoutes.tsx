import { NotFound } from "../components/pages/notFound/NotFound";
import { Welcome } from "../components/pages/welcome/Welcome";
import { Router } from "./types";

export const mainRoutes: Router[] = [
    {
      label: 'Inicio',
      path: 'home',
      element: <Welcome />,
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
      label: 'Configuraçoes',
      path: 'config',
      element: <NotFound />,
    },

    {
      label: 'Sair',
      path: 'logout',
      element: <NotFound />,
    },

  ];