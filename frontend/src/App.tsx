import { Button, Layout, Typography } from 'antd';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <Title level={3} style={{ color: 'white', marginTop: 15 }}>
          Clush
        </Title>
      </Header>
      <Content style={{ padding: '50px 50px 0 50px', minHeight: 'calc(100vh - 64px)' }}>
        <div className="site-layout-content">
          <Button type="primary">Ant Design 버튼 예시</Button>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Clush Project ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default App;
