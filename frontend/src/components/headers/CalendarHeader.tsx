import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CalendarHeaderProps } from '../../types/calendar';

export default function CalendarHeader({ value, onMonthChange, onToday }: CalendarHeaderProps & { onToday: () => void }) {
  return (
    <div className="calendar-header">
      <Button onClick={() => onMonthChange(-1)} icon={<LeftOutlined />} />
      <span className="date-display">{value.format('YYYY년 M월')}</span>
      <Button onClick={() => onMonthChange(1)} icon={<RightOutlined />} />
      <Button onClick={onToday}>오늘</Button>
    </div>
  );
} 