export type Stay = {
  city: string;
  country: string;
  superHost: boolean;
  title: string;
  rating: number;
  maxGuests: number;
  type: string;
  beds: number;
  photo: string;
};

export type ActiveTabType = {
  location: boolean;
  guests: boolean;
};

export type GuestsType = {
  adults: number;
  children: number;
  total: number;
};

export type FilterType = {
  guests: GuestsType;
  location: string;
};
