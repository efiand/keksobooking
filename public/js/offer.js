import {
  OFFERS_COUNT,
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
  declineNum,
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomItem,
  getRandomArrayPart,
  getNumberWithLeadZero
} from './utils.js';

const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

const getRandomCheckIndex = () => getRandomPositiveInteger(0, CHECK_TIMES.length - 1);

const fillELement = (element, list, getChild) => {
  if (list.length > 0) {
    element.innerHTML = '';
    list.forEach((item) => {
      element.append(getChild(item));
    });
  } else {
    element.remove();
  }
};

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

const createOffersData = (length = OFFERS_COUNT) => Array.from({ length }, (_el, i) => createOfferData(i + 1));

const createOfferTemplate = ({ author = {}, offer = {} }) => {
  const template = offerTemplate.cloneNode(true);

  const roomsText = declineNum(offer.rooms, 'комната', 'комнаты', 'комнат');
  const guestsText = declineNum(offer.guests, 'гостя', 'гостей');
  const contentToSelector = {
    '.popup__title': offer.title,
    '.popup__text--address': offer.address,
    '.popup__text--price': `${offer.price} ₽/ночь`,
    '.popup__type': offerTypes[offer.type].title,
    '.popup__text--capacity': `${roomsText} для ${guestsText}`,
    '.popup__text--time': `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`,
    '.popup__description': offer.description
  };
  Object.entries(contentToSelector).forEach(([selector, content]) => {
    const element = template.querySelector(selector);
    if (content) {
      element.textContent = content;
    } else {
      element.remove();
    }
  });

  const featuresELement = template.querySelector('.popup__features');
  fillELement(featuresELement, offer.features, (feature) => {
    const featureElement = document.createElement('li');
    featureElement.className = `popup__feature popup__feature--${feature}`;
    return featureElement;
  });

  const photosElement = template.querySelector('.popup__photos');
  const photoSampleELement = photosElement.querySelector('.popup__photo');
  fillELement(photosElement, offer.photos, (photo) => {
    const photoElement = photoSampleELement.cloneNode();
    photoElement.src = photo;
    return photoElement;
  });

  const avatarElement = template.querySelector('.popup__avatar');
  if (author.avatar) {
    avatarElement.src = author.avatar;
  } else {
    avatarElement.remove();
  }

  return template;
};

export { createOfferData, createOffersData, createOfferTemplate };
