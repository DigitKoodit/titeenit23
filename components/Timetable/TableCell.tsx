'use client';

import { Fragment, ReactNode } from 'react';
import { TimetableData } from '.';

const TableCellStyled = ({ children }: { children: React.ReactNode }) => (
  <td className="h-20 align-top relative table-cell p-0">{children}</td>
);

const getEventThisTime = (
  day: string,
  currTime: number,
  data: TimetableData[]
) => {
  const checkIfTimeIsBetween = (time: number, start: string, end: string) => {
    return (
      time >= Number(start.split(':')[0]) && time <= Number(end.split(':')[0])
    );
  };

  return data.filter(
    (data) =>
      data.day === day &&
      (Number(data.startTime.split(':')[0]) === Math.floor(currTime) ||
        Number(data.endTime.split(':')[0]) === Math.floor(currTime) ||
        checkIfTimeIsBetween(currTime, data.startTime, data.endTime))
  );
};

const isStartOfEvent = (
  day: string,
  currTime: number,
  event: TimetableData
) => {
  return (
    event.day === day &&
    Number(event.startTime.split(':')[0]) === Math.floor(currTime)
  );
};

const isEndOfEvent = (day: string, currTime: number, event: TimetableData) => {
  return (
    event.day === day &&
    Number(event.endTime.split(':')[0]) === Math.floor(currTime)
  );
};

const getEventHeight = (
  time: 'endTime' | 'startTime',
  event: TimetableData
) => {
  if (!event) return 0;

  const end = Number(event[time].split(':')[1]);

  if (end === 0 && time === 'startTime') return 100;
  return (end / 60) * 100;
};

export const TableCell = ({
  hour,
  day,
  data,
  children,
}: {
  hour?: number;
  day?: string;
  children?: ReactNode;
  data: TimetableData[];
}) => {
  if (children || !hour || !day) {
    return <TableCellStyled>{children}</TableCellStyled>;
  }

  const events = getEventThisTime(day, hour, data);

  if (!events) return <TableCellStyled>{children}</TableCellStyled>;

  const elements = [];

  for (const event of events) {
    if (isStartOfEvent(day, hour, event)) {
      const height = getEventHeight('startTime', event);
      elements.push(
        <div
          style={{
            position: 'absolute',
            top: `${100 - height}%`,
            height: `${height}%`,
          }}
          className="w-full z-10 bg-slate-600 border-t border-l border-r flex flex-row space-x-4"
        >
          <p>{event?.title}</p>
          <span>{`${event?.startTime} - ${event?.endTime}`}</span>
        </div>
      );
    }

    if (isEndOfEvent(day, hour, event)) {
      elements.push(
        <div
          style={{ height: `${getEventHeight('endTime', event)}%` }}
          className="w-full bg-slate-600 z-10 border-r border-l border-b"
        />
      );
    }
  }

  if (elements.length > 0) {
    return (
      <TableCellStyled>
        {elements.map((el, i) => (
          <Fragment key={day + hour + i}>{el}</Fragment>
        ))}
      </TableCellStyled>
    );
  }

  return (
    <TableCellStyled>
      {events.length !== 0 && (
        <div className="w-full h-full bg-slate-600 z-10 relative border-r border-l"></div>
      )}
    </TableCellStyled>
  );
};
