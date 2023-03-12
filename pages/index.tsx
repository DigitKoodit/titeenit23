import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Footer from 'components/Footer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Header } from 'components/Header';
import { Item, Section } from 'components/Section';
import { useState } from 'react';
import { Hero } from 'components/Hero';
import { SponsorSection } from 'components/Sponsors';
import { ScheduleSection } from 'components/Timetable/ScheduleSection';
import { sections } from 'data/sections';

const Home = () => {
  const { t } = useTranslation('common');
  const sectionData = sections(t);

  const [active, setActive] = useState('info');

  const sectionKeys = Object.keys(sectionData);

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
        {sectionKeys.map((key) => {
          const section = sectionData[key];
          return (
            <Section
              key={key}
              id={key}
              items={section}
              title={t(key)}
              setIntersection={setActive}
            />
          );
        })}
        <ScheduleSection setIntersection={setActive} />
        <SponsorSection setIntersection={setActive} />
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
