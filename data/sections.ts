import { Item } from 'components/Section';

export const sections: Record<string, Item[]> = {
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
      type: 'text',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam turpis, malesuada sit amet vestibulum eget, ornare non odio. Sed semper sem vel iaculis aliquet. Mauris interdum in nunc sed lacinia. Quisque fringilla, mi at placerat placerat, tellus diam pharetra quam, sit amet fermentum augue mi eu sapien. Sed elementum enim vitae hendrerit tristique. Ut a orci sit amet metus blandit euismod vitae at magna. Curabitur lobortis dolor et turpis aliquet, ut elementum odio vulputate. Aenean molestie auctor est, quis ullamcorper dolor rhoncus elementum. ',
    },
    {
      type: 'image',
      url: '/images/online_challenge.png',
      alt: 'Online Challenge',
      width: 427,
      height: 255,
    },
  ],
};
