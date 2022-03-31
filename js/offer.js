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
import { createPopup } from './popup.js';

const TEST_COUNT = 10;
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
      type: getRandomItem(Object.keys(offerTypes)),
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

const createMockData = (length = TEST_COUNT) => Array.from({ length }, (_el, i) => createOfferData(i + 1));

const fetchData = () => fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((res) => res.json())
  .catch(() => {
    createPopup(false, (popup) => {
      const messageElement = popup.querySelector('.error__message');
      messageElement.textContent = 'Ошибка получения объявлений';

      return () => window.location.reload();
    });
    return [];
  });

const getOffersData = () => window.location.search.includes('test') ? Promise.resolve(createMockData()) : fetchData();

export { getOffersData };
