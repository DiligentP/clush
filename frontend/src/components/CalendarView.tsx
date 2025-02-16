import '../styles/calendar.css';
import { Calendar } from 'antd';
import moment from 'moment';
import type { Moment } from 'moment';
import { useEffect, useState } from 'react';

import CustomCalendarHeader from './headers/CustomCalendarHeader';
import { CalendarAPI } from '../services/calendarService';
import type { CalendarViewProps, CalendarEvent } from '../types/calendar';

export default function CalendarView({ 
  currentMonth,
  onPanelChange,
  selectedDate,
  onDateSelect,
  onEventSelect
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

  const handleDragStart = (e: React.DragEvent, event: CalendarEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(event));
    e.currentTarget.classList.add('dragging');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('drop-over');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('dragging');
    // 모든 드롭 영역 하이라이트 제거
    document.querySelectorAll('.calendar-events-container').forEach(el => {
      el.classList.remove('drop-over');
    });
  };

  const handleDrop = async (e: React.DragEvent, date: Moment) => {
    e.preventDefault();
    const eventData = JSON.parse(e.dataTransfer.getData('text/plain'));
    const newStart = date.clone().startOf('day');
    const dayDiff = moment(eventData.endDate).diff(moment(eventData.startDate), 'days');

    try {
      await CalendarAPI.updateEvent(
        eventData.id,
        eventData.title,
        eventData.description,
        newStart,
        newStart.clone().add(dayDiff, 'days'),
        eventData.allDay
      );
      fetchEvents();
    } catch (error) {
      console.error('일정 이동 실패:', error);
    }
    e.currentTarget.classList.remove('drop-over');
    // 인접한 셀의 하이라이트도 제거
    (e.currentTarget as HTMLElement).closest('.ant-picker-cell')!
      .querySelectorAll('.calendar-events-container')
      .forEach(el => el.classList.remove('drop-over'));
  };

  // 날짜별 렌더링 처리
  const dateCellRender = (date: Moment) => {
    const dayEvents = events.filter(event => 
      date.isBetween(event.startDate, event.endDate, 'day', '[]')
    );

    return (
      <div 
        className="calendar-events-container"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, date)}
        onDragLeave={(e) => e.currentTarget.classList.remove('drop-over')}
      >
        {dayEvents.map(event => (
          <div
            key={event.id}
            className="calendar-event-badge"
            title={`${event.title}\n${event.description || ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onEventSelect(event);
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, event)}
            onDragEnd={handleDragEnd}
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