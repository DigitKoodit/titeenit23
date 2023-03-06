import { useRouter } from 'next/router';
import { useState } from 'react';
import { Globe } from '../icons';

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
    <div
      className={`sm:py-4 sm:px-10 text-2xl sm:relative sm:top-0 sm:right-0 absolute top-4 right-4`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`space-x-2 flex flex-nowrap ${
          isHeaderVisible ? 'text-black' : 'text-white'
        }`}
      >
        <Globe color={isHeaderVisible ? '#000' : '#fff'} />
        <span className={`${isHeaderVisible ? 'text-black' : 'text-white'}`}>
          {locale}
        </span>
      </button>
      {isOpen && (
        <div
          className={`${
            isHeaderVisible ? 'sm:bg-white rounded border border-gray-500' : ''
          } flex flex-col font-mono items-end sm:items-center absolute top-14 w-max sm:px-8 text-right`}
        >
          {locales &&
            locales
              .filter((el) => el !== locale)
              .map((language) => (
                <li key={language}>
                  <a
                    href="#"
                    onClick={() => changeLocale(language)}
                    className={`${
                      isHeaderVisible ? 'text-black' : 'text-white'
                    }`}
                  >
                    {language}
                  </a>
                </li>
              ))}
        </div>
      )}
    </div>
  );
};
