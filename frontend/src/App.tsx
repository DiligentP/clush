import { Calendar, Layout, Typography, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import { useState } from 'react';
import './App.css';
import moment from 'moment';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [mode, setMode] = useState<CalendarMode>('month');
  const [currentDate, setCurrentDate] = useState<moment.Moment>(moment());

  const handleMonthChange = (months: number) => {
    const newDate = currentDate.clone().add(months, 'month');
    setCurrentDate(newDate);
  };

  const onPanelChange = (value: moment.Moment, newMode: CalendarMode) => {
    setMode(newMode);
    setCurrentDate(value);
  };

  // 날짜 포맷팅 함수
  const formatMonthTitle = (date: moment.Moment) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long'
    }).format(date);
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
            value={currentDate}
            headerRender={({ value }) => (
              <div style={{
                padding: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transition: 'all 0.3s ease' // 애니메이션 추가
              }}>
                <Button
                  shape="circle"
                  icon={<LeftOutlined />}
                  onClick={() => handleMonthChange(-1)}
                  style={{ 
                    background: '#f0f0f0', 
                    border: 0,
                    transform: 'scale(1)',
                    ':hover': { transform: 'scale(1.1)' }
                  }}
                />
                <Title level={4} style={{ 
                  margin: 0,
                  opacity: 1,
                  transition: 'opacity 0.3s' 
                }}>
                  {value.format('YYYY년 MM월')}
                </Title>
                <Button
                  shape="circle"
                  icon={<RightOutlined />}
                  onClick={() => handleMonthChange(1)}
                  style={{ 
                    background: '#f0f0f0', 
                    border: 0,
                    transform: 'scale(1)',
                    ':hover': { transform: 'scale(1.1)' }
                  }}
                />
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
