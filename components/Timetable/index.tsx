'use client';

import format from 'date-fns/format';
import range from 'lodash/range';
import PropTypes from 'prop-types';
import * as React from 'react';
import ReactDOM from 'react-dom';
import classNames from './styles.module.css';
import type {
  ClassNames,
  DayColumnPreviewProps,
  DayHeaderPreviewProps,
  EventPreviewProps,
  EventsListProps,
  HourPreviewProps,
  HoursListProps,
  TimeTableProps,
} from './types';
import {
  getDefaultDayLabel,
  getEventPositionStyles,
  getRowHeight,
} from './utils';
import type { Event } from './types';
import { useTranslation } from 'next-i18next';

export const DEFAULT_HOURS_INTERVAL = { from: 7, to: 24 };

export const DayHeaderPreview: React.FC<DayHeaderPreviewProps> = ({
  day,
  rowHeight,
  ...otherProperties
}) => {
  return (
    <div
      {...otherProperties}
      style={{ ...(otherProperties?.style || {}), height: `160px` }}
    >
      {getDefaultDayLabel(day)}
    </div>
  );
};

export const HourPreview: React.FC<HourPreviewProps> = ({
  hour,
  ...otherProperties
}) => (
  <div {...otherProperties} key={hour}>
    {hour}
  </div>
);

const EventModal = ({
  hide,
  description,
  name,
  place,
  time,
  placeLink,
}: {
  time: string;
  hide: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
} & Partial<Event>) => {
  const { t } = useTranslation('common');

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 flex w-full h-full justify-center items-center z-[10000]">
      <div
        className="w-full h-full fixed top-0 left-0 bg-black opacity-60 z-10"
        onClick={(e) => hide(e)}
      />
      <div className="p-8 bg-white z-20 text-black flex flex-col space-y-4 w-96">
        <button className="self-end" onClick={(e) => hide(e)}>
          ❌
        </button>
        <div className="space-y-2">
          <h3 className="text-black">{name}</h3>
          <p className="text-black">
            {t('time')}: {time}
          </p>
          <p className="text-black">
            {t('place')}: {place}
          </p>
          <p className="text-black">{description?.long}</p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const EventPreview: React.FC<EventPreviewProps> = ({
  event,
  defaultAttributes,
  classNames,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <div
      {...defaultAttributes}
      title={event.name}
      key={event.id}
      onClick={() => {
        setIsExpanded(true);
      }}
    >
      <span className={classNames.event_info}>{event.name}</span>
      <span className={classNames.event_info}>
        {format(event.startTime, 'HH:mm')} - {format(event.endTime, 'HH:mm')}
      </span>
      <a href={event.placeLink} className={classNames.event_info}>
        @{event.place}
      </a>
      <p className="text-center">{event.description.short}</p>
      {isExpanded && (
        <EventModal
          {...event}
          time={`${format(event.startTime, 'HH:mm')} - ${format(
            event.endTime,
            'HH:mm'
          )}`}
          hide={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            e.stopPropagation();
            setIsExpanded(false);
          }}
        />
      )}
    </div>
  );
};

export const EventsList = ({
  events,
  day,
  hoursInterval,
  rowHeight,
  renderEvent: RenderEvent,
}: EventsListProps) => {
  return (
    <>
      {(events[day] || []).map((event) => (
        <RenderEvent
          key={event.id}
          {...{
            event,
            defaultAttributes: {
              className: `${classNames.event} ${classNames.type}`,
              style: getEventPositionStyles({
                event,
                hoursInterval,
                rowHeight,
              }),
            },
            classNames: classNames as ClassNames,
          }}
        />
      ))}
    </>
  );
};

const DayColumnPreview = ({
  events,
  day,
  index,
  rowHeight,
  renderDayHeader,
  renderEvent,
  hoursInterval,
  headerAttributes,
  bodyAttributes,
}: DayColumnPreviewProps) => {
  return (
    <div
      {...bodyAttributes}
      className={`${classNames.day} ${day} ${bodyAttributes?.className || ''}`}
      style={{
        ...(bodyAttributes?.style || {}),
        backgroundSize: `1px ${320}px`,
        width: `50%`,
      }}
      key={`${day}-${index}`}
    >
      {renderDayHeader({
        day,
        rowHeight,
        ...headerAttributes,
        className: `${classNames.day_title} ${
          headerAttributes?.className || ''
        }`,
      })}
      <EventsList
        events={events}
        day={day}
        renderEvent={renderEvent}
        hoursInterval={hoursInterval}
        rowHeight={rowHeight}
      />
    </div>
  );
};

export const HoursList = ({
  hoursInterval,
  rowHeight,
  renderHour,
}: HoursListProps) => {
  return range(hoursInterval.from, hoursInterval.to).map((hour) =>
    renderHour({
      hour: `${hour}:00`,
      className: classNames.hour,
      style: { minHeight: `160px` },
    })
  );
};

export const TimeTable = ({
  events,
  hoursInterval = DEFAULT_HOURS_INTERVAL,
  timeLabel = 'Time',
  renderDayHeader = DayHeaderPreview,
  renderEvent = EventPreview,
  renderHour = HourPreview,
  headerAttributes,
  bodyAttributes,
  ...otherProperties
}: TimeTableProps) => {
  const [dimensions, setDimensions] = React.useState({
    width: 0,
    height: 0,
  });
  const [rowHeight, setRowHeight] = React.useState<number>(0);
  const ref = React.useRef(null);
  const handleResize = () => {
    setDimensions({
      width: window?.innerWidth || 0,
      height: window?.innerHeight || 0,
    });
  };

  React.useEffect(() => {
    window?.addEventListener('resize', handleResize, false);
  }, []);

  React.useEffect(() => {
    setDimensions({
      width: window?.innerWidth || 0,
      height: window?.innerHeight || 0,
    });
  }, []);

  React.useEffect(() => {
    if (ref.current) {
      const totalHeight = 1000;

      setRowHeight(
        getRowHeight(hoursInterval.from, hoursInterval.to, totalHeight * 2)
      );
    }
  }, [hoursInterval, dimensions]);

  return (
    <div
      {...otherProperties}
      className={`${classNames.time_table_wrapper} ${otherProperties.className}`}
      ref={ref}
    >
      <div className={classNames.day}>
        <div
          {...headerAttributes}
          className={`${classNames.day_title} ${
            headerAttributes?.className || ''
          }`}
          style={{
            ...(headerAttributes?.style || {}),
            minHeight: `160px`,
          }}
        >
          {timeLabel}
        </div>
        {HoursList({ hoursInterval, renderHour, rowHeight })}
      </div>

      {Object.keys(events).map((day, index) =>
        DayColumnPreview({
          events,
          day,
          index,
          rowHeight,
          renderDayHeader,
          renderEvent,
          hoursInterval,
          headerAttributes,
          bodyAttributes,
        })
      )}
    </div>
  );
};

TimeTable.propTypes = {
  events: PropTypes.object.isRequired,
  hoursInterval: PropTypes.shape({
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
  }),
  renderDayHeader: PropTypes.func,
  renderHour: PropTypes.func,
  renderEvent: PropTypes.func,
  getDayLabel: PropTypes.func,
  timeLabel: PropTypes.string,
  headerAttributes: PropTypes.object,
  bodyAttributes: PropTypes.object,
};

TimeTable.defaultProps = {
  hoursInterval: DEFAULT_HOURS_INTERVAL,
  timeLabel: 'Time',
  renderDayHeader: DayHeaderPreview,
  renderHour: HourPreview,
  renderEvent: EventPreview,
};

export default TimeTable;
