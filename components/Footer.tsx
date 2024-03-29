import Image from 'next/image';

const Footer = () => {
  const logoSize = 40;
  return (
    <footer className="w-100 flex py-4 space-x-8">
      <a href="https://digit.fi">
        <Image
          src="https://digit.fi/digit.svg"
          width={logoSize}
          height={logoSize}
          alt="Digit ry"
          className="aspect-square object-contain"
        />
      </a>
      <a href="https://datateknologerna.org">
        <Image
          src="https://datateknologerna.org/static/images/albin_black.png"
          width={logoSize}
          height={logoSize}
          alt="Datateknologerna vid Åbo Akademi rf"
          className="aspect-square object-contain"
        />
      </a>
    </footer>
  );
};

export default Footer;
