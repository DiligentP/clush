import { Modal, Form, Input, Button } from 'antd';

interface NewTaskModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (title: string) => void;
}

export default function NewTaskModal({ 
  visible, 
  onCancel, 
  onSubmit
}: NewTaskModalProps) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit(values.title);
      form.resetFields();
    });
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
        <Button key="submit" type="primary" onClick={handleSubmit}>
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
      </Form>
    </Modal>
  );
} 