import React, { useEffect, useState } from 'react';

import GuestButton from './GuestButton';

import { ActiveTabType, FilterType, GuestsType } from '../types.type';

type Props = {
  activeTab: ActiveTabType;
  filter: FilterType;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTabType>>;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  setIsSearchShown: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchContent: React.FC<Props> = ({
  activeTab,
  filter,
  setActiveTab,
  setFilter,
  setIsSearchShown
}) => {
  const [guests, setGuests] = useState<GuestsType>({
    adults: 0,
    children: 0,
    total: 0
  });
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    if (filter.location || filter.guests)
      setLocation(filter.location), setGuests({ ...filter.guests });

    const closeSearch = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchShown(false);
    };
    document.addEventListener('keydown', closeSearch);

    return () => document.removeEventListener('keydown', closeSearch);
  }, []);

  return (
    <section
      onClick={() => setIsSearchShown(false)}
      className="fixed inset-0 bg-lightText bg-opacity-40 backdrop-blur-sm z-10 font-mulish"
    >
      <div onClick={e => e.stopPropagation()} className="bg-white">
        <div className="max-w-[1248px] box-content px-4 pt-4 pb-6 md:py-20 mx-auto text-sm">
          <header className="mb-4 block md:hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold">Edit your search</h2>

              <button
                className="flex items-center justify-center p-2 focus:bg-divider hover:bg-divider outline-none rounded-lg"
                onClick={() => setIsSearchShown(false)}
              >
                <span className="material-symbols-rounded text-base leading-none">
                  close
                </span>
              </button>
            </div>
          </header>

          <div className="shadow-form rounded-2xl grid sm:grid-cols-2 md:grid-cols-3 divide-y md:divide-x divide-divider">
            <div className="outline-none">
              <button
                className={`w-full text-left outline-none pt-3 pb-[10px] px-7 rounded-2xl h-full focus:bg-divider group border ${
                  activeTab.location ? 'border-text' : 'border-transparent'
                }`}
                tabIndex={0}
                onClick={() => setActiveTab({ location: true, guests: false })}
              >
                <h3 className="font-extrabold text-[10px] leading-[11px] uppercase mb-1">
                  Location
                </h3>
                <input
                  type="text"
                  placeholder="Add location"
                  className="leading-[18px] text-text font-normal placeholder:text-veryLightText w-full outline-none group-focus:bg-divider"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </button>
            </div>

            <div className="outline-none">
              <button
                className={`w-full text-left outline-none pt-3 pb-[10px] px-7 rounded-2xl h-full focus:bg-divider border ${
                  activeTab.guests ? 'border-text' : 'border-transparent'
                }`}
                tabIndex={0}
                onClick={() => setActiveTab({ guests: true, location: false })}
              >
                <h3 className="font-extrabold text-[10px] leading-[11px] uppercase mb-1">
                  Guests
                </h3>
                <p
                  className={`leading-[18px] ${
                    guests.adults > 0 || guests.children > 0
                      ? 'text-text'
                      : 'text-veryLightText'
                  }`}
                >
                  {guests.adults > 0 || guests.children > 0
                    ? guests.total
                    : 'Add'}{' '}
                  guests
                </p>
              </button>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-paleRed text-white hidden md:flex items-center justify-center gap-2 font-bold shadow-form rounded-2xl px-6 py-3 outline-none ring-paleRed ring-offset-2 ring-opacity-30 focus:ring"
                onClick={() => (
                  setFilter(prevVal => ({
                    location,
                    guests
                  })),
                  setIsSearchShown(false)
                )}
              >
                <span className="material-symbols-rounded text-lg leading-none">
                  search
                </span>
                Search
              </button>
            </div>
          </div>

          <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-3">
            <div
              className={`${
                activeTab.location ? 'block' : 'hidden'
              } col-start-1`}
              aria-expanded={activeTab.location}
            >
              <ul className="flex flex-col gap-2 pr-2 mt-3 text-lightText">
                <li>
                  <button
                    tabIndex={0}
                    className="w-full flex items-center gap-1 py-3 px-5 border border-transparent transition ease-in-out rounded-2xl hover:border-lighterText cursor-pointer outline-none focus:border-lighterText"
                    onClick={() => setLocation('Helsinki, Finland')}
                  >
                    <span className="material-symbols-rounded leading-none text-base">
                      location_on
                    </span>
                    Helsinki, Finland
                  </button>
                </li>

                <li>
                  <button
                    tabIndex={0}
                    className="w-full flex items-center gap-1 py-3 px-5 border border-transparent transition ease-in-out rounded-2xl hover:border-lighterText cursor-pointer outline-none focus:border-lighterText"
                    onClick={() => setLocation('Turku, Finland')}
                  >
                    <span className="material-symbols-rounded leading-none text-base">
                      location_on
                    </span>
                    Turku, Finland
                  </button>
                </li>

                <li>
                  <button
                    tabIndex={0}
                    className="w-full flex items-center gap-1 py-3 px-5 border border-transparent transition ease-in-out rounded-2xl hover:border-lighterText cursor-pointer outline-none focus:border-lighterText"
                    onClick={() => setLocation('Oulu, Finland')}
                  >
                    <span className="material-symbols-rounded leading-none text-base">
                      location_on
                    </span>
                    Oulu, Finland
                  </button>
                </li>

                <li>
                  <button
                    tabIndex={0}
                    className="w-full flex items-center gap-1 py-3 px-5 border border-transparent transition ease-in-out rounded-2xl hover:border-lighterText cursor-pointer outline-none focus:border-lighterText"
                    onClick={() => setLocation('Vaasa, Finland')}
                  >
                    <span className="material-symbols-rounded leading-none text-base">
                      location_on
                    </span>
                    Vaasa, Finland
                  </button>
                </li>
              </ul>
            </div>

            <div
              className={`${
                activeTab.guests ? 'block' : 'hidden'
              } col-start-1 md:col-start-2 mt-5 px-5`}
              aria-expanded={activeTab.guests}
            >
              <div className="mb-12">
                <h4 className="font-bold">Adults</h4>
                <p>Ages 13 or above</p>
                <div className="flex items-center gap-4 mt-3">
                  <GuestButton
                    isDisabled={
                      guests.adults < 1 ||
                      (guests.children > 0 && guests.adults === 1)
                    }
                    handleClick={() => {
                      setGuests(prevVal => ({
                        ...prevVal,
                        adults: prevVal.adults - 1,
                        total: prevVal.total - 1
                      }));
                    }}
                    icon="remove"
                  />
                  <p className="font-bold leading-[17px]">{guests.adults}</p>
                  <GuestButton
                    isDisabled={false}
                    handleClick={() => {
                      setGuests(prevVal => ({
                        ...prevVal,
                        adults: prevVal.adults + 1,
                        total: prevVal.total + 1
                      }));
                    }}
                    icon="add"
                  />
                </div>
              </div>

              <div>
                <h4 className="font-bold">Children</h4>
                <p>Ages 2-12</p>
                <div className="flex items-center gap-4 mt-3">
                  <GuestButton
                    isDisabled={guests.children < 1}
                    handleClick={() => {
                      setGuests(prevVal => ({
                        ...prevVal,
                        children: prevVal.children - 1,
                        total: prevVal.total - 1
                      }));
                    }}
                    icon="remove"
                  />
                  <p className="font-bold leading-[17px]">{guests.children}</p>
                  <GuestButton
                    isDisabled={false}
                    handleClick={() => {
                      setGuests(prevVal => {
                        return {
                          adults: prevVal.adults < 1 ? 1 : prevVal.adults,
                          children: prevVal.children + 1,
                          total: prevVal.total + (prevVal.adults < 1 ? 2 : 1)
                        };
                      });
                    }}
                    icon="add"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-paleRed text-white flex md:hidden items-center justify-center gap-2 font-bold shadow-form rounded-2xl px-6 py-3 mt-6 outline-none ring-paleRed ring-offset-2 ring-opacity-30 focus:ring"
              onClick={() => console.log('Search Button Clicked')}
            >
              <span className="material-symbols-rounded text-lg leading-none">
                search
              </span>
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchContent;
