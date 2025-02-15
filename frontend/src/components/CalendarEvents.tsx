import { Badge, Tooltip } from 'antd';
import { Moment } from 'moment';

type EventType = 'success' | 'warning' | 'default' | 'processing' | 'error';

interface Event {
  type: EventType;
  content: string;
}

export default function CalendarEvents(date: Moment) {
  const events = getEventsForDate(date);

  return (
    <ul className="events">
      {events.map((event, index) => (
        <li key={index}>
          <Tooltip title={event.content}>
            <Badge status={event.type as EventType} />
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}

function getEventsForDate(date: Moment): Event[] {
  // Placeholder for fetching events
  return [
    { type: 'success', content: 'Event 1' },
    { type: 'warning', content: 'Event 2' },
  ];
} 