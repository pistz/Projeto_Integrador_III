import { Breadcrumb, FloatButton, Layout, Menu, theme } from 'antd';
import { Router } from '../../../routes/types';
import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { Logout } from '../../pages/logout/Logout';
import { useState } from 'react';

const { Header, Content, Footer } = Layout;

interface ISystemLayout {
  menu:Router[],
  children: React.ReactNode
}

export const SystemLayout:React.FC<ISystemLayout> = ({menu}:ISystemLayout) => {
  const [logout, setLogout] = useState<boolean>(false);

  const navigate:NavigateFunction = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = menu?.map((item: {label: string}, index:number) =>({
    key:index.toString(),
    label:`${item?.label}`,
}));

const handleLogout = () =>{
  setLogout(true)
}

const handleRedirect = (pages:Router[], key:string) =>{
  if(pages){
      const index = Number(key);
      navigate(`${pages[index]?.path}`);
  }
}

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
            background:"#fff"
          }}
        >
          <div className="demo-logo" />
          <Menu
            onClick={(e)=>{
              handleRedirect(menu, e.key);
            }}
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['0']}
            items={menuItems}
            style={{ flex: 1, minWidth: 0 }}
          />
          <FloatButton 
            type='default' 
            icon={< LogoutOutlined 
            style={{color:'#700606'}}/>} 
            style={{position:"static"}} 
            tooltip={'Sair'}
            onClick={handleLogout}
          />
        </Header>
        <Content
          style={{
            padding: '0 48px',
            flex: 1,
            overflowY: 'auto',
            minHeight:'70vh'
          }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{}</Breadcrumb.Item>
          </Breadcrumb>
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
        <Footer style={{ textAlign: 'center' }}>
            Repono - Gestão de Estoque - {new Date().getFullYear()} v1.0
        </Footer>
      </Layout>
      <Logout open={logout} close={() => setLogout(false)}/>
    </>
  );
};