import '../styles/calendar.css';
import { Calendar } from 'antd';
import type { Moment } from 'moment';
import { useEffect, useState } from 'react';
import CustomCalendarHeader from './headers/CustomCalendarHeader.tsx';
import moment from 'moment';
import { CalendarAPI } from '../services/calendarService';

interface CalendarViewProps {
  currentMonth: Moment;
  onPanelChange: (date: Moment) => void;
  selectedDate: Moment;
  onDateSelect: (date: Moment) => void;
}

export default function CalendarView({ 
  currentMonth,
  onPanelChange,
  selectedDate,
  onDateSelect
}: CalendarViewProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDateState, setSelectedDateState] = useState<Moment>(moment());

  // 월별 일정 조회 API 호출
  const fetchEvents = async () => {
    try {
      const data = await CalendarAPI.getMonthlyEvents(
        currentMonth.year(),
        currentMonth.month()
      );
      setEvents(data);
    } catch (error) {
      console.error('일정 조회 실패:', error instanceof Error ? error.message : error);
    }
  };

  // 월 변경 시 데이터 새로고침
  useEffect(() => {
    fetchEvents();
  }, [currentMonth]);

  // 캘린더 패널 변경 핸들러
  const handlePanelChange = (date: Moment) => {
    onPanelChange(date);
    fetchEvents();
  };

  // 헤더 컨트롤 핸들러
  const handleHeaderControl = (mode: 'prev' | 'next' | 'today') => {
    let newDate = currentMonth.clone();
    if (mode === 'prev') newDate.subtract(1, 'month').startOf('month');
    if (mode === 'next') newDate.add(1, 'month').startOf('month');
    if (mode === 'today') newDate = moment().startOf('day');
    onDateSelect(mode === 'today' ? newDate : newDate.startOf('month'));
    handlePanelChange(mode === 'today' ? newDate : newDate.startOf('month'));
  };

  const handleSelect = (date: Moment) => {
    onDateSelect(date);
  };

  // 날짜별 렌더링 처리
  const dateCellRender = (date: Moment) => {
    const dayEvents = events.filter(event => 
      date.isBetween(event.startDate, event.endDate, 'day', '[]')
    );

    return (
      <div className="calendar-events-container">
        {dayEvents.map(event => (
          <div
            key={event.id}
            className="calendar-event-badge"
            title={`${event.title}\n${event.description || ''}`}
          >
            {event.title}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="site-layout-content">
      <CustomCalendarHeader
        value={currentMonth}
        onPrev={() => handleHeaderControl('prev')}
        onNext={() => handleHeaderControl('next')}
        onToday={() => handleHeaderControl('today')}
      />
      <Calendar
        value={selectedDate}
        onSelect={handleSelect}
        dateCellRender={dateCellRender}
        onPanelChange={handlePanelChange}
        className="ant-picker-calendar"
        headerRender={() => null}
      />
    </div>
  );
}

interface CalendarEvent {
  id: number;
  title: string;
  startDate: Moment;
  endDate: Moment;
  description?: string;
} 