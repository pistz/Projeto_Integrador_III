import {
  FolderOpenTwoTone,
  FolderTwoTone,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { FloatButton, Layout, Menu, theme } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom';
import { loadSystemVersion } from '../../../config/loadEnv';
import { isTokenExpired } from '../../../config/token';
import { Router } from '../../../routes/types';
import { Logout } from '../../pages/logout/Logout';
import { UserSettings } from '../../pages/userSettings/UserSettings';
import { Alert } from '../alert/Alert';
import { Modal } from '../modal/Modal';

const { Header, Content, Footer } = Layout;
const SYSTEM_VERSION = loadSystemVersion();

interface ISystemLayout {
  menu: Router[];
  children: React.ReactNode;
}

export const SystemLayout: React.FC<ISystemLayout> = ({
  menu,
}: ISystemLayout) => {
  const [expired, setExpired] = useState<boolean>(false);
  const [logout, setLogout] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = menu?.map((item: { label: string }, index: number) => ({
    key: index.toString(),
    label: `${item?.label}`,
  }));

  const handleLogout = () => {
    setLogout(true);
  };

  const checkTokenIsExpired = useCallback(() => {
    const isExpired = isTokenExpired();
    setExpired((prev) => (prev !== isExpired ? isExpired : prev));
  }, []);

  const handleRedirect = (pages: Router[], key: string) => {
    if (pages) {
      const index = Number(key);
      navigate(`${pages[index]?.path}`);
    }
  };

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    checkTokenIsExpired();

    const interval = setInterval(() => {
      checkTokenIsExpired();
    }, 30000);

    return () => clearInterval(interval);
  }, [checkTokenIsExpired]);

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
          }}
        >
          <div className="demo-logo" />
          <Menu
            onClick={(e) => {
              handleRedirect(menu, e.key);
            }}
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['0']}
            items={menuItems}
            style={{ flex: 1, minWidth: 0 }}
          />
          <FloatButton.Group
            style={{ position: 'static' }}
            shape="circle"
            key={'down'}
            placement="bottom"
            trigger="hover"
            type="default"
            closeIcon={<FolderOpenTwoTone />}
            icon={<FolderTwoTone />}
          >
            <FloatButton
              icon={<UserOutlined />}
              tooltip={'Meu usuário'}
              type="primary"
              style={{ margin: '0.5rem 0 0 0' }}
              onClick={openModal}
            />
            <FloatButton
              type="primary"
              icon={<LogoutOutlined />}
              tooltip={'Sair'}
              onClick={handleLogout}
            />
          </FloatButton.Group>
        </Header>
        <Content
          style={{
            padding: '0 2rem',
            margin: '2.5rem 0',
            flex: 1,
            overflowY: 'auto',
            minHeight: '70vh',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 380,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{ textAlign: 'center', marginTop: '0', paddingTop: '0' }}
        >
          {SYSTEM_VERSION} - {new Date().getFullYear()}
        </Footer>
      </Layout>

      <Modal
        open={open}
        onCancel={closeModal}
        modalContent={<UserSettings />}
      />
      <Logout open={logout} onClose={() => setLogout(false)} />
      <Alert expired={expired} />
    </>
  );
};
