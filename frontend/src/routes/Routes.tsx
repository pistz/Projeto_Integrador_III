import {
  BrowserRouter,
  Navigate,
  Routes as ReactRouter,
  Route,
} from 'react-router-dom';
import { LoginScreen } from '../components/pages/login/Login';
import { Content } from '../components/shared/content/Content';
import { useAppContext } from '../context/useAppContext';
import { mainRoutes } from './mainRoutes';
import { appPath } from './types';

export const Routes: React.FC = () => {
  const { signed } = useAppContext();

  const ForbiddenAcces: React.FC = () => {
    return <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <ReactRouter>
        <Route path={'/'} element={<LoginScreen />} />
        <Route path={'/login'} element={<LoginScreen />} />

        <Route
          path={`${appPath}*`}
          element={signed ? <Content /> : <ForbiddenAcces />}
        >
          {mainRoutes.map((_, index) => (
            <Route
              path={mainRoutes[index].path}
              element={mainRoutes[index].element}
              key={`${index} mainRoute`}
            />
          ))}
        </Route>
      </ReactRouter>
    </BrowserRouter>
  );
};
