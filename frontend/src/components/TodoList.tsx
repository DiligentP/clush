import { List, Checkbox, Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: TodoItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
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
  );
} 