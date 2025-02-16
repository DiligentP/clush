import { Moment } from 'moment';

export interface CalendarEvent {
  id: number;
  title: string;
  startDate: Moment;
  endDate: Moment;
  allDay?: boolean;
  description?: string;
} 