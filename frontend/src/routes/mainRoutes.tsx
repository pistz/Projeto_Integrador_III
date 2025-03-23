import { Config } from "../components/pages/config/Config";
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
      label: 'Estoque',
      path: 'stock',
      element: <NotFound />,
    },
    {
      label: 'Configurações',
      path: 'config',
      element: <Config />,
    },
  ];