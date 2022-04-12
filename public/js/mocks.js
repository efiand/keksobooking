import { COORD_DECIMALS, OFFERS_COUNT, offerType } from './const.js';
import {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomItem,
  getRandomArrayPart,
  getNumberWithLeadZero
} from './utils.js';

const CHECK_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const PHOTO_DIR = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking';
const PHOTOS = [
  `${PHOTO_DIR}/duonguyen-8LrGtIxxa4w.jpg`,
  `${PHOTO_DIR}/brandon-hoogenboom-SNxQGWxZQi0.jpg`,
  `${PHOTO_DIR}/claire-rendall-b6kAwr1i0Iw.jpg`,
];

const LatRange = {
  MIN: 35.65,
  MAX: 35.7,
};

const LngRange = {
  MIN: 139.7,
  MAX: 139.8,
};

const PriceRange = {
  MIN: 2000,
  MAX: 50000,
};

const RoomsRange = {
  MIN: 1,
  MAX: 10,
};

const GuestsRange = {
  MIN: 2,
  MAX: 20,
};

const getRandomCheckIndex = () => getRandomPositiveInteger(0, CHECK_TIMES.length - 1);

const createOfferData = (index = 1) => {
  const lat = getRandomPositiveFloat(LatRange.MIN, LatRange.MAX, COORD_DECIMALS);
  const lng = getRandomPositiveFloat(LngRange.MIN, LngRange.MAX, COORD_DECIMALS);
  const checks = [getRandomCheckIndex(), getRandomCheckIndex()];

  return {
    author: {
      avatar: `img/avatars/user${getNumberWithLeadZero(index)}.png`
    },
    offer: {
      title: `Объявление ${index}`,
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(PriceRange.MIN, PriceRange.MAX),
      type: getRandomItem(Object.keys(offerType)),
      rooms: getRandomPositiveInteger(RoomsRange.MIN, RoomsRange.MAX),
      guests: getRandomPositiveInteger(GuestsRange.MIN, GuestsRange.MAX),
      checkin: CHECK_TIMES[Math.min(...checks)],
      checkout: CHECK_TIMES[Math.max(...checks)],
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

const createMocks = (handle) => Promise.resolve(Array.from({
  length: OFFERS_COUNT,
}, (_el, i) => createOfferData(i + 1)))
  .then(handle);

export { createMocks };
