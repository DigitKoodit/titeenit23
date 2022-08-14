import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Countdown from 'components/Countdown';
import { useState } from 'react';
import BackgroundImage from 'components/BackgroundImage';
import Footer from 'components/Footer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import LanguageSelector from 'components/LanguageSelector';

const Home = () => {
  const { t } = useTranslation('common');

  const [buttonText, setButtonText] = useState('');

  const titeenitStartDate = new Date('March 17 2023 18:00:00 GMT+0200');

  const checkCity = async () => {
    const cityCheckresponse = await fetch('/api/requestFromTurku');

    if (!cityCheckresponse.ok) {
      console.error(cityCheckresponse);
      setButtonText(t('something-went-wrong'));
      return;
    }

    const cityCheck = await cityCheckresponse.json();
    const newButtonText = cityCheck.fromTurku ? t('yes-you-are') : t('not-yet');
    setButtonText(newButtonText);
  };

  return (
    <div className="flex relative min-h-screen min-w-fit flex-col items-center justify-center">
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LanguageSelector />
      <main
        className="flex flex-1 flex-col items-center justify-center px-20 text-center space-y-8 text-teal-600"
        style={{ textShadow: '2px 2px 1px #1e293b' }}>
        <div>
          <h1 className="text-6xl font-bold ">{t('heading')}</h1>
          <p className="text-xl font-bold">17.-19.3.2023</p>
        </div>

        <Countdown date={titeenitStartDate} />

        <div>
          <button
            className="bg-slate-200 hover:bg-slate-300 transition-colors  font-bold py-2 px-4 my-4 rounded"
            onClick={checkCity}>
            {t('in-turku-button')}
          </button>
          <p className="text-2xl font-bold">{buttonText}</p>
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
