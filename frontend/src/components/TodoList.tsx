import { List, Checkbox, Button, Popconfirm, Tabs, Input, Form, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

import '../styles/TodoList.css'

interface TodoItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface TodoListProps {
  todos: TodoItem[];
  currentFilter: 'all' | 'completed' | 'active';
  onFilterChange: (filter: 'all' | 'completed' | 'active') => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDescription?: string) => void;
}

export default function TodoList({ 
  todos, 
  currentFilter,
  onFilterChange,
  onToggle, 
  onDelete,
  onEdit
}: TodoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  // 외부 클릭 감지 로직 추가
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (editingId && !e.composedPath().some((el: EventTarget) => 
        (el as HTMLElement)?.closest?.('.ant-list-item')
      )) {
        setEditingId(null);
        form.resetFields();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [editingId]);

  // 할일 제목 수정 처리
  const handleEditSubmit = (id: string) => {
    form.validateFields().then(values => {
      onEdit(id, values.title, values.description);
      setEditingId(null);
    });
  };

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
        locale={{ emptyText: '등록된 할일이 없습니다' }}
        style={{ marginTop: '8px' }}
        renderItem={(item) => (
          <List.Item
            className="todo-list-item"
            actions={[
              <div className="actions" key="actions" style={{ display: 'flex', gap: 8 }}>
                {editingId === item.id ? (
                  <Button
                    type="primary"
                    onClick={() => handleEditSubmit(item.id)}
                    icon={<CheckOutlined />}
                    style={{ padding: '0 8px', height: 24 }}
                  />
                ) : (
                  <Button
                    type="default"
                    icon={<EditOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingId(item.id);
                      form.setFieldsValue({ 
                        title: item.title, 
                        description: item.description 
                      });
                    }}
                    style={{ padding: '0 8px', height: 24 }}
                  />
                )}
                <Popconfirm
                  title="할일을 삭제하시겠습니까?"
                  onConfirm={() => onDelete(item.id)}
                >
                  <Button 
                    type="default" 
                    icon={<DeleteOutlined />} 
                    danger
                    style={{ padding: '0 8px', height: 24 }}
                  />
                </Popconfirm>
              </div>
            ]}
          >
            <Checkbox
              checked={item.completed}
              onChange={() => onToggle(item.id)}
              style={{ 
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                width: '70%'
              }}
            >
              {editingId === item.id ? (
                <Form form={form} component="div">
                  <Form.Item
                    name="title"
                    rules={[{ required: true, message: '제목을 입력해주세요' }]}
                    style={{ margin: 0, flexGrow: 1 }}
                  >
                    <Input 
                      autoFocus
                      placeholder="제목"
                      style={{ width: '100%', marginLeft: 8 }}
                      onPressEnter={() => handleEditSubmit(item.id)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    style={{ margin: '8px 0 0 8px', flexGrow: 1 }}
                  >
                    <Input.TextArea
                      placeholder="설명"
                      autoSize={{ minRows: 1, maxRows: 3 }}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Form>
              ) : (
                <Typography.Text
                  style={{ 
                    marginLeft: 8,
                    textDecoration: item.completed ? 'line-through' : 'none',
                    opacity: item.completed ? 0.6 : 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    flex: 1,
                    minWidth: 0,
                    maxWidth: '100%'
                  }}
                >
                  {item.title}
                  {item.description && (
                    <div className="todo-description">
                      {item.description}
                    </div>
                  )}
                </Typography.Text>
              )}
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
} 