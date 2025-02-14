import { Calendar, Layout, Typography } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import { useState } from 'react';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [mode, setMode] = useState<CalendarMode>('month');

  const onPanelChange = (value: any, newMode: CalendarMode) => {
    setMode(newMode);
  };

  return (
    <Layout className="layout">
      <Header style={{ 
        height: 64, 
        lineHeight: '64px',
        backgroundColor: '#001529', // Ant Design 기본 다크 블루
        padding: '0 24px 8px 24px' // 하단 패딩 8px 추가
      }}>
        <Title level={3} style={{ 
          color: 'white', 
          margin: 0,
          lineHeight: '56px', // 64px - 8px(하단 패딩) = 56px
          paddingTop: '8px' // 상단 패딩 추가
        }}>
          Clush 캘린더
        </Title>
      </Header>
      <Content style={{ padding: '20px 50px', minHeight: 'calc(100vh - 64px)' }}>
        <div className="site-layout-content">
          <Calendar 
            mode={mode}
            onPanelChange={onPanelChange}
            headerRender={({ value, type, onChange, onTypeChange }) => (
              <div style={{ padding: 10 }}>
                <Title level={4}>
                  {value.format('YYYY년 MM월')}
                </Title>
              </div>
            )}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Clush Project ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default App;
