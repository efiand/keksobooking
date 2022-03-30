import { MAX_PRICE, offerTypes, roomToGuests } from './data.js';
import { declineNum } from './utils.js';
import { createPopup } from './popup.js';
import { addMapHandlers } from './map.js';
import { createUISlider } from './slider.js';

const GROUP_CLASS_NAME = 'ad-form__element';
const AD_DISABLED_CLASS_NAME = 'ad-form--disabled';
const PRICE_VALIDATION_PRIORITY = 1000;

const adFormElement = document.querySelector('.ad-form');
const addressElement = adFormElement.querySelector('#address');
const typeFieldElement = adFormElement.querySelector('[name="type"]');
const priceFieldElement = adFormElement.querySelector('[name="price"]');
const priceSliderElement = adFormElement.querySelector('.ad-form__slider');
const roomsFieldElement = adFormElement.querySelector('[name="rooms"]');
const capacityFieldElement = adFormElement.querySelector('[name="capacity"]');
const timeinFieldElement = adFormElement.querySelector('[name="timein"]');
const timeoutFieldElement = adFormElement.querySelector('[name="timeout"]');
const resetElement = adFormElement.querySelector('.ad-form__reset');

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const validatePrice = (value) => {
  const price = Number(value || 0);
  const inRange = price >= Number(priceFieldElement.min) && price <= MAX_PRICE;
  return /^\d+$/.test(value) && inRange;
};
const validateCapacity = () => roomToGuests[roomsFieldElement.value].includes(capacityFieldElement.value);

const getCapacityMessage = () => {
  const roos = declineNum(roomsFieldElement.value, 'комнаты', 'комнат');
  const validGuests = roomToGuests[roomsFieldElement.value];
  return `Для ${roos} допустимо гостей: ${validGuests.join(', ')}`;
};
const getPriceMessage = () => `Выберите число между ${priceFieldElement.min} и ${MAX_PRICE}`;

const setPriceAttributes = () => {
  const minPrice = offerTypes[typeFieldElement.value].min;
  priceFieldElement.min = minPrice;
  priceFieldElement.placeholder = minPrice;
};
setPriceAttributes();

const timesChangeHandler = (evt) => {
  const { value } = evt.currentTarget;
  timeinFieldElement.value = value;
  timeoutFieldElement.value = value;
};

const priceUISlider = createUISlider(priceSliderElement, priceFieldElement);

const pristine = new Pristine(adFormElement, {
  classTo: GROUP_CLASS_NAME,
  errorTextParent: GROUP_CLASS_NAME
});

typeFieldElement.addEventListener('change', () => {
  setPriceAttributes();

  priceUISlider.updateOptions({
    range: {
      min: parseInt(priceFieldElement.min, 10),
      max: MAX_PRICE,
    },
  });
});

priceFieldElement.addEventListener('input', () => {
  if (pristine.validate(priceFieldElement)) {
    priceUISlider.set(parseInt(priceFieldElement.value, 10));
  }
});

priceUISlider.on('slide', () => {
  priceFieldElement.value = priceUISlider.get();

  // Сброс сообщения, если значение стало валидным после установки в поле
  pristine.validate(priceFieldElement);
});

roomsFieldElement.addEventListener('change', () => pristine.validate(capacityFieldElement));

timeinFieldElement.addEventListener('change', timesChangeHandler);
timeoutFieldElement.addEventListener('change', timesChangeHandler);

adFormElement.addEventListener('submit', (evt) => {
  if (pristine.validate()) {
    return createPopup(successTemplate);
  }

  evt.preventDefault();
  createPopup(errorTemplate);
});

pristine.addValidator(priceFieldElement, validatePrice, getPriceMessage, PRICE_VALIDATION_PRIORITY, true);
pristine.addValidator(capacityFieldElement, validateCapacity, getCapacityMessage);

addMapHandlers(addressElement, resetElement);

export { AD_DISABLED_CLASS_NAME, adFormElement };
