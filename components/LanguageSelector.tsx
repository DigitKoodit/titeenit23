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
    <nav className="fixed top-5 right-5 text-orange-500 font-bold flex flex-col font-mono">
      <ul>
        {locales.map((lang) => (
          <li key={lang}>
            <a
              className={`${
                locale === lang ? 'text-neutral-100' : ''
              } cursor-pointer`}
              href="#"
              onClick={() => changeLocale(lang)}
            >
              {flagMap[lang]} {lang.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LanguageSelector;
