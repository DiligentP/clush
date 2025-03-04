import { Button, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { Moment } from 'moment';
import '../../App.css';

interface CustomCalendarHeaderProps {
  value: Moment;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CustomCalendarHeader({ 
  value, 
  onPrev, 
  onNext, 
  onToday, 
}: CustomCalendarHeaderProps) {
  return (
    <div className="compact-calendar-header">
      <Button 
        size="small"
        icon={<LeftOutlined />}
        onClick={onPrev}
        className="square-nav-button"
        style={{ borderRadius: '4px' }}
      />
      <Typography.Title 
        level={5}
        className="compact-month-title"
        style={{ margin: '0 12px' }}
      >
        {value.format('YYYY년 MM월')}
      </Typography.Title>
      <Button 
        size="small"
        icon={<RightOutlined />}
        onClick={onNext}
        className="square-nav-button"
        style={{ borderRadius: '4px' }}
      />
      <Button
        size="small"
        onClick={onToday}
        className="square-nav-button"
        style={{ 
          margin: '0 8px',
          fontWeight: 500,
          color: '#1890ff',
          borderColor: '#1890ff'
        }}
      >
        오늘
      </Button>
    </div>
  );
} 