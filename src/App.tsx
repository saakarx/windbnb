import React, { lazy, useEffect, useState } from 'react';
import { hashQueryKey, useQuery } from 'react-query';
import axios from 'axios';

import './main.css';
import logo from './assets/logo.png';
import loader from './assets/loader.gif';

import Card from './components/Card';
import Search from './components/Search';
import SearchContent from './components/SearchContent';

import { ActiveTabType, FilterType, Stay } from './types.type';

const STAYS_URL = '/stays.json';

const fetchStays = async (): Promise<Stay[]> => {
  const { data } = await axios.get(STAYS_URL);
  return data;
};

const App: React.FC = () => {
  const { isLoading, isError, error, data } = useQuery('stays', fetchStays);

  const [stays, setStays] = useState<Stay[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTabType>({
    location: true,
    guests: false
  });
  const [filter, setFilter] = useState<FilterType>({
    location: '',
    guests: { adults: 0, children: 0, total: 0 }
  });

  useEffect(() => {
    if (!data) return;
    setStays([...data]);
  }, [data]);

  useEffect(() => {
    if (!data) return;
    const newStays = [...data].filter(stay => {
      const isInLocation = filter.location
        ? filter.location === `${stay.city}, ${stay.country}`
        : true;
      const hasGuests = filter.guests.total <= stay.maxGuests;
      if (isInLocation && hasGuests) return stay;
    });
    setStays([...newStays]);
  }, [filter]);

  return (
    <>
      <div className="px-3 md:px-5 max-w-[1248px] mx-auto box-content">
        <header>
          <nav className="pb-9 sm:pb-14 pt-5 sm:pt-8 grid grid-cols-1 grid-rows-[auto_1fr] sm:grid-cols-2 sm:grid-rows-1 items-center gap-10">
            <img src={logo} draggable="false" alt="logo" />

            <div className="font-mulish text-sm shadow-form rounded-2xl flex divide-x divide-divider place-self-center sm:place-self-end">
              <button
                className={`p-4 flex items-center justify-center ${
                  filter.location ? 'text-text' : 'text-veryLightText'
                }`}
                onClick={() => (
                  setIsSearchOpen(true),
                  setActiveTab({ location: true, guests: false })
                )}
                type="button"
              >
                {filter.location ? filter.location : 'Add location'}
              </button>
              <button
                className={`p-4 flex items-center justify-center ${
                  filter.guests.total > 0 ? 'text-text' : 'text-veryLightText'
                }`}
                onClick={() => (
                  setIsSearchOpen(true),
                  setActiveTab({ location: false, guests: true })
                )}
                type="button"
              >
                {filter.guests.total > 0 ? `${filter.guests.total}` : 'Add'}{' '}
                guests
              </button>
              <button
                className="p-4 flex items-center justify-center"
                onClick={() => (
                  setIsSearchOpen(true),
                  setActiveTab({ location: true, guests: false })
                )}
                type="button"
              >
                <span className="material-symbols-rounded text-paleRed text-xl leading-none">
                  search
                </span>
              </button>
            </div>
          </nav>

          <div className="flex items-center justify-between">
            <h1 className="font-bold text-lg md:text-2xl leading-[22px] md:leading-[29px]">
              Stays in Finland
            </h1>
            <p className="text-sm text-lightText font-medium">
              {stays && `${stays.length === 0 ? 'No' : stays.length} stays`}
            </p>
          </div>
        </header>
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <>
            {isLoading && (
              <div className="flex items-center justify-center col-span-full">
                <img className="w-28" src={loader} />
              </div>
            )}
            {!isLoading && isError && { error }}
            {!isLoading &&
              stays &&
              stays.length > 0 &&
              stays.map((stay, idx) => <Card key={idx} {...stay} />)}
          </>
        </div>
        <p className="text-sm text-center pb-7 px-4">
          created by <span className="font-bold">saakarx</span> -{' '}
          <a target="_blank" href="https://devchallenges.io">
            devChallenges.io
          </a>
        </p>
      </div>
      <Search>
        {isSearchOpen && (
          <SearchContent
            activeTab={activeTab}
            filter={filter}
            setActiveTab={setActiveTab}
            setFilter={setFilter}
            setIsSearchShown={setIsSearchOpen}
          />
        )}
      </Search>
    </>
  );
};

export default App;
