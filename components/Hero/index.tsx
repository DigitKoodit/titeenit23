import Image from 'next/image';

export const Hero = () => {
  return (
    <div className="h-[837px] flex relative items-center w-full">
      <div className="hero-text w-1/2 text-center flex justify-center items-center flex-col z-[1]">
        <h1>Titeenit</h1>
        <h2>17.-19.3.2023 Turussa</h2>
      </div>
      <div className="hero-image w-1/2 relative h-full">
        <Image
          loader={({ src }) => src}
          src="/linna.png"
          alt="turun linna"
          fill
          priority
          unoptimized
        />
      </div>
      <div className="hero-filter z-0" />
    </div>
  );
};
