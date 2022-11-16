import React from 'react';

import Pill from './Pill';

import { Stay } from '../types.type';

const Card: React.FC<Stay> = ({
  beds,
  city,
  country,
  maxGuests,
  photo,
  rating,
  superHost,
  title,
  type
}) => {
  return (
    <article className="flex flex-col gap-3">
      <img
        className="rounded-3xl max-h-64 w-full h-full object-cover object-center select-none"
        src={photo}
        draggable="false"
      />
      <div className="flex items-center justify-between flex-1">
        {superHost ? (
          <div className="flex gap-3 items-center">
            <Pill text="Super Host" />
            <p className="text-sm text-lighterText">
              {type} . {beds} beds
            </p>
          </div>
        ) : (
          <p className="text-sm text-lighterText">{type}</p>
        )}
        <div className="flex gap-2 items-center">
          <span className="material-symbols-rounded text-base text-paleRed leading-none select-none">
            star
          </span>
          <span className="text-sm leading-none text-lightText">{rating}</span>
        </div>
      </div>
      <h2 className="font-semibold">{title}</h2>
    </article>
  );
};

export default Card;
