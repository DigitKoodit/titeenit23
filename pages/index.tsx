import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Countdown from 'components/Countdown';
import { useState } from 'react';
import BackgroundImage from 'components/BackgroundImage';
import Footer from 'components/Footer';

const Home = ({ city }: { city: string }) => {
  const [buttonText, setButtonText] = useState('Olenko Turussa?');

  const titeenitStartDate = new Date('2023-03-17T18:00:00');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center space-y-8 text-white">
        <div>
          <h1 className="text-6xl font-bold ">
            Titeenit <span className="text-blue-600">Turussa</span>
          </h1>
          <p className="text-xl font-bold">17.-19.3.2023</p>
        </div>

        <Countdown date={titeenitStartDate} />

        <button
          className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded"
          onClick={() => setButtonText(city === 'Turku' ? 'Kyl maar' : 'Et viel')}>
          {buttonText}
        </button>
      </main>
      <Footer />
      <BackgroundImage />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      city: req.headers['x-vercel-ip-city'] ?? null,
    },
  };
};

export const config = {
  runtime: 'experimental-edge',
};

export default Home;
