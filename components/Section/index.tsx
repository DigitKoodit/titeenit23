import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Markdown } from './Markdown';

type LinkItem = {
  type: 'link';
  href: string;
  content: string;
};

type TextItem = {
  type: 'text';
  content?: string;
};

type MarkdownItem = {
  type: 'markdown';
  content: string;
};

type ImageItem = {
  type: 'image';
  url: string;
  alt: string;
  width?: number;
  height?: number;
  link?: string;
};

export type Item = LinkItem | TextItem | MarkdownItem | ImageItem;

interface SectionProps {
  id: string;
  title: string;
  items: Item[];
  setIntersection: Dispatch<SetStateAction<string>>;
}

const ItemRenderer = ({ item }: { item: Item }) => {
  if (item.type === 'image') {
    return (
      <a href={item.link}>
        <Image
          src={item.url}
          alt={item.alt}
          fill={!item.height && !item.width}
          height={item.height}
          width={item.width}
        />
      </a>
    );
  }

  if (item.type === 'text') {
    return <p className="text-justify">{item.content}</p>;
  }

  if (item.type === 'markdown') {
    return <Markdown content={item.content} />;
  }

  return <a href={item.href}>{item.content}</a>;
};

export const Section = ({
  id,
  items,
  title,
  setIntersection,
}: SectionProps) => {
  const { t } = useTranslation('common');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersection(id);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
  }, [id, setIntersection]);

  return (
    <div ref={ref} className="sm:mx-16 flex-grow overflow-hidden min-h-full">
      <h2 id={id} className="text-center">
        {t(title)}
      </h2>
      <div className="w-full flex space-x-4 text-left flex-col sm:flex-row flex-wrap items-center">
        {items.map((item, i) => (
          <div key={item.type + i} className="relative p-4 flex-1 space-y-4">
            <ItemRenderer item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
