import { useState } from 'react';
import { Layout, Button, Modal } from 'antd';
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
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDateSelect = (date: Moment) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  return (
    <Layout className={`layout ${isMenuOpen ? 'drawer-open' : ''}`}>
      <MainHeader toggleMenu={toggleMenu} />
      <div className={`drawer ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-content">
          <Button 
            type="primary" 
            onClick={() => setModalVisible(true)}
            style={{ marginTop: 16 }}
          >
            새 일정 추가
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
      <Modal
        title={`일정 추가 - ${selectedDate?.format('YYYY년 MM월 DD일') || moment().format('YYYY년 MM월 DD일')}`}
        open={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="submit" type="primary" onClick={() => setModalVisible(false)}>
            확인
          </Button>
        ]}
      >
        <p>여기에 일정 입력 폼을 추가하세요</p>
      </Modal>
      <Footer className="app-footer">
        Clush Project ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
