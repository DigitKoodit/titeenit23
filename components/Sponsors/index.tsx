import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

export const SponsorSection = ({
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
    <div ref={ref} className="text-center">
      <div>
        <h2 id="sponsors">{t('main_sponsor')}</h2>
        <div className="relative w-full h-60 z-10">
          <Image src="/images/gofore_logo_orange.svg" alt="gofore_logo" fill />
        </div>
      </div>
      <div className="flex flex-wrap">
        <h2 className="w-full">{t('sponsors')}</h2>
        <div className="sm:w-1/2 w-full z-10 p-4">
          <div
            className="relative w-full"
            style={{ aspectRatio: '3.62671232877' }}
          >
            <Image
              src="/images/Vincit_logo_red_RGB.png"
              alt="vincit logo"
              fill
            />
          </div>
        </div>
        <div className="relative sm:w-1/2 w-full z-10 h-40">
          <Image src="/images/beanbakers.svg" alt="beanbakers logo" fill />
        </div>
        <div className="relative sm:w-1/2 w-full z-10 h-40">
          <Image src="/images/taiste.svg" alt="taiste logo" fill />
        </div>
        <div className="relative sm:w-1/2 w-full z-10 h-40">
          <Image src="/images/TEK_logo_RGB_turkoosi.svg" alt="TEK logo" fill />
        </div>
      </div>
    </div>
  );
};
