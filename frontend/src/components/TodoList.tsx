import { List, Checkbox, Button, Popconfirm, Tabs } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: TodoItem[];
  currentFilter: 'all' | 'completed' | 'active';
  onFilterChange: (filter: 'all' | 'completed' | 'active') => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ 
  todos, 
  currentFilter,
  onFilterChange,
  onToggle, 
  onDelete 
}: TodoListProps) {
  return (
    <div className="todo-list-container">
      <Tabs
        activeKey={currentFilter}
        onChange={key => onFilterChange(key as any)}
        items={[
          { label: '전체', key: 'all' },
          { label: '완료', key: 'completed' },
          { label: '미완료', key: 'active' },
        ]}
      />
      <List
        dataSource={todos}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Popconfirm
                title="할일을 삭제하시겠습니까?"
                onConfirm={() => onDelete(item.id)}
              >
                <Button 
                  type="text" 
                  icon={<DeleteOutlined />} 
                  danger
                />
              </Popconfirm>
            ]}
          >
            <Checkbox
              checked={item.completed}
              onChange={() => onToggle(item.id)}
            >
              <span style={{ 
                marginLeft: 8,
                textDecoration: item.completed ? 'line-through' : 'none',
                opacity: item.completed ? 0.6 : 1
              }}>
                {item.title}
              </span>
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
} 