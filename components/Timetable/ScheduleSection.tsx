import { useTranslation } from 'next-i18next';
import { useRef } from 'react';
import { Timetable, TimetableData } from '.';

export const ScheduleSection = ({ data }: { data: TimetableData[] }) => {
  const { t } = useTranslation('common');
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="mx-16 flex-grow overflow-hidden min-h-screen">
      <h2 className="text-center">{t('schedule')}</h2>
      <div className="w-full flex space-x-4 text-left">
        <div className="relative p-4 flex-1">
          <Timetable data={data} />
        </div>
      </div>
    </div>
  );
};
