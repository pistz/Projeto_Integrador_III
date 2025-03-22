import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Router } from '../../../routes/types';

const { Header, Content, Footer } = Layout;

interface ISystemLayout {
  menu:Router[],
  children: React.ReactNode
}

export const SystemLayout:React.FC<ISystemLayout> = ({menu, children}:ISystemLayout) => {
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = menu?.map((item: {label: string}, index:number) =>({
    key:index.toString(),
    label:`${item?.label}`,
}));

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
          flex: 1,
          overflowY: 'auto',
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
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
          Repono - Gestão de Estoque - versão 1.0 ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};