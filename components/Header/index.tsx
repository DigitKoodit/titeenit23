import useEventListener from 'hooks/useEventListener';
import { useTranslation } from 'next-i18next';
import React, { useMemo, useState } from 'react';
import { Hamburger } from './Hamburger';
import { Telegram } from './icons';
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
    openClassName = 'flex';
  } else {
    openClassName = 'hidden';
  }

  return (
    <a
      {...props}
      href={href}
      target={!isInternal ? '_blank' : ''}
      rel="noopener noreferrer"
      className={`py-4 px-10 space-x-2 sm:w-max w-full sm:flex justify-center flex-nowrap ${openClassName} ${activeClassName} ${props.className}`}
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
      'z-[1000] w-full flex min-h-[66px] items-center px-6 py-4 font-sans text-2xl fixed top-0 left-0 transition-colors ease-in duration-200 sm:flex-row flex-col';

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
      {/* <HeaderLink href="#online_challenge" active={active} open={open}>
        {t('online_challenge')}
      </HeaderLink> */}
      <HeaderLink href="#info" active={active} open={open}>
        {t('info')}
      </HeaderLink>
      <HeaderLink href="#schedule" active={active} open={open}>
        {t('schedule')}
      </HeaderLink>
      <HeaderLink href="#sponsors" active={active} open={open}>
        {t('sponsors')}
      </HeaderLink>
      <HeaderLink
        href="https://t.me/+j-1_FWlm5l5iYTQ0"
        active={active}
        open={open}
      >
        <Telegram color={open ? '#333' : '#fff'} />
        Telegram
      </HeaderLink>
      <LanguageSelector isHeaderVisible={open || hasScrolled} />
    </header>
  );
};
