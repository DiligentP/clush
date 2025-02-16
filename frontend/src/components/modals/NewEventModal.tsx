import { Modal, Form, Input, Button, DatePicker } from 'antd';
import moment, { Moment } from 'moment';

interface NewEventModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (title: string, startDate: Moment, endDate: Moment) => void;
  initialTitle?: string;
}

export default function NewEventModal({ 
  visible, 
  onCancel, 
  onSubmit,
  initialTitle = ''
}: NewEventModalProps) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit(
        values.title,
        values.dates[0].startOf('day'),
        values.dates[1].endOf('day')
      );
      form.resetFields();
    });
  };

  return (
    <Modal
      title="새 일정 추가"
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
      <Form form={form} layout="vertical" initialValues={{ title: initialTitle }}>
        <Form.Item
          name="title"
          label="제목"
          rules={[{ required: true, message: '제목을 입력해주세요' }]}
        >
          <Input placeholder="일정 제목을 입력하세요" />
        </Form.Item>

        <Form.Item
          name="dates"
          label="기간"
          rules={[
            { required: true, message: '기간을 선택해주세요' },
            () => ({
              validator(_, value) {
                if (!value || value[0].isBefore(value[1])) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('종료일은 시작일 이후여야 합니다'));
              },
            }),
          ]}
        >
          <DatePicker.RangePicker
            showTime={false}
            format="YYYY-MM-DD"
            disabledDate={(current) => current && current < moment().startOf('day')}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
} 