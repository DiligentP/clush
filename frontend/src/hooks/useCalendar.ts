import { useState } from 'react';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import moment, { Moment } from 'moment';

export default function useCalendar() {
  const [mode, setMode] = useState<CalendarMode>('month');
  const [currentDate, setCurrentDate] = useState<Moment>(moment());

  const handleMonthChange = (months: number) => {
    setCurrentDate(currentDate.clone().add(months, 'month'));
  };

  return {
    mode,
    currentDate,
    setMode,
    handleMonthChange,
    setCurrentDate
  };
} 