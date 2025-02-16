import { CalendarEvent } from '../types/calendar';
import { Moment } from 'moment';

const API_BASE = '/api/calendar';

export const CalendarAPI = {
  // 월별 일정 조회
  getMonthlyEvents: async (year: number, month: number): Promise<CalendarEvent[]> => {
    const response = await fetch(`${API_BASE}/${year}/${month + 1}`);
    if (!response.ok) throw new Error('일정 조회 실패');
    return response.json();
  },

  // 일정 생성
  createEvent: async (
    title: string,
    description: string,
    startDate: Moment,
    endDate: Moment,
    allDay: boolean
  ): Promise<CalendarEvent> => {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        allDay
      })
    });
    if (!response.ok) throw new Error('일정 생성 실패');
    return response.json();
  }
}; 