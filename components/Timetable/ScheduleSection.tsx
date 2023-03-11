import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import Timetable from '.';
import { Events } from './types';

const emptyDescription = { short: '', long: '' };

const events: Events = {
  friday: [
    {
      id: 1,
      name: 'Titeenigaala',
      startTime: new Date('2023-03-17T17:30:00'),
      endTime: new Date('2023-03-17T23:00:00'),
      description: emptyDescription,
      place: 'Akatemiatalo',
      placeLink: 'https://goo.gl/maps/tYyCuHbViweJsAdW9',
    },
    {
      id: 2,
      name: 'Jatkot',
      startTime: new Date('2023-03-17T23:00:00'),
      endTime: new Date('2023-03-18T00:00:00'),
      description: emptyDescription,
      place: 'Night Club Marilyn',
      placeLink: 'https://goo.gl/maps/JzBUxw3UiB7eYLGYA',
    },
  ],
  saturday: [
    {
      id: 3,
      name: 'Vincit aamupala',
      startTime: new Date('2023-03-18T09:00:00'),
      endTime: new Date('2023-03-18T10:30:00'),
      description: {
        short: 'Vincitin tarjoama aamupala. Vaatii ilmottautumisen.',
        long: `Vuoden 2022 Suomen parhaaksi työpaikaksi palkittu Vincit avaa ovensa tietoteekkareille lauantaina 18. helmikuuta klo 9-10:30. 

Vuonna 2007 perustetussa, Tampereelta lähtöisin olevassa ohjelmistotalossa uskotaan, että töissä on tarkoitus viihtyä – myös maanantaisin. Vincit on sittemmin laajentanut ympäri Suomea, Eurooppaa ja Yhdysvaltoja, viimeisimpänä lisäyksenä maailmankartalle ovat toimipisteet Ruotsissa ja Puolassa. Vincit on yli 800 asiantuntijan työyhteisö, joka huolehtii omistaan kokonaisvaltaisesti. Turussa vincitläisiä työskentelee jo lähes 90! Juuri remontoitu Turun toimisto sijaitsee Aurajoen varrella osoitteessa Helsinginkatu 15.

Vincit toivottaa titeenit lämpimästi tervetulleeksi toimistovierailulle! Vierailun ohjelmana on eilisestä illasta heräilyä hyvän meiningin, kuninkaallisen aamupalan ja kevyen presiksen merkeissä.`,
      },
      place: 'Vincitin toimisto',
      placeLink: 'https://goo.gl/maps/mtEkX2uEUeuAum8f8',
    },
    {
      id: 4,
      name: 'Gofore aamupala',
      startTime: new Date('2023-03-18T09:00:00'),
      endTime: new Date('2023-03-18T10:30:00'),
      description: {
        short: 'Goforen tarjoama aamupala. Vaatii ilmottautumisen.',
        long: `Hyvää huomista täältä Kauppatorin laidalta Goforen toimistolta!

Oletko miettinyt, millaista arki it-alan konsulttifirmassa on? Tervetuloa tutustumaan Goforeen ja tapaamaan goforelaisia aamiaisen merkeissä lauantaiaamuna.

Gofore Turun toimisto on vuonna 2018 perustettu vauhdilla kasvava osaajajoukko, jolle on tärkeää toteuttaa arkeaan startup- hengessä ja suurella sydämellä. Gofore on yli 1300 työntekijän digitaalisen muutoksen asiantuntijatalo, jolta löytyy Turun lisäksi toimistoja ympäri Suomen ja myös ulkomailta. Päivittäisessä tekemisessä korostuvat vahvat arvot ja työkulttuurimme. Me haluamme säteillä hyvää ympärillemme oli sitten kyse johdon konsultoinnista, koodauksesta, muotoilusta tai esimerkiksi testauksesta ja laadunvarmistuksesta.

Tarjolla aamupalaa, jonka voimalla jaksaa jatkaa päivän taistoihin. Varsinaista isompaa virallista ohjelmaa ei ole tiedossa Goforen lyhyttä esittelyä lukuun ottamatta. Tiedossa siis vapaamuotoista hengailua ja asiantuntijamme ovat paikan päällä juttelemassa ja vastailemassa kysymyksiinne.`,
      },
      place: 'Goforen toimisto',
      placeLink: 'https://goo.gl/maps/GfrV1RUiFkRFbobcA',
    },
    {
      id: 5,
      name: '1. TiTeenilaji',
      startTime: new Date('2023-03-18T11:00:00'),
      endTime: new Date('2023-03-18T12:30:00'),
      description: emptyDescription,
      place: 'Kupittaa 5',
      placeLink: 'https://goo.gl/maps/drij21FX9sbVeMMm8',
    },
    {
      id: 6,
      name: '2. TiTeenilaji',
      startTime: new Date('2023-03-18T12:45:00'),
      endTime: new Date('2023-03-18T14:15:00'),
      description: emptyDescription,
      place: 'Kupittaan liikennepuisto',
      placeLink: 'https://goo.gl/maps/uds2WMEgpK4efXez5',
    },
    {
      id: 7,
      name: 'Firmamessut',
      startTime: new Date('2023-03-18T14:15:00'),
      endTime: new Date('2023-03-18T18:00:00'),
      description: {
        short: '',
        long: 'TiTeenien yhteistyöyritykset edustavat messuständeillä TiTeenilajien yhteydessä.',
      },
      place: 'Natura',
      placeLink: 'https://goo.gl/maps/UaBzBPPv66f352dd6',
    },
    {
      id: 8,
      name: 'Lounas – kattaus 1',
      startTime: new Date('2023-03-18T14:45'),
      endTime: new Date('2023-03-18T15:15'),
      description: {
        short: 'BeanBakersin tarjoama lounas',
        long: `BeanBakers

Hyvät Titeenit, hyvinvointinne on meille tärkeää ja täten haluamme tarjota teille kaikille taistojen sankareille lounaan. Läsnäolollaan ja mieleenpainuvalla puheellaan meitä kunnioittaa myös armoitettu johtajamme Peter Lehto. Tule siis hakemaan maukas cateringin valmistama salaattibowl ja istahda hetkeksi kuulemaan mitä BB:llä tapahtuu ja millaista meillä on olla töissä. Kattaus kahdessa erässä. Nähdään luentosalissa messualueen vieressä!

BeanBakers on rento ohjelmistotalo, joka on erikoistunut web-sovelluksiin, verkkokauppaan ja liiketoimintaa tukeviin verkkopalveluihin. Teemme yhteistyötä suoraan loppuasiakkaiden kanssa sekä konsulttipositioissa. Rekrysivullamme pääset testaamaan muutaman helpon kysymyksen avulla miten voisimme sopia sinulle! beanbakers.fi/rekry

Tldr: Me ruokimme sinut ja meillä on mukavaa!`,
      },
      place: 'Natura – Sali IX',
      placeLink: 'https://goo.gl/maps/UaBzBPPv66f352dd6',
    },
    {
      id: 9,
      name: 'Lounas – kattaus 2',
      startTime: new Date('2023-03-18T15:30'),
      endTime: new Date('2023-03-18T16:00'),
      description: {
        short: 'BeanBakersin tarjoama lounas',
        long: `BeanBakers

Hyvät Titeenit, hyvinvointinne on meille tärkeää ja täten haluamme tarjota teille kaikille taistojen sankareille lounaan. Läsnäolollaan ja mieleenpainuvalla puheellaan meitä kunnioittaa myös armoitettu johtajamme Peter Lehto. Tule siis hakemaan maukas cateringin valmistama salaattibowl ja istahda hetkeksi kuulemaan mitä BB:llä tapahtuu ja millaista meillä on olla töissä. Kattaus kahdessa erässä. Nähdään luentosalissa messualueen vieressä!

BeanBakers on rento ohjelmistotalo, joka on erikoistunut web-sovelluksiin, verkkokauppaan ja liiketoimintaa tukeviin verkkopalveluihin. Teemme yhteistyötä suoraan loppuasiakkaiden kanssa sekä konsulttipositioissa. Rekrysivullamme pääset testaamaan muutaman helpon kysymyksen avulla miten voisimme sopia sinulle! beanbakers.fi/rekry

Tldr: Me ruokimme sinut ja meillä on mukavaa!`,
      },
      place: 'Natura – Sali IX',
      placeLink: 'https://goo.gl/maps/UaBzBPPv66f352dd6',
    },
    {
      id: 10,
      name: '3. TiTeenilaji',
      startTime: new Date('2023-03-18T16:00'),
      endTime: new Date('2023-03-18T17:30'),
      description: emptyDescription,
      place: 'Natura - Sali IX',
      placeLink: 'https://goo.gl/maps/UaBzBPPv66f352dd6',
    },
    {
      id: 11,
      name: '4. TiTeenilaji',
      startTime: new Date('2023-03-18T18:00'),
      endTime: new Date('2023-03-18T19:30'),
      description: emptyDescription,
      place: 'Natura – Sali IX',
      placeLink: 'https://goo.gl/maps/UaBzBPPv66f352dd6',
    },
    {
      id: 12,
      name: '5. TiTeenilaji',
      startTime: new Date('2023-03-18T20:30'),
      endTime: new Date('2023-03-18T22:30'),
      description: emptyDescription,
      place: 'Akatemiatalo',
      placeLink: 'https://goo.gl/maps/tYyCuHbViweJsAdW9',
    },
    {
      id: 13,
      name: 'TiTeenibileet',
      startTime: new Date('2023-03-18T22:30'),
      endTime: new Date('2023-03-19T00:00'),
      description: {
        short: 'Yllätysesiintyjä hymnin jälkeen',
        long: 'Jatkoilla voittajan julkistus ja yllätysesiintyjä :o',
      },
      place: 'Akatemiatalo',
      placeLink: 'https://goo.gl/maps/tYyCuHbViweJsAdW9',
    },
  ],
};

export const ScheduleSection = ({
  setIntersection,
}: {
  setIntersection: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation('common');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersection('schedule');
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
  }, [setIntersection]);

  return (
    <div
      ref={ref}
      className="mx-16 flex-grow overflow-hidden min-h-screen w-full"
    >
      <h2 className="text-center">{t('schedule')}</h2>
      <div className="w-full flex space-x-4 text-left h-[700px] overflow-scroll">
        <div className="relative p-4 flex-1 w-full">
          <Timetable
            className="w-full"
            events={events}
            hoursInterval={{ from: 0, to: 24 }}
          />
        </div>
      </div>
    </div>
  );
};
