import React from 'react';

type Props = {
  text: string;
};

const Pill: React.FC<Props> = ({ text }) => {
  return (
    <div className="w-max font-bold text-xs text-lightText uppercase leading-[15px] py-[6px] px-[10px] border border-lightText rounded-xl select-none">
      {text}
    </div>
  );
};

export default Pill;
