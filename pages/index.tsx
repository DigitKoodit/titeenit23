import type { GetStaticProps } from 'next';
import Head from 'next/head';
import BackgroundImage from 'components/BackgroundImage';
import Footer from 'components/Footer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation, Trans } from 'next-i18next';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Header } from 'components/Header';
import { Section } from 'components/Section';
import { sections } from 'data/sections';
import { useState } from 'react';
import { Hero } from 'components/Hero';

const Home = () => {
  const { t } = useTranslation('common');

  const [active, setActive] = useState('info');

  return (
    <div className="flex relative min-h-screen min-w-fit flex-col items-center justify-center bg-black">
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header active={active} />
      <Hero />
      <main className="flex flex-1 flex-col items-center justify-center px-20 text-center space-y-8 text-neutral-100">
        <Section
          id="online_challenge"
          items={sections}
          title={t('common.online_challenge')}
          setIntersection={setActive}
        />
      </main>
      <Footer />
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
