import { useState } from 'react';

const Countdown = ({ date }: { date: Date }) => {
  const diffInMS = date.getTime() - Date.now();
  const diffInDays = Math.ceil(diffInMS / (1000 * 60 * 60 * 24));

  return (
    <div className="flex flex-col items-center justify-center text-3xl font-bold">
      {diffInDays} päivän päästä
    </div>
  );
};

export default Countdown;
