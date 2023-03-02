import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const LanguageSelector = ({
  isHeaderVisible,
}: {
  isHeaderVisible: boolean;
}) => {
  const router = useRouter();

  const { locale, locales = [] } = router;
  const [isOpen, setIsOpen] = useState(false);

  const changeLocale = (nextLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  };

  return (
    <div className={`px-10 text-2xl`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`space-x-2 ${isHeaderVisible ? 'text-black' : 'text-white'}`}
      >
        <FontAwesomeIcon
          className={`${isHeaderVisible ? 'text-black' : 'text-white'}`}
          fill={isHeaderVisible ? 'black' : 'white'}
          icon={faGlobe}
          size="1x"
        />
        <span className={`${isHeaderVisible ? 'text-black' : 'text-white'}`}>
          {locale}
        </span>
      </button>
      {isOpen && (
        <div className="flex flex-col font-mono items-center pb-4 absolute ml-8 text-inherit">
          {locales &&
            locales
              .filter((el) => el !== locale)
              .map((language) => (
                <li key={language}>
                  <a href="#" onClick={() => changeLocale(language)}>
                    {language}
                  </a>
                </li>
              ))}
        </div>
      )}
    </div>
  );
};
