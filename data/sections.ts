import { Item } from 'components/Section';
import { TFunction } from 'next-i18next';

export const sections = (t: TFunction): Record<string, Item[]> => ({
  online_challenge: [
    {
      type: 'markdown',
      content: t('online_challenge_md'),
    },
    {
      type: 'image',
      url: '/images/online_challenge.png',
      alt: 'Online Challenge',
      width: 427,
      height: 255,
      link: 'https://peli.titeen.it/',
    },
  ],
  info: [
    {
      type: 'markdown',
      content: t('info_content'),
    },
  ],
});
