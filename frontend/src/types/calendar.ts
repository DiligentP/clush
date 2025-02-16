import { Moment } from 'moment';

export interface CalendarEvent {
  id: number;
  title: string;
  startDate: Moment;
  endDate: Moment;
  allDay?: boolean;
  description?: string;
}

export interface CalendarEventModalProps {
  visible: boolean;
  selectedDate: Moment;
  onCancel: () => void;
  onSubmit: (
    title: string, 
    description: string,
    isAllDay: boolean,
    startDate: Moment, 
    endDate: Moment
  ) => void;
  initialTitle?: string;
}

export interface CalendarViewProps {
  currentMonth: Moment;
  onPanelChange: (date: Moment) => void;
  selectedDate: Moment;
  onDateSelect: (date: Moment) => void;
} 