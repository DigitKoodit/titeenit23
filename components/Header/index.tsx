import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useEventListener from 'hooks/useEventListener';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { LanguageSelector } from './Language';

interface HeaderLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  active: string;
}
const HeaderLink = ({ children, href, active, ...props }: HeaderLinkProps) => {
  const isInternal = href && href.startsWith('#');

  let activeClassName = '';
  if (active === props.id) {
    activeClassName = 'text-blue-500';
  }

  return (
    <a
      {...props}
      href={href}
      target={!isInternal ? '_blank' : ''}
      rel="noopener noreferrer"
      className={`py-4 px-10 space-x-2 ${activeClassName} ${props.className}`}
    >
      {children}
    </a>
  );
};

export const Header = ({ active }: { active: string }) => {
  const router = useRouter();

  const { locale } = router;
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation(locale);
  const handleScroll = () => {
    if (window.scrollY > 100) {
      return setIsOpen(true);
    }

    setIsOpen(false);
  };

  useEventListener('scroll', handleScroll);

  const className = useMemo(() => {
    const initial =
      'z-10 w-full flex items-center justify-center px-6 py-4 font-sans text-2xl text-white fixed top-0 transition-colors ease-in duration-200';

    if (isOpen) {
      return `${initial} bg-white text-black`;
    }

    return initial;
  }, [isOpen]);

  return (
    <header className={className}>
      <HeaderLink id="online_challenge" href="#nettilaji" active={active}>
        {t('online_challenge')}
      </HeaderLink>
      <HeaderLink id="info" href="#nettilaji" active={active}>
        {t('info')}
      </HeaderLink>
      <HeaderLink id="schedule" href="#nettilaji" active={active}>
        {t('schedule')}
      </HeaderLink>
      <HeaderLink id="sponsors" href="#nettilaji" active={active}>
        {t('sponsors')}
      </HeaderLink>
      <HeaderLink href="#nettilaji" active={active}>
        <FontAwesomeIcon icon={faTelegram} size="1x" />
        Telegram
      </HeaderLink>
      <LanguageSelector isHeaderVisible={isOpen} />
    </header>
  );
};
