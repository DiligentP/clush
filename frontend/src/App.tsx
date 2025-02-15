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

  return (
    <Layout className="layout">
      <MainHeader />
      <Content style={{ padding: '20px 50px' }}>
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
