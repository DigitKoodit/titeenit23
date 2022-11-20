import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Countdown from 'components/Countdown';
import BackgroundImage from 'components/BackgroundImage';
import Footer from 'components/Footer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation, Trans } from 'next-i18next';
import LanguageSelector from 'components/LanguageSelector';
import CheckCityButton from 'components/CheckCityButton';

const Home = () => {
  const { t } = useTranslation('common');

  const titeenitStartDate = new Date('March 17 2023 18:00:00 GMT+0200');

  return (
    <div className="flex relative min-h-screen min-w-fit flex-col items-center justify-center">
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LanguageSelector />
      <main className="flex flex-1 flex-col items-center justify-center px-20 text-center space-y-8 text-neutral-100">
        <div>
          <h1 className="text-6xl font-bold">
            <Trans i18nKey="heading" components={{ 1: <span className="text-orange-500" /> }} />
          </h1>
          <p className="text-xl font-bold text-neutral-100">17.-19.3.2023</p>
        </div>
        <CheckCityButton />
        <div className="bg-slate-200/30 py-4 px-2 rounded-lg">
          <p className="text-2xl font-bold">{t('event-info-text')}</p>
          <p className="text-xl py-2">{t('event-info-text-2')}</p>
        </div>
      </main>
      <Footer />
      <BackgroundImage />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default Home;
