import Head from 'next/head';
import Countdown from 'components/Countdown';
import { useState } from 'react';
import BackgroundImage from 'components/BackgroundImage';
import Footer from 'components/Footer';

const Home = () => {
  const [buttonText, setButtonText] = useState('');

  const titeenitStartDate = new Date('March 17 2023 18:00:00 GMT+0200');

  const checkCity = async () => {
    const fromTurkuCheckResponse = await fetch('/api/requestFromTurku');
    const fromTurkuCheck = await fromTurkuCheckResponse.json();

    setButtonText(fromTurkuCheck.message);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Turun Titeenit 2023</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="flex flex-1 flex-col items-center justify-center px-20 text-center space-y-8 text-teal-600"
        style={{ textShadow: '2px 2px 1px #1e293b' }}>
        <div>
          <h1 className="text-6xl font-bold ">Titeenit Turussa</h1>
          <p className="text-xl font-bold">17.-19.3.2023</p>
        </div>

        <Countdown date={titeenitStartDate} />

        <div>
          <button
            className="bg-slate-200 hover:bg-slate-300 transition-colors  font-bold py-2 px-4 my-4 rounded"
            onClick={checkCity}>
            Olenko Turussa?
          </button>
          <p className="text-2xl font-bold">{buttonText}</p>
        </div>
      </main>
      <Footer />
      <BackgroundImage />
    </div>
  );
};

export default Home;
