// Утилита общего назначения для получения случайного целого из диапазона
export const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// Утилита общего назначения для получения случайного числа с заданной точностью из диапапзона
export const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return parseFloat(result.toFixed(digits));
};

// Утилита общего назначения для получения случайного элемента массива
const getRandomItem = (arr) => arr[getRandomPositiveInteger(0, arr.length - 1)];

// Утилита общего назначения для получения случайного фрагмента массива
const getRandomArrayPart = (arr) => {
  const lastIndex = arr.length - 1;
  const a = getRandomPositiveInteger(0, lastIndex);
  const b = getRandomPositiveInteger(0, lastIndex);
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  return arr.slice(lower, upper);
};

// Утилита общего назначения для вывода числа с ведущим нулём
const getNumberWithLeadZero = (number) => number < 10 ? `0${number}` : number;

const OFFERS_COUNT = 10;
const COORD_DECIMALS = 5;
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTO_DIR = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking';
const PHOTOS = [
  `${PHOTO_DIR}/duonguyen-8LrGtIxxa4w.jpg`,
  `${PHOTO_DIR}/brandon-hoogenboom-SNxQGWxZQi0.jpg`,
  `${PHOTO_DIR}/claire-rendall-b6kAwr1i0Iw.jpg`
];
const LatRange = {
  MIN: 35.65,
  MAX: 35.7
};
const LngRange = {
  MIN: 139.7,
  MAX: 139.8
};
const PriceRange = {
  MIN: 2000,
  MAX: 50000
};
const RoomsRange = {
  MIN: 1,
  MAX: 10
};
const GuestsRange = {
  MIN: 2,
  MAX: 20
};

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
      type: getRandomItem(TYPES),
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

const generateOffers = (length) => Array.from({ length }).map((_el, i) => generateOffer(i + 1));

generateOffers(OFFERS_COUNT);
