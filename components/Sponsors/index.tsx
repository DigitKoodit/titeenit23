import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export const SponsorSection = () => {
  const { t } = useTranslation('common');
  return (
    <div className="w-3/4 text-center">
      <div>
        <h2>{t('main_sponsor')}</h2>
        <div className="relative w-full h-60 z-10">
          <Image src="/images/gofore_logo_orange.svg" alt="gofore_logo" fill />
        </div>
      </div>
      <div className="flex flex-wrap">
        <h2 className="w-full">{t('sponsors')}</h2>
        <div className="w-1/2 z-10 p-4">
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
        <div className="relative w-1/2 z-10">
          <Image src="/images/beanbakers.svg" alt="beanbakers logo" fill />
        </div>
        <div className="w-1/2 z-10 p-4">
          <div
            className="relative w-full"
            style={{ aspectRatio: '3.5652173913' }}
          >
            <Image
              src="/images/taiste.png"
              alt="taiste logo"
              style={{ objectFit: 'contain' }}
              fill
            />
          </div>
        </div>
        <div className="relative w-1/2 z-10">
          <Image src="/images/TEK_logo_RGB_turkoosi.svg" alt="TEK logo" fill />
        </div>
      </div>
    </div>
  );
};
