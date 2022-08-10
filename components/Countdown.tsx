import { useTranslation } from 'next-i18next';

const Countdown = ({ date }: { date: Date }) => {
  const { t } = useTranslation();

  const diffInMS = date.getTime() - Date.now();
  const diffInDays = Math.ceil(diffInMS / (1000 * 60 * 60 * 24));

  return (
    <div className="flex flex-col items-center justify-center text-3xl font-bold">
      {t('x-days-from-now', { days: diffInDays })}
    </div>
  );
};

export default Countdown;
