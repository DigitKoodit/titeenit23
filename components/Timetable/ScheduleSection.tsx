import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import Timetable from '.';

export const ScheduleSection = ({
  setIntersection,
}: {
  setIntersection: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation('common');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersection('schedule');
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
  }, [setIntersection]);

  return (
    <div
      ref={ref}
      className="mx-16 flex-grow overflow-hidden min-h-screen w-full"
    >
      <h2 className="text-center">{t('schedule')}</h2>
      <div className="w-full flex space-x-4 text-left h-[700px] overflow-scroll">
        <div className="relative p-4 flex-1 w-full">
          <Timetable
            className="w-full"
            events={{
              friday: [
                {
                  id: 1,
                  name: 'Laji 1',
                  type: 'custom',
                  startTime: new Date('2018-02-23T11:30:00'),
                  endTime: new Date('2018-02-23T13:30:00'),
                  description: {
                    short: 'Kuvaus tämä on testi123',
                    long: 'Kuvaus tämä on testi123',
                  },
                  place: 'Paikka',
                  placeLink: 'https://www.google.com',
                },
              ],
              saturday: [
                {
                  id: 2,
                  name: 'Laji 2',
                  type: 'custom',
                  startTime: new Date('2018-02-23T04:30:00'),
                  endTime: new Date('2018-02-23T08:30:00'),
                  description: {
                    short: 'Kuvaus tämä on testi123',
                    long: 'Kuvaus tämä on testi123',
                  },
                  place: 'Paikka',
                  placeLink: 'https://www.google.com',
                },
              ],
            }}
            hoursInterval={{ from: 0, to: 24 }}
          />
        </div>
      </div>
    </div>
  );
};
