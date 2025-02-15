import { Button } from 'antd';
import { CalendarHeaderProps } from '../../types/calendar';

export default function CalendarHeader({ value, onMonthChange, onToday }: CalendarHeaderProps & { onToday: () => void }) {
  return (
    <div className="calendar-header">
      <Button onClick={() => onMonthChange(-1)}>이전</Button>
      <span className="date-display">{value.format('YYYY년 M월')}</span>
      <Button onClick={() => onMonthChange(1)}>다음</Button>
      <Button onClick={onToday}>오늘</Button>
    </div>
  );
} 