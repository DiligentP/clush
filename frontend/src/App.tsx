import { useState } from 'react';
import { Layout } from 'antd';
import useCalendar from './hooks/useCalendar';
import MainHeader from './components/MainHeader';
import CalendarView from './components/CalendarView';
import './App.css';
import moment from 'moment';

const { Content, Footer } = Layout;

export default function App() {
  const { 
    mode, 
    currentDate, 
    setMode, 
    handleMonthChange, 
    setCurrentDate 
  } = useCalendar();
  const [isMenuOpen, setIsMenuOpen] = useState(true); // 메뉴가 기본으로 열린 상태 유지

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Layout className={`layout ${isMenuOpen ? 'drawer-open' : ''}`}>
      <MainHeader toggleMenu={toggleMenu} />
      <div className={`drawer ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-content">
          <h3>메뉴</h3>
          <ul>
            <li>캘린더 설정</li>
            <li>카테고리 관리</li>
            <li>알림 설정</li>
          </ul>
        </div>
      </div>
      <Content className="content" style={{ padding: '20px 50px' }}>
        <CalendarView
          currentDate={currentDate}
          mode={mode}
          onPanelChange={(date, newMode) => {
            if (newMode) {
              setMode(newMode);
            }
            setCurrentDate(date);
          }}
          onMonthChange={handleMonthChange}
          onToday={() => setCurrentDate(moment())}
        />
      </Content>
      <Footer className="app-footer">
        Clush Project ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
