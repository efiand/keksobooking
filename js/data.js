const PHOTO_DIR = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking';

export const COORD_DECIMALS = 5;
export const MAX_PRICE = 100000;
export const CHECK_TIMES = ['12:00', '13:00', '14:00'];
export const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

export const DEFAULT_LOCATION = {
  lat: 35.6894,
  lng: 139.69235,
};

export const PHOTOS = [
  `${PHOTO_DIR}/duonguyen-8LrGtIxxa4w.jpg`,
  `${PHOTO_DIR}/brandon-hoogenboom-SNxQGWxZQi0.jpg`,
  `${PHOTO_DIR}/claire-rendall-b6kAwr1i0Iw.jpg`,
];

export const roomToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

export const offerTypes = {
  palace: {
    title: 'Дворец',
    min: 10000,
  },
  flat: {
    title: 'Квартира',
    min: 1000,
  },
  house: {
    title: 'Дом',
    min: 5000,
  },
  bungalow: {
    title: 'Бунгало',
    min: 0,
  },
  hotel: {
    title: 'Отель ',
    min: 3000,
  },
};

export const LatRange = {
  MIN: 35.65,
  MAX: 35.7,
};

export const LngRange = {
  MIN: 139.7,
  MAX: 139.8,
};

export const PriceRange = {
  MIN: 2000,
  MAX: 50000,
};

export const RoomsRange = {
  MIN: 1,
  MAX: 10,
};

export const GuestsRange = {
  MIN: 2,
  MAX: 20,
};
