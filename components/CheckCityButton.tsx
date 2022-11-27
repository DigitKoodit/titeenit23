import { useState } from 'react';
import { useTranslation } from 'next-i18next';

const CheckCityButton = () => {
  const { t } = useTranslation('common');

  const [buttonText, setButtonText] = useState('');

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
    <div>
      <button
        className="bg-neutral-100 text-orange-700 transition-colors font-bold py-2 px-4 my-4 rounded hover:bg-orange-700 hover:text-neutral-100 duration-150 ease-in"
        onClick={checkCity}
      >
        {t('in-turku-button')}
      </button>
      <p className="text-orange-500 text-2xl font-bold">{buttonText}</p>
    </div>
  );
};

export default CheckCityButton;
