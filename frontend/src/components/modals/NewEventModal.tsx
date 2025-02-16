import { Modal, Form, Input, Button, DatePicker, Checkbox } from 'antd';
import moment, { Moment } from 'moment';

interface NewEventModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (
    title: string, 
    description: string,
    isAllDay: boolean,
    startDate: Moment, 
    endDate: Moment
  ) => void;
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
    form
      .validateFields()
      .then(values => {
        const start = values.dates[0].startOf('day');
        const end = values.isAllDay 
          ? start.clone().endOf('day')
          : values.dates[1].endOf('day');

        onSubmit(
          values.title,
          values.description || '',
          values.isAllDay || false,
          start,
          end
        );
        form.resetFields();
      })
      .catch(() => {}); // 유효성 검사 실패 시 처리
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
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit}
          htmlType="submit"
        >
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
            ({ getFieldValue }) => ({
              validator(_, value) {
                const isAllDay = getFieldValue('isAllDay');
                if (!value) return Promise.resolve();
                
                if (isAllDay && !value[0].isSame(value[1], 'day')) {
                  return Promise.reject('하루 종일 일정은 동일한 날짜를 선택해야 합니다');
                }
                if (!isAllDay && !value[0].isBefore(value[1])) {
                  return Promise.reject('종료일은 시작일 이후여야 합니다');
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <DatePicker.RangePicker
            showTime={false}
            format="YYYY-MM-DD"
            disabledDate={(current) => current && current < moment().startOf('day')}
            style={{ width: '100%' }}
            disabled={form.getFieldValue('isAllDay')}
          />
        </Form.Item>

        <Form.Item
          name="isAllDay"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox 
            onChange={(e) => {
              const now = moment().startOf('day');
              form.setFieldsValue({ 
                dates: e.target.checked ? [now, now] : null
              });
            }}
          >
            종일 일정으로 설정
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="description"
          label="설명"
          rules={[{ max: 200, message: '200자 이내로 입력해주세요' }]}
        >
          <Input.TextArea 
            rows={3} 
            placeholder="일정에 대한 상세 설명을 입력하세요" 
          />
        </Form.Item>
      </Form>
    </Modal>
  );
} 