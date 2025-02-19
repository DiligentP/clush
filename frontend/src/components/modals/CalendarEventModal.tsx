import { Modal, Form, Input, Button, DatePicker, Checkbox } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { CalendarEventModalProps } from '../../types/calendar';
import { message } from 'antd';
import { CalendarAPI } from '../../services/calendarService';

export default function CalendarEventModal({
  visible, 
  selectedDate, 
  selectedEvent,
  onCancel, 
  onSubmit,
  onDelete,
  onShare,
  initialTitle = '',
  setShareCodeModalVisible,
  tempShareCode
}: CalendarEventModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (selectedEvent) {
        form.setFieldsValue({
          title: selectedEvent.title,
          description: selectedEvent.description,
          dates: [
            moment(selectedEvent.startDate),
            moment(selectedEvent.endDate)
          ],
          isAllDay: selectedEvent.allDay
        });
        
        // 종일 일정인 경우 시간 선택기 비활성화
        if (selectedEvent.allDay) {
          form.setFieldsValue({
            dates: [
              moment(selectedEvent.startDate).startOf('day'),
              moment(selectedEvent.endDate).endOf('day')
            ]
          });
        }
      }
    }
  }, [visible, selectedEvent]);

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
          end,
          tempShareCode
        );
        form.resetFields();
      })
      .catch(() => {}); // 유효성 검사 실패 시 처리
  };

  return (
    <Modal
      title={selectedEvent ? "일정 수정" : "새 일정 추가"}
      open={visible}
      forceRender
      destroyOnClose={false}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={[
        selectedEvent && (
          <Button 
            key="delete" 
            danger 
            onClick={() => {
              onDelete?.();
              form.resetFields();
            }}
            style={{ position: 'absolute', left: 24, bottom: 16 }}
          >
            삭제
          </Button>
        ),
        !selectedEvent && (
          <Button
            key="share-code"
            onClick={() => {
              onCancel();
              setShareCodeModalVisible(true);
            }}
            style={{ position: 'absolute', left: 24, bottom: 16 }}
          >
            공유 코드 등록
          </Button>
        ),
        selectedEvent && (
          <Button 
            key="share" 
            onClick={() => {
              if(selectedEvent) {
                CalendarAPI.generateShareCode(selectedEvent.id)
                .then(code => {
                  navigator.clipboard.writeText(code)
                    .then(() => {
                      onCancel(); // 모달 닫기
                      message.success('공유 코드가 복사되었습니다. 다른 사용자에게 공유해주세요');
                    })
                    .catch(() => message.error('복사 실패'));
                })
                .catch(error => message.error('공유 코드 생성 실패'));
              }
            }}
            style={{ marginRight: 8 }}
          >
            공유
          </Button>
        ),
        <Button key="cancel" onClick={() => {
          form.resetFields();
          onCancel();
        }}>
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
      <Form 
        form={form} 
        layout="vertical" 
        preserve
      >
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
            disabled={!!selectedEvent?.allDay}
          />
        </Form.Item>

        <Form.Item
          name="isAllDay"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox 
            onChange={(e) => {
              const baseDate = form.getFieldValue('dates')?.[0] || selectedDate;
              form.setFieldsValue({ 
                dates: e.target.checked 
                  ? [baseDate.startOf('day'), baseDate.startOf('day')] 
                  : [baseDate, baseDate.add(1, 'hour')]
              });
            }}
          >
            하루 종일
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