import React from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

const Search: React.FC<Props> = ({ children }) => {
  const el = document.getElementById('search') as HTMLDivElement;
  return createPortal(children, el);
};

export default Search;
