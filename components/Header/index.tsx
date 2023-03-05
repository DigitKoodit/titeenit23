import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useEventListener from 'hooks/useEventListener';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { Hamburger } from './Hamburger';
import { LanguageSelector } from './Language';

interface HeaderLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  active: string;
  open: boolean;
}
const HeaderLink = ({
  children,
  href,
  active,
  open,
  ...props
}: HeaderLinkProps) => {
  const isInternal = href && href.startsWith('#');

  let activeClassName = '';
  if (active === props.id) {
    activeClassName = 'text-blue-500';
  }

  let openClassName = '';

  if (open) {
    openClassName = 'block';
  } else {
    openClassName = 'hidden';
  }

  return (
    <a
      {...props}
      href={href}
      target={!isInternal ? '_blank' : ''}
      rel="noopener noreferrer"
      className={`py-4 px-10 space-x-2 sm:block ${openClassName} ${activeClassName} ${props.className}`}
    >
      {children}
    </a>
  );
};

export const Header = ({ active }: { active: string }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const handleScroll = () => {
    if (window.scrollY > 100) {
      return setHasScrolled(true);
    }

    setHasScrolled(false);
  };

  useEventListener('scroll', handleScroll);

  const className = useMemo(() => {
    const initial =
      'z-[1000] w-full flex items-center justify-center px-6 py-4 font-sans text-2xl text-white fixed top-0 left-0 transition-colors ease-in duration-200 sm:flex-row flex-col';

    if (hasScrolled || open) {
      return `${initial} bg-white text-black`;
    }

    return initial;
  }, [hasScrolled, open]);

  return (
    <header className={className}>
      <Hamburger
        open={open}
        setOpen={setOpen}
        color={open || hasScrolled ? 'dark' : 'light'}
      />
      <HeaderLink
        id="online_challenge"
        href="#nettilaji"
        active={active}
        open={open}
      >
        {t('online_challenge')}
      </HeaderLink>
      <HeaderLink id="info" href="#nettilaji" active={active} open={open}>
        {t('info')}
      </HeaderLink>
      <HeaderLink id="schedule" href="#nettilaji" active={active} open={open}>
        {t('schedule')}
      </HeaderLink>
      <HeaderLink id="sponsors" href="#nettilaji" active={active} open={open}>
        {t('sponsors')}
      </HeaderLink>
      <HeaderLink href="#nettilaji" active={active} open={open}>
        <FontAwesomeIcon icon={faTelegram} size="1x" />
        Telegram
      </HeaderLink>
      <LanguageSelector isHeaderVisible={hasScrolled} />
    </header>
  );
};
