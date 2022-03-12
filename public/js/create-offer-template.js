import { offerTypes } from './data.js';
import { declineNum } from './utils.js';

const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

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

export const createOfferTemplate = ({ author = {}, offer = {} }) => {
  const template = offerTemplate.cloneNode(true);

  const roomsText = declineNum(offer.rooms, 'комната', 'комнаты', 'комнат');
  const guestsText = declineNum(offer.guests, 'гостя', 'гостей');
  const contentToSelector = {
    '.popup__title': offer.title,
    '.popup__text--address': offer.address,
    '.popup__text--price': `${offer.price} ₽/ночь`,
    '.popup__type': offerTypes[offer.type],
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
