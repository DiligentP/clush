import { Modal, Form, Input, Button } from 'antd';
import { message } from 'antd';
import { CalendarAPI } from '../../services/calendarService';
import moment from 'moment';

interface ShareCodeModalProps {
  visible: boolean;
  initialValue?: string;
  onCancel: () => void;
  onSubmit: (code: string) => void;
}

export default function ShareCodeModal({
  visible,
  initialValue = '',
  onCancel,
  onSubmit
}: ShareCodeModalProps) {
  const [form] = Form.useForm();

  return (
    <Modal
      title="공유 코드 입력"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          취소
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={() => {
            form.validateFields()
              .then(async (values) => {
                try {
                  const event = await CalendarAPI.getSharedEvent(values.shareCode);
                  await CalendarAPI.createEvent(
                    event.title,
                    event.description,
                    moment(event.startDate),
                    moment(event.endDate),
                    event.allDay
                  );
                  message.success('공유된 일정이 추가되었습니다');
                  onSubmit(values.shareCode);
                } catch (error) {
                  message.error(error instanceof Error 
                    ? error.message 
                    : '일정 생성 중 오류가 발생했습니다'
                  );
                }
              })
              .catch(() => message.error('입력값을 확인해주세요'));
          }}
        >
          확인
        </Button>
      ]}
    >
      <Form
        form={form}
        initialValues={{ shareCode: initialValue }}
        layout="vertical"
      >
        <Form.Item
          name="shareCode"
          label="공유 코드"
          rules={[{ 
            pattern: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            message: '유효한 형식이어야 합니다' 
          }]}
        >
          <Input placeholder="공유받은 코드를 입력해주세요." />
        </Form.Item>
      </Form>
    </Modal>
  );
} 