import { Item } from 'components/Section';
import { TFunction } from 'next-i18next';

export const sections = (t: TFunction): Record<string, Item[]> => ({
  online_challenge: [
    {
      type: 'markdown',
      content: `
    Taistele muita kiltoja vastaan YO-Kylässä ja grindaa kiltasi leaderboardin huipulle!
    
    Pelissä on tarkoitus etsiä piiloitettu Gambitti Afrikan Tähti -tyylisesti. Lobbyjä on 10, ja jokaiseen lobbyyn voi osallistua vain yksi per kilta.
    
    Ruuduissa on jaossa buffeja, nerffejä, satunnaista XP:tä, mm:
    - sähköpotkulautoja
    - makkaranpaistoa
    - bussi
    
    Haasta siis muiden kiltojen edustajia törmätessäsi heihin IRL! 
    
    Sukella peliin linkistä:
    
    ### [KGM - Nettilaji](https://peli.titeen.it/)
    `,
    },
    {
      type: 'image',
      url: '/images/online_challenge.png',
      alt: 'Online Challenge',
      width: 427,
      height: 255,
    },
  ],
  info: [
    {
      type: 'markdown',
      content: t('info_content'),
    },
  ],
});
