import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Countdown from 'components/Countdown';

const Home = ({ city }: { city: string }) => {
  const titeenitStartDate = new Date('2023-03-17T18:00:00');

  console.log(city);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center -z-20 bg-black space-y-8">
        <div className="bg-landing bg-cover bg-center blur-sm absolute w-full h-full -z-10" />
        <h1 className="text-6xl font-bold text-white">
          Titeenit <span className="text-blue-600">Turussa</span>
        </h1>

        <Countdown date={titeenitStartDate} />

        <p className="text-white">{city}</p>
      </main>
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
