import React from 'react';

type Props = {
  handleClick: () => void;
  icon: string;
  isDisabled: boolean;
};

const GuestButton: React.FC<Props> = ({ handleClick, icon, isDisabled }) => {
  return (
    <button
      className="flex items-center justify-center w-6 h-6 rounded-[4px] border border-lighterText text-lighterText disabled:cursor-not-allowed disabled:opacity-40 ring-offset-2 ring-lighterText ring-opacity-40 outline-none focus:ring"
      onClick={handleClick}
      disabled={isDisabled}
    >
      <span className="material-symbols-rounded text-lg">{icon}</span>
    </button>
  );
};

export default GuestButton;
