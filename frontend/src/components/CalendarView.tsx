import { Calendar, Badge } from 'antd';
import type { Moment } from 'moment';
import { useEffect, useState } from 'react';
import CustomCalendarHeader from './CustomCalendarHeader';
import moment from 'moment';

interface CalendarViewProps {
  currentMonth: Moment;
  onPanelChange: (date: Moment) => void;
}

export default function CalendarView({ 
  currentMonth,
  onPanelChange
}: CalendarViewProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());

  // 월별 일정 조회 API 호출
  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `/api/calendar/${currentMonth.year()}/${currentMonth.month() + 1}`
      );
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('일정 조회 실패:', error);
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
  const handleHeaderControl = (mode: 'prev' | 'next' | 'current') => {
    const newDate = currentMonth.clone();
    if (mode === 'prev') newDate.subtract(1, 'month');
    if (mode === 'next') newDate.add(1, 'month');
    setSelectedDate(newDate.startOf('month'));
    handlePanelChange(newDate);
  };

  const handleSelect = (date: Moment) => {
    setSelectedDate(date);
  };

  // 날짜별 렌더링 처리
  const dateCellRender = (date: Moment) => {
    const dayEvents = events.filter(event => 
      date.isBetween(event.startDate, event.endDate, 'day', '[]')
    );

    return (
      <div className="events">
        {dayEvents.map(event => (
          <Badge
            key={event.id}
            color={event.color}
            text={event.title}
            className="event-badge"
          />
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
  color: string;
} 