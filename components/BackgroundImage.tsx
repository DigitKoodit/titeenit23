const BackgroundImage = () => {
  return (
    <>
      <div className="bg-black absolute w-full h-full -z-20" />
      <div className="bg-landing bg-cover bg-center blur-sm absolute w-full h-full -z-10" />
    </>
  );
};

export default BackgroundImage;
