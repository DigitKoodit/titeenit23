import Link from 'next/link';
import { useRouter } from 'next/router';

type FlagMap = {
  [key: string]: string;
};

const flagMap: FlagMap = {
  fi: '🇫🇮',
  en: '🇬🇧',
  sv: '🇸🇪',
};

const LanguageSelector = () => {
  const router = useRouter();

  // change just the locale and maintain all other route information including href's query
  const changeLocale = (nextLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  };

  const { locale, locales = [] } = router;

  return (
    <nav className="fixed top-5 right-5 text-teal-600 font-bold flex flex-col">
      <ul>
        {locales.map((lang) => (
          <li>
            <a
              className={`${locale === lang ? 'text-teal-900' : ''} cursor-pointer`}
              onClick={() => changeLocale(lang)}>
              {flagMap[lang]} {lang.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LanguageSelector;
