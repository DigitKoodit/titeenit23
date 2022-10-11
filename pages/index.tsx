import type { GetStaticProps } from "next";
import Head from "next/head";
import Countdown from "components/Countdown";
import { useState } from "react";
import BackgroundImage from "components/BackgroundImage";
import Footer from "components/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, Trans } from "next-i18next";
import LanguageSelector from "components/LanguageSelector";

const Home = () => {
  const { t } = useTranslation("common");

  const [buttonText, setButtonText] = useState("");

  const titeenitStartDate = new Date("March 17 2023 18:00:00 GMT+0200");

  const checkCity = async () => {
    const cityCheckresponse = await fetch("/api/requestFromTurku");

    if (!cityCheckresponse.ok) {
      console.error(cityCheckresponse);
      setButtonText(t("something-went-wrong"));
      return;
    }

    const cityCheck = await cityCheckresponse.json();
    const newButtonText = cityCheck.fromTurku ? t("yes-you-are") : t("not-yet");
    setButtonText(newButtonText);
  };

  return (
    <div className="flex relative min-h-screen min-w-fit flex-col items-center justify-center">
      <Head>
        <title>{t("title")}</title>
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
        <Countdown date={titeenitStartDate} />
        <div>
          <button
            className="bg-neutral-100 text-orange-700 transition-colors font-bold py-2 px-4 my-4 rounded hover:bg-orange-700 hover:text-neutral-100 duration-150 ease-in"
            onClick={checkCity}
          >
            {t("in-turku-button")}
          </button>
          <p className="text-orange-500 text-2xl font-bold">{buttonText}</p>
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
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};

export default Home;
