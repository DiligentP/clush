import { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';
import MainHeader from './components/MainHeader';
import './App.css';
import NewEventModal from './components/modals/NewEventModal';
import NewTaskModal from './components/modals/NewTaskModal';
import TodoList from './components/TodoList';
import CalendarView from './components/CalendarView';
import moment from 'moment';

const { Content, Footer } = Layout;

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [currentMonth, setCurrentMonth] = useState(moment());

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
                setTodos(todos.map(todo => 
                  todo.id === id ? {...todo, completed: !todo.completed} : todo
                ));
              }}
              onDelete={(id) => {
                setTodos(todos.filter(todo => todo.id !== id));
              }}
            />
          </div>
        </div>
      </div>
      <Content className="content" style={{ padding: '20px 50px' }}>
        <CalendarView 
          currentMonth={currentMonth}
          onPanelChange={(date) => {
            setCurrentMonth(date);
            console.log('월 변경:', date.format('YYYY-MM'));
          }}
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

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}
