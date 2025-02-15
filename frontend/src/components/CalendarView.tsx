import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import { Moment } from 'moment';
import CalendarHeader from './headers/CalendarHeader';
import CalendarEvents from './CalendarEvents';

export default function CalendarView({ 
  currentDate,
  mode,
  onPanelChange,
  onMonthChange,
  onToday
}: {
  currentDate: Moment;
  mode: CalendarProps<Moment>['mode'];
  onPanelChange: (date: Moment, mode: CalendarProps<Moment>['mode']) => void;
  onMonthChange: (months: number) => void;
  onToday: () => void;
}) {
  return (
    <div className="calendar-container">
      <Calendar
        value={currentDate}
        mode={mode}
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