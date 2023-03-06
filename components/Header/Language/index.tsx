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
    <div className={`px-10 text-2xl`}>
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
        <div className="flex flex-col font-mono items-center pb-4 absolute ml-8 text-inherit">
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
