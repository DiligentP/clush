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
      <Header style={headerStyles.container}>
        <Title level={3} style={headerStyles.title}>
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
              <div style={calendarHeaderStyles.container}>
                <Button
                  shape="circle"
                  icon={<LeftOutlined />}
                  onClick={() => handleMonthChange(-1)}
                  style={calendarHeaderStyles.button}
                />
                <Title level={4} style={calendarHeaderStyles.title}>
                  {value.format('YYYY년 MM월')}
                </Title>
                <Button
                  shape="circle"
                  icon={<RightOutlined />}
                  onClick={() => handleMonthChange(1)}
                  style={calendarHeaderStyles.button}
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

const headerStyles = {
  container: {
    height: 64,
    lineHeight: '64px',
    backgroundColor: '#001529',
    padding: '0 24px 8px 24px'
  },
  title: {
    color: 'white',
    margin: 0,
    lineHeight: '56px',
    paddingTop: '8px'
  }
};

const calendarHeaderStyles = {
  container: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    transition: 'all 0.3s ease'
  },
  button: {
    background: '#f0f0f0',
    border: 0,
    transform: 'scale(1)',
    ':hover': { transform: 'scale(1.1)' }
  },
  title: {
    margin: 0,
    opacity: 1,
    transition: 'opacity 0.3s'
  }
};
