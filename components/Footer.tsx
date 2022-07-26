import Image from 'next/future/image';

const Footer = () => {
  const logoSize = 40;
  return (
    <footer className="w-100 flex py-4 space-x-8">
      <a href="https://digit.fi">
        <Image
          src="https://digit.fi/uploads/20190905/logo.svg"
          width={logoSize}
          height={logoSize}
          className="aspect-square object-contain"
        />
      </a>
      <a href="https://datateknologerna.org">
        <Image
          src="https://datateknologerna.org/static/images/albin_black.png"
          width={logoSize}
          height={logoSize}
          className="aspect-square object-contain"
        />
      </a>
    </footer>
  );
};

export default Footer;
