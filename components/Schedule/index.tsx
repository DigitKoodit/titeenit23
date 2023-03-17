import { EventModal } from 'components/Timetable';
import { Events, Event } from 'components/Timetable/types';
import { format } from 'date-fns';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const Row = (event: Event) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="flex flex-row justify-between"
        onClick={() => setOpen(true)}
      >
        <div className="w-1/4">
          <h4>{event.name}</h4>
          <a className="w-1/4 underline" href={event.placeLink}>
            @{event.place}
          </a>
        </div>
        <p className="w-1/4">
          {format(event.startTime, 'HH:mm')} - {format(event.endTime, 'HH:mm')}
        </p>

        <p className="w-1/4">{event.description.short}</p>
        <button className="underline" onClick={() => setOpen(true)}>
          Lue lisää
        </button>
      </div>
      {open && (
        <EventModal
          {...event}
          time={`${format(event.startTime, 'HH:mm')} - ${format(
            event.endTime,
            'HH:mm'
          )}`}
          hide={() => setOpen(false)}
        />
      )}
    </>
  );
};

export const Schedule = ({ data }: { data: Events }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full space-y-4">
      {Object.keys(data).map((day) => (
        <div key={day} className="space-y-4 divide-y">
          <h3>{t(day)}</h3>
          {data[day].map((event) => (
            <Row key={event.id + day} {...event} />
          ))}
        </div>
      ))}
    </div>
  );
};
