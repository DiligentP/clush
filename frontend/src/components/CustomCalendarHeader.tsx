import { Button, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { Moment } from 'moment';
import '../App.css';

interface CustomCalendarHeaderProps {
  value: Moment;
  onPrev: () => void;
  onNext: () => void;
}

export default function CustomCalendarHeader({ 
  value, 
  onPrev, 
  onNext, 
}: CustomCalendarHeaderProps) {
  return (
    <div className="compact-calendar-header">
      <Button 
        size="small"
        shape="circle" 
        icon={<LeftOutlined />} 
        onClick={onPrev}
        className="compact-nav-button"
      />
      <Typography.Title 
        level={5}
        className="compact-month-title"
      >
        {value.format('YYYY년 MM월')}
      </Typography.Title>
      <Button 
        size="small"
        shape="circle" 
        icon={<RightOutlined />} 
        onClick={onNext}
        className="compact-nav-button"
      />
    </div>
  );
} 