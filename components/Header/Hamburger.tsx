import { SetStateAction } from 'react';

export const Hamburger = ({
  open,
  setOpen,
  color,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  color: string;
}) => {
  return (
    <button
      className={`container ${open ? 'change' : ''} sm:hidden inline-block`}
      onClick={() => setOpen(!open)}
    >
      <div className={`bar1 ${color}`}></div>
      <div className={`bar2 ${color}`}></div>
      <div className={`bar3 ${color}`}></div>
    </button>
  );
};
