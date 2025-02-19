import { CalendarEvent } from '../types/calendar';
import { Moment } from 'moment';

const API_BASE = 'http://localhost:8080/api/calendar';

export const CalendarAPI = {
  // 월별 일정 조회
  getMonthlyEvents: async (year: number, month: number): Promise<CalendarEvent[]> => {
    const response = await fetch(`${API_BASE}/${year}/${month + 1}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`일정 조회 실패: ${errorText}`);
    }
    return response.json();
  },

  // 일정 생성
  createEvent: async (
    title: string,
    description: string,
    startDate: Moment,
    endDate: Moment,
    allDay: boolean,
    shareCode?: string
  ): Promise<CalendarEvent> => {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        allDay,
        shareCode
      })
    });
    if (!response.ok) throw new Error('일정 생성 실패');
    return response.json();
  },

  // 일정 수정
  updateEvent: async (
    id: number,
    title: string,
    description: string,
    startDate: Moment,
    endDate: Moment,
    allDay: boolean,
    shareCode?: string
  ): Promise<CalendarEvent> => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        allDay,
        shareCode
      })
    });
    if (!response.ok) throw new Error('일정 수정 실패');
    return response.json();
  },

  // 일정 삭제
  deleteEvent: async (id: number): Promise<void> => {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  },

  // 공유 코드 생성
  generateShareCode: async (eventId: number): Promise<string> => {
    const response = await fetch(`${API_BASE}/${eventId}/share`, { method: 'POST' });
    if (!response.ok) throw new Error('공유 코드 생성 실패');
    return response.text();
  },

  // 공유 일정 조회
  getSharedEvent: async (shareCode: string): Promise<CalendarEvent> => {
    const response = await fetch(`${API_BASE}/shared`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shareCode })
    });
    if (!response.ok) throw new Error('공유 일정 조회 실패');
    return response.json();
  }
}; 