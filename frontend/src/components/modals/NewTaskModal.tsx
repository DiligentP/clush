import { Modal, Form, Input, Button, message } from 'antd';
import { TodoAPI } from '../../services/todoService';
import { useState } from 'react';

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

interface NewTaskModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function NewTaskModal({ 
  visible, 
  onCancel,
  onSuccess
}: NewTaskModalProps) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  // 할일 생성 핸들러
  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const values = await form.validateFields();
      
      await TodoAPI.createTodo(values.title, values.description);
      message.success('할일이 성공적으로 추가되었습니다');
      
      form.resetFields();
      onSuccess();
      onCancel();
    } catch (error) {
      console.error('할일 생성 오류:', error);
      message.error('할일 추가에 실패했습니다');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title="새 할일 추가"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          취소
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit}
          loading={submitting}
          disabled={submitting}
        >
          확인
        </Button>
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="할일 제목"
          rules={[{ required: true, message: '제목을 입력해주세요' }]}
        >
          <Input placeholder="할일 내용을 입력하세요" />
        </Form.Item>
        
        <Form.Item
          name="description"
          label="상세 설명"
        >
          <Input.TextArea rows={3} placeholder="추가 설명을 입력하세요 (선택사항)" />
        </Form.Item>
      </Form>
    </Modal>
  );
} 