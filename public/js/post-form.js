import { MAX_PRICE, offerType } from './const.js';
import { getWordAfterNum, toggleForm } from './utils.js';
import { postData } from './api.js';
import { clearFilters } from './filters.js';
import { addMapHandlers } from './map.js';
import { createUISlider } from './slider.js';
import { initImageControl } from './image-control.js';
import { togglePage } from './page.js';

const GROUP_CLASS_NAME = 'ad-form__element';
const AD_DISABLED_CLASS_NAME = 'ad-form--disabled';
const PRICE_VALIDATION_PRIORITY = 1000;

const RoomToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const postFormElement = document.querySelector('.ad-form');
const addressElement = postFormElement.querySelector('#address');
const typeFieldElement = postFormElement.querySelector('[name="type"]');
const priceFieldElement = postFormElement.querySelector('[name="price"]');
const priceSliderElement = postFormElement.querySelector('.ad-form__slider');
const roomsFieldElement = postFormElement.querySelector('[name="rooms"]');
const capacityFieldElement = postFormElement.querySelector('[name="capacity"]');
const timeinFieldElement = postFormElement.querySelector('[name="timein"]');
const timeoutFieldElement = postFormElement.querySelector('[name="timeout"]');

const avatarInputElement = postFormElement.querySelector('#avatar');
const avatarPreviewElement = postFormElement.querySelector('.ad-form-header__preview');
const offerImageInputElement = postFormElement.querySelector('#images');
const offerImagePreviewElement = postFormElement.querySelector('.ad-form__photo');
const clearAvatar = initImageControl(avatarInputElement, avatarPreviewElement);
const clearOfferImage = initImageControl(offerImageInputElement, offerImagePreviewElement);

const initialType = typeFieldElement.value;

const validatePrice = (value) => {
  const price = Number(value || 0);
  const inRange = price >= Number(priceFieldElement.min) && price <= MAX_PRICE;
  return /^\d+$/.test(value) && inRange;
};
const validateCapacity = () => RoomToGuests[roomsFieldElement.value].includes(capacityFieldElement.value);

const getCapacityMessage = () => {
  const { value } = roomsFieldElement;
  const rooms = `${value} ${getWordAfterNum(value, ['комнаты', 'комнат'])}`;
  const validGuests = RoomToGuests[value];
  return `Для ${rooms} допустимо гостей: ${validGuests.join(', ')}`;
};
const getPriceMessage = () => `Выберите число между ${priceFieldElement.min} и ${MAX_PRICE}`;

const setPriceAttributes = (type) => {
  const minPrice = offerType[type].min;
  priceFieldElement.min = minPrice;
  priceFieldElement.placeholder = minPrice;
};
setPriceAttributes(initialType);

const resetMapHandler = addMapHandlers(addressElement);

const pristine = new Pristine(postFormElement, {
  classTo: GROUP_CLASS_NAME,
  errorTextParent: GROUP_CLASS_NAME
});

const priceUISlider = createUISlider(priceSliderElement, parseInt(priceFieldElement.min, 10), () => {
  priceFieldElement.value = priceUISlider.get();

  // Сброс сообщения, если значение стало валидным после установки в поле
  pristine.validate(priceFieldElement);
});

const changeType = (type = typeFieldElement.value) => {
  setPriceAttributes(type);

  priceUISlider.updateOptions({
    range: {
      min: parseInt(priceFieldElement.min, 10),
      max: MAX_PRICE,
    },
  });

  if (!priceFieldElement.value) {
    priceUISlider.set(0);
  }
};

const togglePostForm = (isActive) => toggleForm(isActive, postFormElement, AD_DISABLED_CLASS_NAME);

typeFieldElement.addEventListener('change', () => {
  changeType();

  // Чтобы при смене типа сразу подсветило, если значение стало невалидным
  pristine.validate(priceFieldElement);
});

priceFieldElement.addEventListener('input', () => {
  if (pristine.validate(priceFieldElement)) {
    priceUISlider.set(parseInt(priceFieldElement.value, 10));
  }
});

roomsFieldElement.addEventListener('change', () => pristine.validate(capacityFieldElement));

timeinFieldElement.addEventListener('change', () => {
  timeoutFieldElement.value = timeinFieldElement.value;
});
timeoutFieldElement.addEventListener('change', () => {
  timeinFieldElement.value = timeoutFieldElement.value;
});

postFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  const offerData = new FormData(postFormElement);
  togglePage(false);
  postData(offerData, () => {
    postFormElement.reset();
  });
});

postFormElement.addEventListener('reset', () => {
  clearAvatar();
  clearOfferImage();
  clearFilters();
  resetMapHandler();
  changeType(initialType);
  priceUISlider.set(parseInt(priceFieldElement.min, 10));
  pristine.reset();
});

pristine.addValidator(priceFieldElement, validatePrice, getPriceMessage, PRICE_VALIDATION_PRIORITY, true);
pristine.addValidator(capacityFieldElement, validateCapacity, getCapacityMessage);

export { togglePostForm };
