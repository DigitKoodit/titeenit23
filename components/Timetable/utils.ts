import differenceInMinutes from 'date-fns/differenceInMinutes';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import round from 'lodash/round';
import upperCase from 'lodash/upperCase';
import { DEFAULT_HOURS_INTERVAL } from '.';
import type { Event } from './types';

export const getRowHeight = (from: number, to: number, totalHeight: number) => {
  const numberOfRows = to - from + 1;

  return round(totalHeight / numberOfRows, 5);
};

export const getDefaultDayLabel = (day: string) => upperCase(day);

export const getEventPositionStyles = ({
  event,
  hoursInterval,
}: {
  event: Event;
  hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
  rowHeight: number;
}) => {
  const startOfDay = setMinutes(
    setHours(event.startTime, hoursInterval.from),
    0
  );
  const minutesFromStartOfDay = round(
    differenceInMinutes(event.startTime, startOfDay)
  );
  const minutes = round(differenceInMinutes(event.endTime, event.startTime));

  return {
    height: (minutes * (320 / 2)) / 60 + 'px',
    marginTop: (minutesFromStartOfDay * (320 / 2)) / 60 + 160 + 'px',
  };
};

export const isOverlapping = (a: Event, b: Event) => {
  return (
    a.startTime.getTime() < b.endTime.getTime() &&
    b.startTime.getTime() < a.endTime.getTime()
  );
};
