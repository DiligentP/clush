import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import { Moment } from 'moment';
import CalendarHeader from './headers/CalendarHeader';
import CalendarEvents from './CalendarEvents';

interface CalendarViewProps {
  currentDate: Moment;
  mode: CalendarProps<Moment>['mode'];
  onPanelChange: (date: Moment, mode: CalendarProps<Moment>['mode']) => void;
  onMonthChange: (months: number) => void;
  onToday: () => void;
  onDateSelect: (date: Moment) => void;
}

export default function CalendarView({ 
  currentDate,
  mode,
  onPanelChange,
  onMonthChange,
  onToday,
  onDateSelect
}: CalendarViewProps) {
  return (
    <div className="calendar-container">
      <Calendar
        value={currentDate}
        mode={mode}
        onSelect={onDateSelect}
        onPanelChange={(date, mode) => onPanelChange(date, mode)}
        headerRender={({ value }) => (
          <CalendarHeader 
            value={value} 
            onMonthChange={onMonthChange} 
            onToday={onToday}
          />
        )}
        dateCellRender={CalendarEvents}
      />
    </div>
  );
} 