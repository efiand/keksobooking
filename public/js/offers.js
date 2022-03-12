import {
  COORD_DECIMALS,
  CHECK_TIMES,
  FEATURES,
  PHOTOS,
  offerTypes,
  LatRange,
  LngRange,
  PriceRange,
  RoomsRange,
  GuestsRange
} from './data.js';

import {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomItem,
  getRandomArrayPart,
  getNumberWithLeadZero
} from './utils.js';

const generateOffer = (index) => {
  const lat = getRandomPositiveFloat(LatRange.MIN, LatRange.MAX, COORD_DECIMALS);
  const lng = getRandomPositiveFloat(LngRange.MIN, LngRange.MAX, COORD_DECIMALS);

  return {
    author: {
      avatar: `img/avatars/user${getNumberWithLeadZero(index)}.png`
    },
    offer: {
      title: `Объявление ${index}`,
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(PriceRange.MIN, PriceRange.MAX),
      type: getRandomItem(Object.keys(offerTypes)),
      rooms: getRandomPositiveInteger(RoomsRange.MIN, RoomsRange.MAX),
      guests: getRandomPositiveInteger(GuestsRange.MIN, GuestsRange.MAX),
      checkin: getRandomItem(CHECK_TIMES),
      checkout: getRandomItem(CHECK_TIMES),
      features: getRandomArrayPart(FEATURES),
      description: `Описание бъявления ${index}`,
      photos: getRandomArrayPart(PHOTOS)
    },
    location: {
      lat,
      lng
    }
  };
};

export const generateOffers = (length) => Array.from({ length }, (_el, i) => generateOffer(i + 1));
