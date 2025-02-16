import {useEffect, useState} from 'react';
import {Button, ConfigProvider, Layout, message} from 'antd';
import moment from 'moment';
import koKR from 'antd/es/locale/ko_KR';

// Components
import MainHeader from './components/MainHeader';
import CalendarView from './components/CalendarView';
import TodoList from './components/TodoList';
import NewTaskModal from './components/modals/NewTaskModal';
import CalendarEventModal from './components/modals/CalendarEventModal';

// Services & Styles
import {CalendarAPI} from './services/calendarService';
import './App.css';
import { CalendarEvent } from './types/calendar';
import { TodoAPI } from './services/todoService';

const { Content, Footer } = Layout;

moment.locale('ko');

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [currentMonth, setCurrentMonth] = useState<moment.Moment>(moment());
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>(undefined);

  useEffect(() => {
    TodoAPI.getAllTodos()
      .then(setTodos)
      .catch(error => {
        console.error('초기 데이터 로딩 실패:', error);
        message.error('할일 목록을 불러오지 못했습니다');
      });
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      setEventModalVisible(true);
    }
  }, [selectedEvent]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ConfigProvider locale={koKR}>
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
            <div style={{ marginTop: 24 }}>
              <TodoList
                todos={todos.filter(todo => {
                  if (filter === 'completed') return todo.completed;
                  if (filter === 'active') return !todo.completed;
                  return true;
                })}
                currentFilter={filter}
                onFilterChange={setFilter}
                onToggle={(id) => {
                  const targetTodo = todos.find(t => t.id === id);
                  if (!targetTodo) return;
                  
                  TodoAPI.updateTodoStatus(id, !targetTodo.completed)
                    .then(updatedTodo => {
                      setTodos(todos.map(todo => 
                        todo.id === id ? {...todo, completed: updatedTodo.completed} : todo
                      ));
                    })
                    .catch(error => {
                      message.error('상태 업데이트 실패');
                      // 변경 사항 롤백
                      setTodos(todos.map(todo => 
                        todo.id === id ? {...todo, completed: !todo.completed} : todo
                      ));
                    });
                }}
                onDelete={(id) => {
                  setTodos(todos.filter(todo => todo.id !== id));
                }}
                onEdit={(id, newTitle, newDescription) => {
                  TodoAPI.updateTodo(id, newTitle, newDescription, todos.find(t => t.id === id)?.completed || false)
                    .then(updatedTodo => {
                      setTodos(todos.map(todo => 
                        todo.id === id ? {...todo, title: newTitle, description: newDescription} : todo
                      ));
                      message.success('할일이 수정되었습니다');
                    })
                    .catch(error => message.error('할일 수정 실패'));
                }}
              />
            </div>
          </div>
        </div>
        <Content className="content" style={{ padding: '20px 50px' }}>
          <CalendarView 
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onPanelChange={(date: moment.Moment) => setCurrentMonth(date)}
            onDateSelect={setSelectedDate}
            onEventSelect={(event) => setSelectedEvent(event)}
          />
        </Content>
        <CalendarEventModal
          visible={eventModalVisible || !!selectedEvent}
          selectedDate={selectedDate}
          selectedEvent={selectedEvent}
          onCancel={() => {
            setEventModalVisible(false);
            setSelectedEvent(undefined);
          }}
          onSubmit={(title, description, isAllDay, start, end) => {
            if(selectedEvent) {
              CalendarAPI.updateEvent(selectedEvent.id, title, description, start, end, isAllDay)
                .then(() => {
                  setEventModalVisible(false);
                  setCurrentMonth(currentMonth.clone());
                  setSelectedEvent(undefined);
                })
            } else {
              CalendarAPI.createEvent(title, description, start, end, isAllDay)
                .then(() => {
                  setEventModalVisible(false);
                  setCurrentMonth(currentMonth.clone());
                })
            }
          }}
          onDelete={() => {
            if(selectedEvent) {
              CalendarAPI.deleteEvent(selectedEvent.id)
                .then(() => {
                  setEventModalVisible(false);
                  setCurrentMonth(currentMonth.clone());
                  setSelectedEvent(undefined);
                });
            }
          }}
        />
        <NewTaskModal
          visible={taskModalVisible}
          onCancel={() => setTaskModalVisible(false)}
          onSuccess={() => {
            TodoAPI.getAllTodos()
              .then(setTodos)
              .catch(error => message.error('할일 목록 갱신 실패'));
          }}
        />
        <Footer className="app-footer">
          Clush Project ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}
