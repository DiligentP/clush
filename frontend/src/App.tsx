import { useState } from 'react';
import { Layout, Button } from 'antd';
import useCalendar from './hooks/useCalendar';
import MainHeader from './components/MainHeader';
import CalendarView from './components/CalendarView';
import './App.css';
import moment, { Moment } from 'moment';
import NewEventModal from './components/modals/NewEventModal';
import NewTaskModal from './components/modals/NewTaskModal';

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
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [taskModalVisible, setTaskModalVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDateSelect = (date: Moment) => {
    setEventModalVisible(true);
  };

  return (
    <Layout className={`layout ${isMenuOpen ? 'drawer-open' : ''}`}>
      <MainHeader toggleMenu={toggleMenu} />
      <div className={`drawer ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-content">
          <Button 
            type="primary" 
            onClick={() => setEventModalVisible(true)}
            style={{ marginTop: 16 }}
          >
            새 일정 추가
          </Button>
          <Button 
            type="default" 
            onClick={() => setTaskModalVisible(true)}
            style={{ marginTop: 16, width: '100%' }}
          >
            새 할일 추가
          </Button>
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
          onDateSelect={handleDateSelect}
        />
      </Content>
      <NewEventModal
        visible={eventModalVisible}
        onCancel={() => setEventModalVisible(false)}
        onSubmit={(title) => {
          console.log('새 일정 추가:', title);
          setEventModalVisible(false);
        }}
      />
      <NewTaskModal
        visible={taskModalVisible}
        onCancel={() => setTaskModalVisible(false)}
        onSubmit={(title) => {
          console.log('새 할일 추가:', title);
          setTaskModalVisible(false);
        }}
      />
      <Footer className="app-footer">
        Clush Project ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
