import { Moment } from 'moment';

export interface CalendarHeaderProps {
  value: Moment;
  onMonthChange: (months: number) => void;
} 