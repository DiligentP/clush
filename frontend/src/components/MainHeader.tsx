import { Layout, Typography, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import '../styles/MainHeader.css';

const { Header } = Layout;
const { Title } = Typography;

export default function MainHeader() {
  return (
    <Header className="app-header">
      <div className="header-content">
        <Button className="menu-button" icon={<MenuOutlined />} />
        <Title level={3} className="header-title">
          Clush Calendar
        </Title>
      </div>
    </Header>
  );
} 